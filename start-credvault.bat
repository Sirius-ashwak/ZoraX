@echo off
echo Starting CredVault Backend...
cd backend
start "CredVault Backend" cmd /k "npm run dev"
cd ..

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting CredVault Frontend...
start "CredVault Frontend" cmd /k "npm run dev:frontend"

echo.
echo CredVault is starting up!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause > nul
