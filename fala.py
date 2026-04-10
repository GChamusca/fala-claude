"""
Fala Claude — Voice-to-Claude via Groq Whisper
F2 = start/stop recording + auto-send to Claude Code
Works on Windows and macOS

Setup: https://github.com/GChamusca/fala-claude
"""
import sounddevice as sd
import soundfile as sf
import requests
import tempfile
import os
import sys
import platform
import numpy as np
import pyperclip
import time
import threading

# ─── Config ──────────────────────────────────────
GROQ_KEY = os.environ.get("GROQ_API_KEY", "")
SAMPLE_RATE = 16000
HOTKEY = "f2"
LANGUAGE = "pt"  # pt, en, es, fr, de, etc.
IS_MAC = platform.system() == "Darwin"
# ─────────────────────────────────────────────────

if not GROQ_KEY:
    print("Erro: GROQ_API_KEY nao encontrada.")
    print()
    if IS_MAC:
        print("Configure a variavel de ambiente:")
        print('  export GROQ_API_KEY="gsk_sua_key_aqui"')
        print()
        print("Para persistir, adicione ao ~/.zshrc:")
        print('  echo \'export GROQ_API_KEY="gsk_sua_key_aqui"\' >> ~/.zshrc')
    else:
        print("Configure a variavel de ambiente:")
        print('  setx GROQ_API_KEY "gsk_sua_key_aqui"')
    print()
    print("Crie uma key gratis em: https://console.groq.com/keys")
    sys.exit(1)

# Import keyboard handler (different per OS)
try:
    import keyboard
    USE_KEYBOARD_LIB = True
except ImportError:
    USE_KEYBOARD_LIB = False

# macOS: keyboard lib needs sudo or doesn't work well
# Use pynput as fallback
if IS_MAC or not USE_KEYBOARD_LIB:
    try:
        from pynput import keyboard as pynput_kb
        USE_PYNPUT = True
    except ImportError:
        print("Erro: instale pynput para macOS:")
        print("  pip install pynput")
        sys.exit(1)
else:
    USE_PYNPUT = False

import pyautogui

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
                # macOS uses Cmd+V, Windows uses Ctrl+V
                paste_key = "command" if IS_MAC else "ctrl"
                pyautogui.hotkey(paste_key, "v")
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
print(f"  Sistema: {'macOS' if IS_MAC else 'Windows'}")
print("  Ctrl+C = sair")
print()

if USE_PYNPUT:
    # macOS / pynput mode
    hotkey_key = pynput_kb.Key.f2

    def on_press(key):
        if key == hotkey_key:
            on_hotkey()

    listener = pynput_kb.Listener(on_press=on_press)
    listener.start()
    print("  Esperando... (pynput mode)")
    print()
    try:
        listener.join()
    except KeyboardInterrupt:
        pass
else:
    # Windows / keyboard lib mode
    keyboard.add_hotkey(HOTKEY, on_hotkey, suppress=True)
    keyboard.wait()
