@echo off
echo Installing Z-APP Dependencies...
echo.

echo [1/3] Installing root dependencies...
call npm install
echo.

echo [2/3] Installing backend dependencies...
cd backend
call npm install --legacy-peer-deps
cd ..
echo.

echo [3/3] Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the development servers, run:
echo   start-dev.bat
echo.
echo Or manually:
echo   Backend:  cd backend  && npm run dev
echo   Frontend: cd frontend && npm run dev
echo.
pause
