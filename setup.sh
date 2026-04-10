#!/bin/bash
# Fala Claude — Setup para macOS / Linux

echo "========================================"
echo "  Fala Claude - Setup (macOS/Linux)"
echo "========================================"
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "Python3 nao encontrado. Instale via:"
    echo "  brew install python3"
    exit 1
fi

echo "Instalando dependencias..."
pip3 install sounddevice soundfile requests pynput pyperclip pyautogui numpy

echo ""
read -p "Cole sua Groq API Key (gsk_...): " GROQ_KEY

# Add to shell profile
SHELL_RC="$HOME/.zshrc"
if [ -f "$HOME/.bashrc" ] && [ ! -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

echo "export GROQ_API_KEY=\"$GROQ_KEY\"" >> "$SHELL_RC"
export GROQ_API_KEY="$GROQ_KEY"

echo ""
echo "Pronto! Para usar:"
echo "  python3 fala.py"
echo ""
echo "Aperte F2 pra gravar, F2 pra enviar."
echo ""
echo "NOTA macOS: Na primeira vez, o sistema vai pedir permissao"
echo "de Acessibilidade e Microfone. Aceite ambos."
