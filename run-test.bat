@echo off
cd /d c:\dev\PlaywrightMCP
echo Installing dependencies...
call npm install
echo.
echo Running Playwright API Tests...
call npx playwright test tests/api-fakestore.spec.js --reporter=list
pause
