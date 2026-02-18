#!/usr/bin/env bash
set -euo pipefail

echo "Stopping weather-app stack..."
docker-compose down

echo "Stopped."
