# 🎤 Fala Claude

**Fale com o Claude Code usando sua voz.** F2 pra gravar, F2 pra enviar. Sem limite de tempo.

Usa a API gratuita do [Groq](https://groq.com) (Whisper Large v3) para transcrição instantânea (~1 segundo), sem necessidade de GPU local.

https://github.com/user-attachments/assets/demo.gif

---

## Como funciona

1. Você aperta **F2** (hotkey global)
2. Fala o que quiser (português, inglês, qualquer idioma)
3. Aperta **F2** de novo
4. O áudio é enviado pro Groq Whisper, transcrito em ~1s
5. O texto é colado e enviado automaticamente na janela ativa (Claude Code, terminal, etc.)

## Por que usar isso?

| | Fala Claude | Whisper local | Win+H (Windows) |
|---|---|---|---|
| **Velocidade** | ~1 segundo | 5-30 segundos | Tempo real |
| **Qualidade pt-BR** | Excelente (Whisper Large v3) | Boa | Ruim |
| **GPU necessária** | Não | Sim | Não |
| **Limite de tempo** | Ilimitado | Ilimitado | Variável |
| **Auto-send** | Sim (cola + Enter) | Não | Não |
| **Setup** | 2 minutos | 30+ minutos | Nativo |

## Setup rápido (Windows)

### 1. Clone o repo

```bash
git clone https://github.com/GChamusca/fala-claude.git
cd fala-claude
```

### 2. Rode o setup automático

**Windows:**
```bash
setup.bat
```

**macOS / Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

O setup instala as dependências e pede sua API key do Groq.

### 3. Ou faça manual

**Windows:**
```bash
pip install sounddevice soundfile requests keyboard pyperclip pyautogui numpy
```

**macOS:**
```bash
pip3 install sounddevice soundfile requests pynput pyperclip pyautogui numpy
```

### 4. Pegue sua API key (grátis)

1. Crie uma conta em [console.groq.com](https://console.groq.com)
2. Vá em **API Keys** → **Create API Key**
3. Configure a variável de ambiente:

**Windows:**
```bash
setx GROQ_API_KEY "gsk_sua_key_aqui"
```

**macOS / Linux:**
```bash
echo 'export GROQ_API_KEY="gsk_sua_key_aqui"' >> ~/.zshrc
source ~/.zshrc
```

### 5. Rode

**Windows (PowerShell como Admin):**
```bash
python fala.py
```

**macOS:**
```bash
python3 fala.py
```

> **macOS:** Na primeira vez, o sistema vai pedir permissão de **Acessibilidade** e **Microfone** em Preferências do Sistema. Aceite ambos para o F2 e a gravação funcionarem.

## Uso

```
F2          → Começa a gravar
F2 (again)  → Para, transcreve, cola e envia
Ctrl+C      → Sair
```

Funciona com qualquer janela ativa: Claude Code, terminal, chat, editor, etc.

## Configuração

Edite as variáveis no topo do `fala.py`:

```python
HOTKEY = "f2"      # Mude pra qualquer tecla (f3, f4, ctrl+shift+r, etc.)
LANGUAGE = "pt"    # pt, en, es, fr, de, ja, etc.
```

## Atalho na área de trabalho

Crie `Fala Claude.bat`:

```batch
@echo off
cd /d %~dp0
python fala.py
pause
```

Clique com botão direito → Propriedades → Avançado → **Executar como administrador**.

## Iniciar com o Windows

Coloque este arquivo em `shell:startup` (Win+R → `shell:startup`):

**fala-claude.vbs:**
```vbs
Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "python", "C:\caminho\para\fala.py", "C:\caminho\para\", "runas", 0
```

## Requisitos

- Windows 10/11
- Python 3.10+
- Microfone
- API key do Groq (grátis em [console.groq.com](https://console.groq.com))

## Apoie o projeto

Se o Fala Claude te ajudou, considere fazer uma doação via Pix:

**Chave Pix (aleatória):** `264f38bd-9988-4549-b052-65f2bd006583`

<img src="pix-qr.png" alt="QR Code Pix" width="200">

---

## Créditos

Criado por [Gabriel Chamusca](https://github.com/GChamusca)

Powered by [Groq](https://groq.com) Whisper Large v3 · Construído com [Claude Code](https://claude.ai/code)

## License

MIT
