# Frontend Docker Guide

This guide runs the Next.js frontend from a production Docker image.

## Prerequisites

- Docker Desktop is installed and running.
- The backend is available at the URL supplied to `NEXT_PUBLIC_BACKEND_URL`.
- Commands below are run from the repository root unless stated otherwise.

## Build the image

The frontend uses Next.js standalone output. Build it with the backend URL that the browser should use:

```bash
docker build \
  --build-arg NEXT_PUBLIC_BACKEND_URL=https://projectapi-backend.duckdns.org \
  --build-arg NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
  -t projectapi-frontend:latest \
  ./frentent
```

For a local backend, use a browser-reachable URL such as:

```bash
docker build \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:5000 \
  --build-arg NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
  -t projectapi-frontend:local \
  ./frentent
```

`NEXT_PUBLIC_BASE_URL` is also supplied at build time because the `/docs` page reads it while Next.js prerenders the application. Set it to the public frontend URL used by your deployment.

If the build cache is stale, rebuild without cache:

```bash
docker build --no-cache \
  --build-arg NEXT_PUBLIC_BACKEND_URL=https://projectapi-backend.duckdns.org \
  --build-arg NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
  -t projectapi-frontend:latest \
  ./frentent
```

## Run the container

Run in the background and map port `3000` on the host to port `3000` in the container:

```bash
docker run -d \
  --name projectapi-frontend \
  --restart unless-stopped \
  -p 3000:3000 \
  projectapi-frontend:latest
```

Open the application at <http://localhost:3000>.

To run in the foreground while debugging:

```bash
docker run --rm \
  --name projectapi-frontend \
  -p 3000:3000 \
  projectapi-frontend:latest
```

If port `3000` is already in use, expose the container on another host port:

```bash
docker run -d \
  --name projectapi-frontend \
  -p 3001:3000 \
  projectapi-frontend:latest
```

Then open <http://localhost:3001>.

> In PowerShell, use the backtick (`` ` ``) for line continuation, or put each Docker command on one line.

## Check the running app

```bash
docker ps
docker logs --tail 100 projectapi-frontend
curl -I http://localhost:3000
```

A successful startup keeps the container running and returns an HTTP response from port `3000`. Also test login, dashboard, and API calls in the browser and inspect the browser Network panel.

## Logs and container management

Follow logs:

```bash
docker logs -f projectapi-frontend
```

Restart the container:

```bash
docker restart projectapi-frontend
```

Stop and remove it:

```bash
docker stop projectapi-frontend
docker rm projectapi-frontend
```

Remove the image after stopping the container:

```bash
docker rmi projectapi-frontend:latest
```

To use the same container name again after a failed or old run, remove the old container first:

```bash
docker rm -f projectapi-frontend
```

## Environment and networking notes

- `NEXT_PUBLIC_BACKEND_URL` is public configuration, not a secret. Next.js embeds values used by client-side code during `next build`, so changing the backend URL requires rebuilding the image with a new `--build-arg`.
- Passing `-e NEXT_PUBLIC_BACKEND_URL=...` only to `docker run` does not reliably change an already-built browser bundle. Build the image again instead.
- The URL must be reachable from the user's browser. A Docker-only hostname such as `backend:5000` normally cannot be used by browser-side requests.
- The `/api/*` rewrite is configured by `next.config.ts` and is built with the selected backend URL.
- Configure backend CORS, cookies, and allowed frontend origin for the deployed frontend URL.
- Do not pass Sentry credentials, backend credentials, or other secrets as Docker build arguments or frontend `NEXT_PUBLIC_*` variables.
- The existing `.dockerignore` excludes `.env*`, `node_modules`, `.next`, Git files, and editor files. Local environment files are intentionally not copied into the image.

## Rebuild after source changes

A production image does not update when source files change. Build a new image and replace the container:

```bash
docker build \
  --build-arg NEXT_PUBLIC_BACKEND_URL=https://projectapi-backend.duckdns.org \
  --build-arg NEXT_PUBLIC_BASE_URL=http://localhost:3000 \
  -t projectapi-frontend:latest \
  ./frentent

docker rm -f projectapi-frontend 2>/dev/null || true
docker run -d \
  --name projectapi-frontend \
  --restart unless-stopped \
  -p 3000:3000 \
  projectapi-frontend:latest
```
