# Deployment Guide

## Overview

The app is packaged as a single Docker container that serves both the React frontend and Node.js backend on port 5000. SQLite database and uploaded files are persisted via a named Docker volume.

---

## Prerequisites

- Docker and Docker Compose installed on the server
- Git access to the repository

---

## Environment Setup

Create a `.env` file in the project root (next to `docker-compose.yml`):

```env
JWT_SECRET=your-strong-random-secret-here
ADMIN_PASSWORD=your-secure-admin-password
```

Generate a strong `JWT_SECRET`:
```bash
openssl rand -hex 32
```

> The `.env` file is gitignored and must be created manually on each server.

---

## First Deploy

```bash
# 1. Clone the repo
git clone <repository-url>
cd bimsara-web-v1

# 2. Create the .env file
cp .env .env   # then edit with real values

# 3. Build and start
docker compose up -d --build
```

The server starts at `http://localhost:5000`.

On first startup, the database is automatically initialized and an `admin` user is created with the password from `ADMIN_PASSWORD`.

---

## Updating the App

```bash
# Pull latest code
git pull

# Rebuild and restart (zero-downtime swap)
docker compose up -d --build
```

No data is lost — uploads and the database live in the `app-data` volume, not inside the container.

---

## Persistent Data

| Path inside container | What it holds |
|-----------------------|---------------|
| `/app/data/bimsara_admin.db` | SQLite database |
| `/app/data/uploads/` | Uploaded images and files |

Both are stored in the `app-data` Docker volume. To back up:

```bash
# Copy database to host
docker compose cp app:/app/data/bimsara_admin.db ./backup.db

# Copy uploads to host
docker compose cp app:/app/data/uploads ./uploads-backup
```

---

## Admin Panel

After deployment, log in at:

```
http://<your-server-ip>:5000/admin
```

Default credentials (set via `ADMIN_PASSWORD` in `.env`):
- Username: `admin`
- Password: *(value of ADMIN_PASSWORD)*

---

## Production Checklist

- [ ] Set a strong `JWT_SECRET` in `.env`
- [ ] Set a strong `ADMIN_PASSWORD` in `.env`
- [ ] Update `frontend/.env.production` → `REACT_APP_API_URL` to the real domain
- [ ] Rebuild the Docker image after changing `frontend/.env.production`
- [ ] Set up a reverse proxy (Nginx/Caddy) to handle HTTPS in front of port 5000
- [ ] Point your domain DNS to the server IP

---

## Nginx Reverse Proxy (example)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Stopping / Removing

```bash
# Stop the container
docker compose down

# Stop and remove the volume (DELETES ALL DATA)
docker compose down -v
```

---

## Logs

```bash
# Follow live logs
docker compose logs -f app

# Last 100 lines
docker compose logs --tail=100 app
```
