# Weather App — Local One‑Button Deploy

This repository contains a simple weather app (React frontend + FastAPI backend). A Docker Compose setup lets you run the full stack locally with one command.

## Prerequisites
- Docker Desktop installed and running (macOS/Windows/Linux)
- Git (optional: push/pull to remote)

## One-button local deploy
From the project root run:
```bash
./start.sh
```
This builds images and starts services in detached mode. Then open:
- Frontend (SPA): http://localhost:5173
- Backend (API):  http://localhost:8000

## Stop the stack
```bash
./stop.sh
```

## View logs
```bash
./logs.sh
```

## Configure OpenWeather API key (local)
1. Create or update `backend/.env` with:
```env
OPENWEATHER_API_KEY=your_real_key_here
```
2. Restart the stack (`./stop.sh && ./start.sh`). The backend container reads `backend/.env` via `docker-compose`.

## Notes
- The frontend container serves the built SPA through nginx and proxies `/api/*` to the backend service inside Docker (no CORS required for local dev).
- Do NOT commit `backend/.env` — it is included in `.gitignore`.

## Troubleshooting
- If ports are already in use, stop the conflicting process or change ports in `docker-compose.yml`.
- If Docker build fails, check Docker Desktop logs and ensure you have network access for npm/pip installs.

If you'd like, I can also add a `Makefile` to provide `make up`, `make down`, `make logs` shortcuts.
