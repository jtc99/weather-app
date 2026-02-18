#!/usr/bin/env bash
set -euo pipefail

# Build and run the stack (detached)
docker-compose up --build -d

echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
