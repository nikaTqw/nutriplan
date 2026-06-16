# NutriPlan - Дневник питания 
 
Веб-приложение для планирования питания, ведения дневника рецептов и контроля рациона. 
 
## Структура проекта 
 
``` 
nutriplan/ 
├── backend/          # ASP.NET Core бэкенд 
│   ├── Controllers/ 
│   ├── Models/ 
│   ├── Data/ 
│   ├── DTOs/ 
│   └── Program.cs 
└── frontend/         # React + TypeScript фронтенд 
    ├── src/ 
    ├── public/ 
    └── package.json 
``` 
 
## Запуск проекта 
 
### Бэкенд 
```bash 
cd backend 
dotnet restore 
dotnet run 
``` 
 
### Фронтенд 
```bash 
cd frontend 
npm install 
npm run dev 
``` 
