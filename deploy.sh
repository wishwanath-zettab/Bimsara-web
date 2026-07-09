#!/bin/bash
set -euo pipefail

APP_DIR="/opt/devops/bweb/Bimsara-web"
LOG_FILE="/var/log/bimsara-deploy.log"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

fail() {
    log "ERROR: $*"
    exit 1
}

# Trap unexpected errors
trap 'fail "Script failed at line $LINENO. Check $LOG_FILE for details."' ERR

log "========== Deployment Started =========="

# --- Prerequisite checks ---
command -v git    >/dev/null 2>&1 || fail "git is not installed."
command -v docker >/dev/null 2>&1 || fail "docker is not installed."

docker info >/dev/null 2>&1 || fail "Docker daemon is not running. Start it with: sudo systemctl start docker"

# --- Validate app directory ---
[ -d "$APP_DIR" ] || fail "App directory not found: $APP_DIR"
[ -f "$APP_DIR/docker-compose.yml" ] || [ -f "$APP_DIR/compose.yml" ] \
    || fail "No docker-compose.yml found in $APP_DIR"

cd "$APP_DIR" || fail "Cannot cd into $APP_DIR"

# --- Git pull ---
log "Pulling latest changes..."

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Not a git repository: $APP_DIR"

BEFORE_HASH=$(git rev-parse HEAD)

git fetch origin 2>&1 | tee -a "$LOG_FILE" || fail "git fetch failed. Check network/SSH keys."
git pull         2>&1 | tee -a "$LOG_FILE" || fail "git pull failed. Resolve conflicts manually."

AFTER_HASH=$(git rev-parse HEAD)

if [ "$BEFORE_HASH" = "$AFTER_HASH" ]; then
    log "No new changes detected (already up to date)."
else
    log "Updated: ${BEFORE_HASH:0:7} -> ${AFTER_HASH:0:7}"
fi

# --- Docker rebuild ---
log "Bringing down existing containers..."
docker compose down 2>&1 | tee -a "$LOG_FILE" \
    || fail "docker compose down failed."

log "Building Docker image (no cache)..."
docker compose build --no-cache 2>&1 | tee -a "$LOG_FILE" \
    || fail "docker compose build failed."

log "Starting containers..."
docker compose up -d 2>&1 | tee -a "$LOG_FILE" \
    || fail "docker compose up failed."

# --- Health check ---
log "Waiting for containers to become healthy..."
sleep 5

RUNNING=$(docker compose ps --status running -q | wc -l)
if [ "$RUNNING" -eq 0 ]; then
    log "Container logs (last 50 lines):"
    docker compose logs --tail=50 2>&1 | tee -a "$LOG_FILE"
    fail "No containers are running after startup. See logs above."
fi
log "$RUNNING container(s) running."

log "========== Deployment Complete =========="
log "Logs: $LOG_FILE"
