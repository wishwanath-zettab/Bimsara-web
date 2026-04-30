#!/bin/sh
set -e

DATA_DIR=/app/data

# Ensure persistent data directories exist
mkdir -p "$DATA_DIR/uploads"

# Symlink /app/uploads → /app/data/uploads
rm -rf /app/uploads
ln -s "$DATA_DIR/uploads" /app/uploads

# Symlink /app/bimsara_admin.db → /app/data/bimsara_admin.db
ln -sf "$DATA_DIR/bimsara_admin.db" /app/bimsara_admin.db

echo "Starting server..."
exec node server.js
