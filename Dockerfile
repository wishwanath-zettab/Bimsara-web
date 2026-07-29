# ── Stage 1: Build React frontend ────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

COPY frontend/ ./
RUN npm run build

# ── Stage 2: Production runtime ─────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Production deps only
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Backend server code
COPY backend/ ./

# Built frontend from stage 1
COPY --from=builder /app/frontend/build ./client

# Entrypoint
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Ensure persistent data dirs exist at build time
RUN mkdir -p /app/data/uploads

# Informational only. The listener follows PORT at runtime; the compose file
# sets it to 8100 so the published port can match 1:1.
EXPOSE 8100

ENV NODE_ENV=production

ENTRYPOINT ["./entrypoint.sh"]
