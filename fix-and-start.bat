@echo off
echo ========================================
echo Z-APP - Fix and Start Script
echo ========================================
echo.

echo [Step 0/4] Killing processes on ports 5001 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5001') do (
    if not "%%a"=="0" (
        taskkill /F /PID %%a 2>nul
    )
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do (
    if not "%%a"=="0" (
        taskkill /F /PID %%a 2>nul
    )
)
echo Ports cleared!
echo.

echo [Step 1/4] Cleaning node_modules...
if exist "node_modules" rmdir /s /q node_modules
if exist "backend\node_modules" rmdir /s /q backend\node_modules
if exist "frontend\node_modules" rmdir /s /q frontend\node_modules
echo Done!
echo.

echo [Step 2/4] Installing root dependencies...
call npm install
echo.

echo [Step 3/4] Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps
cd ..
echo.

echo [Step 4/4] Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Starting development servers...
echo.

REM Start backend in a new window
start "Z-APP Backend" cmd /k "cd backend && npm run dev"

REM Wait for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend in a new window
start "Z-APP Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Servers Started!
echo ========================================
echo Backend: http://localhost:5001
echo Frontend: http://localhost:5173
echo Admin: http://localhost:5173/admin
echo.
echo Default Admin Login:
echo Email: ronaldo@gmail.com
echo Password: safwan123
echo.
echo Press any key to exit this window...
pause > nul
