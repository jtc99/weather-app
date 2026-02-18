#!/usr/bin/env bash
set -euo pipefail

echo "Tailing logs for services (press Ctrl+C to exit)..."
docker-compose logs -f --tail=200
