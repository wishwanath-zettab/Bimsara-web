#!/bin/sh
set -e

DATA_DIR=/app/data

# Ensure persistent data directories exist
mkdir -p "$DATA_DIR/uploads"

# Symlink /app/server/uploads → /app/data/uploads
# (removes the empty dir created at build time, replaces with symlink)
rm -rf /app/server/uploads
ln -s "$DATA_DIR/uploads" /app/server/uploads

# Symlink /app/server/bimsara.db → /app/data/bimsara.db
# SQLite will follow the symlink and create the file at the volume path
ln -sf "$DATA_DIR/bimsara.db" /app/server/bimsara.db

# Run seed on first start (DB file does not yet exist in the volume)
if [ ! -f "$DATA_DIR/bimsara.db" ]; then
  echo "No database found — running seed..."
  node server/seed.js
fi

echo "Starting server..."
exec node server/index.js
