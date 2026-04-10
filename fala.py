"""
Fala Claude — Voice-to-Claude via Groq Whisper
F2 = start/stop recording + auto-send to Claude Code

Setup: https://github.com/GChamusca/fala-claude
"""
import sounddevice as sd
import soundfile as sf
import requests
import tempfile
import os
import sys
import numpy as np
import keyboard
import pyautogui
import pyperclip
import time
import threading

# ─── Config ──────────────────────────────────────
GROQ_KEY = os.environ.get("GROQ_API_KEY", "")
SAMPLE_RATE = 16000
HOTKEY = "f2"
LANGUAGE = "pt"  # pt, en, es, fr, de, etc.
# ─────────────────────────────────────────────────

if not GROQ_KEY:
    print("Erro: GROQ_API_KEY nao encontrada.")
    print()
    print("Configure a variavel de ambiente:")
    print('  set GROQ_API_KEY=gsk_sua_key_aqui')
    print()
    print("Ou crie uma key gratis em: https://console.groq.com/keys")
    sys.exit(1)

recording = False
stream = None
frames = []

def start_recording():
    global recording, stream, frames
    frames = []
    recording = True

    def callback(indata, frame_count, time_info, status):
        if recording:
            frames.append(indata.copy())

    stream = sd.InputStream(
        samplerate=SAMPLE_RATE, channels=1,
        dtype="float32", callback=callback,
    )
    stream.start()
    print(f"   GRAVANDO... ({HOTKEY.upper()} pra parar)")


def stop_and_transcribe():
    global recording, stream
    recording = False
    if stream:
        stream.stop()
        stream.close()
        stream = None

    if not frames:
        print("   Nenhum audio.")
        return

    audio = np.concatenate(frames, axis=0)
    tmp = tempfile.mktemp(suffix=".wav")
    sf.write(tmp, audio, SAMPLE_RATE)

    print("   Transcrevendo...")

    try:
        with open(tmp, "rb") as f:
            resp = requests.post(
                "https://api.groq.com/openai/v1/audio/transcriptions",
                headers={"Authorization": f"Bearer {GROQ_KEY}"},
                files={"file": ("audio.wav", f, "audio/wav")},
                data={"model": "whisper-large-v3", "language": LANGUAGE},
            )
        os.remove(tmp)

        if resp.status_code == 200:
            text = resp.json().get("text", "").strip()
            if text:
                print(f"   >> {text}")
                time.sleep(0.3)
                pyperclip.copy(text)
                pyautogui.hotkey("ctrl", "v")
                time.sleep(0.1)
                pyautogui.press("enter")
                print("   Enviado!\n")
            else:
                print("   Nenhuma fala detectada.\n")
        else:
            print(f"   Erro Groq: {resp.status_code}\n")
    except Exception as e:
        print(f"   Erro: {e}\n")
        if os.path.exists(tmp):
            os.remove(tmp)


def on_hotkey():
    global recording
    if not recording:
        start_recording()
    else:
        threading.Thread(target=stop_and_transcribe, daemon=True).start()


print()
print("  ╔══════════════════════════════════╗")
print("  ║   FALA CLAUDE — Groq Whisper     ║")
print("  ╚══════════════════════════════════╝")
print()
print(f"  {HOTKEY.upper()} = gravar / parar + enviar")
print(f"  Idioma: {LANGUAGE}")
print("  Ctrl+C = sair")
print()

keyboard.add_hotkey(HOTKEY, on_hotkey, suppress=True)
keyboard.wait()
