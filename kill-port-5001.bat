@echo off
echo Killing process on port 5001...

REM Find and kill process using port 5001
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5001') do (
    if not "%%a"=="0" (
        echo Killing process ID: %%a
        taskkill /F /PID %%a 2>nul
    )
)

echo.
echo Port 5001 is now free!
echo You can now run: npm run dev
echo.
pause
