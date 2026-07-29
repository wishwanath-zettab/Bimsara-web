# SSL / HTTPS Setup

This document describes the HTTPS support added to `backend/server.js` and how to configure it for deployment.

> **On the shared VM (187.127.209.34) this path is OFF.** nginx owns 80/443
> there (Property Web qa/prod share the host and the VM has one public address),
> so it terminates TLS for `www.bimsara.com` / `bimsara.com` and proxies to the
> container's plain-HTTP listener on **8100** — the same shape as every
> propertyweb vhost. See `nginx/bimsaraweb.conf` in the **propertyweb-infra**
> repo. The certificate and key stay on the host; nothing is mounted into the
> container. The rest of this document applies only when running WITHOUT a
> proxy in front.

## How it works

At startup (`db.ready.then(...)` at the bottom of `backend/server.js`), the server checks two environment variables:

| Variable | Purpose |
|---|---|
| `SSL_CERT_PATH` | Path (inside the container) to the PEM certificate, full chain preferred |
| `SSL_KEY_PATH` | Path (inside the container) to the PEM private key (must not be passphrase-protected) |

- **Both set and both files exist** → an HTTPS server starts on `HTTPS_PORT` serving the app, and a small HTTP server on `PORT` that only 301-redirects every request to `https://`.
- **Otherwise** (e.g. local development) → the server falls back to plain HTTP on `PORT`, exactly as before this change. No local setup is required.

Ports are configurable so they can match the published host ports 1:1:

| Variable | Default | On the VM |
|---|---|---|
| `PORT` | `80` | `8100` — the app itself over plain HTTP; nginx proxies here |
| `HTTPS_PORT` | `443` | unused — the container terminates no TLS on this host |

## Code changes in `backend/server.js`

Two parts were added for this configuration.

**1. Import the `https` module** (top of the file, with the other requires):

```js
const https = require('https');
```

**2. Conditional HTTPS startup** (bottom of the file — this replaced the old block, which was just the `app.listen` call now living in the `else` branch):

```js
db.ready.then(() => {
  const certPath = process.env.SSL_CERT_PATH;
  const keyPath = process.env.SSL_KEY_PATH;

  if (certPath && keyPath && fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    const httpsServer = https.createServer(
      {
        cert: fs.readFileSync(certPath),
        key: fs.readFileSync(keyPath),
      },
      app
    );
    httpsServer.listen(443, HOST, () => {
      console.log(`HTTPS server is running on https://${HOST}:443`);
    });

    // Redirect plain HTTP to HTTPS
    express()
      .use((req, res) => {
        const host = (req.headers.host || '').split(':')[0];
        res.redirect(301, `https://${host}${req.url}`);
      })
      .listen(PORT, HOST, () => {
        console.log(`HTTP redirect server is running on http://${HOST}:${PORT}`);
      });
  } else {
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  }
});
```

Notes on the implementation:

- The cert and key are read synchronously once at startup — hence the container restart requirement after renewal (see below).
- The HTTP redirect server is a separate bare Express app so the main app's routes are never reachable over plain HTTP in production.
- The redirect strips any port from the incoming `Host` header and relies on the browser's default 443 for HTTPS.

## Server deployment

The shipped `docker-compose.yml` sets **none** of the TLS variables and mounts
no certificate, so the app serves itself over plain HTTP on a single port that
nginx proxies to:

```yaml
ports:
  - "${HTTP_HOST_PORT:-8100}:8100"
volumes:
  - app-data:/app/data
environment:
  - PORT=8100
  # SSL_CERT_PATH / SSL_KEY_PATH deliberately unset
```

nginx fronts `www.bimsara.com` / `bimsara.com` on 443 and proxies to
`http://127.0.0.1:8100` — identical in shape to the propertyweb frontend and
backend vhosts. The vhost is `nginx/bimsaraweb.conf` in the
**propertyweb-infra** repo; that repo's README covers installing and renewing
the certificate.

Keeping TLS out of the container means the private key never leaves the host,
and the certificate is renewed in exactly one place: replace the files in
`/etc/ssl/propweb` and `systemctl reload nginx`. No container restart, and no
chance of the two terminators drifting to different certificates.

Port 8100 is chosen to sit outside the 8081-8096 block that propertyweb qa/prod
reserve, so adding another propertyweb environment cannot collide with it. It is
published on all interfaces like the propertyweb containers, so `:8100` also
answers directly over plain HTTP — keep it closed at the firewall if the app
should only be reachable through nginx.

Deploy with `sudo /opt/bimsara-web/bweb-deploy`, or directly:

```bash
docker compose up -d --build
```

### Running it without a proxy

Set `SSL_CERT_PATH` / `SSL_KEY_PATH`, mount the certificate into the container,
set `PORT`/`HTTPS_PORT` to 80/443 and publish those ports directly. Only
possible where nothing else holds 80/443 — not this VM.

Verify:

```bash
curl -v https://www.bimsara.com/api/health   # should return {"status":"OK",...} with a valid cert chain
curl -I http://www.bimsara.com/api/health    # should return 301 → https://
```

## Certificate requirements and notes

- Files must be **PEM** encoded (`-----BEGIN CERTIFICATE-----` / `-----BEGIN ... PRIVATE KEY-----`). Extensions (`.crt`, `.key`, `.pem`) don't matter.
- The `.crt` should contain the **full chain** (leaf + intermediates). Check with `grep -c "BEGIN CERTIFICATE" STAR.bimsara.com.crt` — if it prints `1`, append the CA bundle: `cat STAR.bimsara.com.crt ca-bundle.crt > fullchain.crt` and point `SSL_CERT_PATH` at that file.
- Confirm the cert and key are a pair (hashes must match):
  ```bash
  openssl x509 -in STAR.bimsara.com.crt -noout -pubkey | sha256sum
  openssl pkey -in STAR.bimsara.com.key -pubout | sha256sum
  ```
- The wildcard `*.bimsara.com` covers subdomains (`www.`, `admin.`, ...) but **not** the bare `bimsara.com` unless the apex is listed in the cert's SANs. Check with:
  ```bash
  openssl x509 -in STAR.bimsara.com.crt -noout -text | grep -A1 "Subject Alternative Name"
  ```
- Keep the key private: `chmod 600` on the host, and never commit cert/key files to the repo.

## Certificate renewal

**On the VM this does not involve the container at all.** nginx is the only TLS
terminator, so renewal is: replace the two files in `/etc/ssl/propweb`, then
`sudo nginx -t && sudo systemctl reload nginx`. See the propertyweb-infra README.

Only when running *without* a proxy does the container hold the certificate. In
that case Node reads the files **once at startup**, so restart it after
replacing them:

```bash
docker compose restart app
```
