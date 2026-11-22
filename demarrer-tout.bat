@echo off
setlocal
title Lancement de l'application MEAN Stack ToDo List

echo   Lancement de l'application To-Do List (MEAN Stack)



set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%backend"
set "FRONTEND_DIR=%ROOT_DIR%frontend"

echo 1. Lancement du Backend (Node.js/Express) dans une nouvelle fenetre...
start "Backend (Node/Express)" /D "%BACKEND_DIR%" cmd /k "npm start"

timeout /t 2 /nobreak > nul

echo 2. Lancement du Frontend (Angular) dans une nouvelle fenetre...
start "Frontend (Angular)" /D "%FRONTEND_DIR%" cmd /k "ng serve --open"

echo.
echo Application en cours d'execution !
echo - Backend  : http://localhost:3000
echo - Frontend : http://localhost:4200
echo.
pause
