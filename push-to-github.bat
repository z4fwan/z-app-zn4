@echo off
echo ========================================
echo Z-APP - Push to GitHub
echo ========================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Add all files
echo Adding all files to git...
git add .
echo.

REM Commit
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update: Z-APP improvements

echo Committing changes...
git commit -m "%commit_message%"
echo.

REM Check if remote exists
git remote -v | find "origin" >nul
if errorlevel 1 (
    echo.
    echo ========================================
    echo SETUP REQUIRED
    echo ========================================
    echo.
    echo Please create a GitHub repository first:
    echo 1. Go to https://github.com/new
    echo 2. Create a new repository named 'z-app'
    echo 3. DO NOT initialize with README
    echo.
    set /p github_url="Enter your GitHub repository URL (e.g., https://github.com/username/z-app.git): "
    
    echo.
    echo Adding remote origin...
    git remote add origin %github_url%
    echo.
)

REM Set main branch
echo Setting main branch...
git branch -M main
echo.

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo ERROR
    echo ========================================
    echo.
    echo Push failed. This might be because:
    echo 1. Remote repository already has commits
    echo 2. Authentication failed
    echo.
    echo Try running: git push -u origin main --force
    echo (Warning: This will overwrite remote repository)
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo SUCCESS!
echo ========================================
echo.
echo Your code has been pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to your GitHub repository
echo 2. Follow DEPLOYMENT_GUIDE.md to deploy
echo.
pause
