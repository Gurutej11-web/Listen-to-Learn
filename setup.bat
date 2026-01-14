@echo off
REM Listen to Learn - Quick Setup Script for Windows
REM Run this after cloning to get started quickly

echo.
echo 🎧📘 Listen to Learn Setup
echo ==========================
echo.

REM Check if Node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed
    echo Please install from https://nodejs.org
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo ✅ Dependencies installed
echo.

echo 📝 Next steps:
echo.
echo 1. Create a Firebase project:
echo    - Go to https://console.firebase.google.com/
echo    - Create a new project
echo    - Enable Authentication, Firestore, Storage
echo.
echo 2. Get your Firebase config:
echo    - Go to Project Settings
echo    - Copy your Web SDK configuration
echo.
echo 3. Update your credentials:
echo    - Edit public/js/firebase-config.js
echo    - Paste your Firebase config
echo.
echo 4. Run locally:
echo    - firebase serve
echo    - Open http://localhost:5000
echo.
echo 5. Deploy:
echo    - firebase deploy
echo.
echo 📚 For detailed setup, read SETUP.md
echo.
echo ✅ Setup complete! Happy learning! 🚀
echo.
pause
