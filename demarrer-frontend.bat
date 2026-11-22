@echo off
setlocal
title Frontend ToDo List - Angular

echo   Demarrage du Serveur Frontend (Angular)


set "FRONTEND_DIR=%~dp0frontend"
cd /d "%FRONTEND_DIR%"

echo Demarrage de l'application Angular sur http://localhost:4200 ...
ng serve --open
pause
