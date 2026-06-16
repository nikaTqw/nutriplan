@echo off 
echo ======================================== 
echo    NutriPlan - Дневник питания 
echo ======================================== 
echo. 
echo Запуск бэкенда... 
start cmd /k "cd backend && dotnet run" 
echo. 
echo Запуск фронтенда... 
start cmd /k "cd frontend && npm run dev" 
echo. 
echo Приложение запускается... 
echo Бэкенд: https://localhost:5001 
echo Фронтенд: http://localhost:5173 
echo. 
pause 
