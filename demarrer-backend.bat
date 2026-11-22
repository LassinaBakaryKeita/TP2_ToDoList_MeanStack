@echo off
setlocal
title Backend ToDo List - MEAN Stack

echo   Demarrage du Serveur Backend (Node.js / Express)


set "BACKEND_DIR=%~dp0backend"
cd /d "%BACKEND_DIR%"

echo Demarrage du serveur sur http://localhost:3000 ...
npm start
pause
