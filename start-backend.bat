@echo off
cd /d "%~dp0backend"
if not exist venv\Scripts\python.exe (
  echo Backend is not set up yet. See README.md - "1. Backend (first-time setup)".
  pause
  exit /b 1
)
venv\Scripts\python.exe app.py
pause
