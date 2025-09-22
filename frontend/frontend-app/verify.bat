@echo off
echo Verifying Angular project configuration...
echo.

echo Checking package.json...
if exist package.json (
    echo ✓ package.json exists
) else (
    echo ✗ package.json missing
    exit /b 1
)

echo.
echo Checking node_modules...
if exist node_modules (
    echo ✓ node_modules exists
) else (
    echo ✗ node_modules missing - run install.bat first
    exit /b 1
)

echo.
echo Checking @angular/animations...
if exist node_modules\@angular\animations (
    echo ✓ @angular/animations installed
) else (
    echo ✗ @angular/animations missing
    echo Run: npm install @angular/animations
    exit /b 1
)

echo.
echo Checking app configuration...
if exist src\app\app.config.ts (
    echo ✓ app.config.ts exists
) else (
    echo ✗ app.config.ts missing
    exit /b 1
)

echo.
echo All checks passed! ✓
echo You can now run: start.bat
pause
