# ── Stage 1: Build Vite frontend ────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ── Stage 2: Production runtime ─────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

# Production deps only
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev

# Server code
COPY server/ ./server/

# Seed data sources (seed.js reads these)
COPY src/data/ ./src/data/
COPY src/assets/images/ ./src/assets/images/

# Built frontend from stage 1
COPY --from=builder /app/dist ./dist

# Entrypoint
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Ensure uploads dir exists at build time
RUN mkdir -p server/uploads

EXPOSE 3001

ENV NODE_ENV=production

ENTRYPOINT ["./entrypoint.sh"]
