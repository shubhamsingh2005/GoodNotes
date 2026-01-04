@echo off
echo ==========================================
echo      GoodNotes App Launcher
echo ==========================================

echo [1/3] Stopping old processes (Ports 5000 & 5173)...
call npx kill-port 5000
call npx kill-port 5173

echo [2/3] Starting Backend Server...
cd back
start "GoodNotes Backend (Port 5000)" npm start
cd ..

echo [3/3] Starting Frontend Server...
cd front
start "GoodNotes Frontend (Port 5173)" npm run dev
cd ..

echo ==========================================
echo      Done! Servers started.
echo      You can close this window.
echo ==========================================
pause
