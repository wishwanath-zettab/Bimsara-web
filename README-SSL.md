# SSL / HTTPS Setup

This document describes the HTTPS support added to `backend/server.js` and how to configure it for deployment.

## How it works

At startup (`db.ready.then(...)` at the bottom of `backend/server.js`), the server checks two environment variables:

| Variable | Purpose |
|---|---|
| `SSL_CERT_PATH` | Path (inside the container) to the PEM certificate, full chain preferred |
| `SSL_KEY_PATH` | Path (inside the container) to the PEM private key (must not be passphrase-protected) |

- **Both set and both files exist** → an HTTPS server starts on port **443** serving the app, and a small HTTP server on port **80** that only 301-redirects every request to `https://`.
- **Otherwise** (e.g. local development) → the server falls back to plain HTTP on port 80, exactly as before this change. No local setup is required.

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

The certificate files live on the host at `/opt/devops/certs/new_cert/` and are bind-mounted read-only into the container by `docker-compose.yml`:

```yaml
ports:
  - "80:80"
  - "443:443"
volumes:
  - /opt/devops/certs/new_cert:/app/certs:ro
environment:
  - SSL_CERT_PATH=/app/certs/STAR.bimsara.com.crt
  - SSL_KEY_PATH=/app/certs/STAR.bimsara.com.key
```

Deploy with:

```bash
docker compose up -d --build
```

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

Node reads the cert files **once at startup**. After replacing the files in `/opt/devops/certs/new_cert/`, restart the container:

```bash
docker compose restart app
```
