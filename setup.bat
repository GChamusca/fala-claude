@echo off
echo ========================================
echo   Fala Claude - Setup
echo ========================================
echo.

where python >nul 2>&1
if %errorlevel% neq 0 (
    echo Python nao encontrado. Instalando...
    winget install Python.Python.3.12 --accept-package-agreements --accept-source-agreements
    echo.
    echo Feche e abra o terminal novamente, depois rode setup.bat de novo.
    pause
    exit /b
)

echo Instalando dependencias...
pip install sounddevice soundfile requests keyboard pyperclip pyautogui numpy
echo.

set /p GROQ_KEY="Cole sua Groq API Key (gsk_...): "
setx GROQ_API_KEY "%GROQ_KEY%"

echo.
echo Pronto! Para usar:
echo   1. Abra PowerShell como Admin
echo   2. Rode: python fala.py
echo   3. Aperte F2 pra gravar, F2 pra enviar
echo.
pause
