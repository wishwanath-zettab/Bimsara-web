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

# Ensure uploads dir exists at build time
RUN mkdir -p uploads

EXPOSE 5000

ENV NODE_ENV=production

ENTRYPOINT ["./entrypoint.sh"]
