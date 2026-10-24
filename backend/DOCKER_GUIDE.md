# Comprehensive Docker Deployment Guide (ProjectAPI Backend)

This guide provides step-by-step instructions for building, running, debugging, and managing the ProjectAPI backend Docker container and multi-service stack with Docker Compose.

---

## 1. Quick Reference Commands

| Action | Command |
| :--- | :--- |
| **Build Docker Image** | `docker build -t projectapi_backend .` |
| **Run Container (Detached + Port 5000)** | `docker run -d --name projectapi_backend -p 5000:5000 --env-file .env projectapi_backend` |
| **Check Container Status** | `docker ps -a --filter "name=projectapi_backend"` |
| **Stream Live Logs** | `docker logs -f projectapi_backend` |
| **Test Health Endpoint** | `curl -i http://localhost:5000/` |
| **Stop Container** | `docker stop projectapi_backend` |
| **Restart Container** | `docker restart projectapi_backend` |
| **Remove Container** | `docker rm -f projectapi_backend` |
| **Run with Docker Compose** | `docker compose up -d --build` |
| **Stop Docker Compose** | `docker compose down` |

---

## 2. Prerequisites

1. Ensure **Docker Desktop** is installed and running:
   ```bash
   docker --version
   docker info
   ```
2. Ensure your `.env` file exists in the `backend/` directory with proper database, redis, and auth variables. (See `.env.example` for reference).

---

## 3. How to Build the Docker Image

### Standard Build
Navigate to the `backend` directory and run:
```bash
cd backend
docker build -t projectapi_backend .
```

### Build with No Cache (Clean Rebuild)
If you updated dependencies or Prisma schemas:
```bash
docker build --no-cache -t projectapi_backend .
```

### Using npm shortcut
```bash
npm run docker:build
```

---

## 4. How to Run the Docker Container

### Run with Environment File & Port Mapping
Run the container in detached mode (`-d`), binding host port `5000` to container port `5000`:
```bash
docker run -d \
  --name projectapi_backend \
  -p 5000:5000 \
  --env-file .env \
  projectapi_backend
```

### Run with Automatic Restart on Crash
```bash
docker run -d \
  --name projectapi_backend \
  --restart unless-stopped \
  -p 5000:5000 \
  --env-file .env \
  projectapi_backend
```

### Run in Interactive Foreground Mode (For Debugging)
```bash
docker run --rm -it \
  -p 5000:5000 \
  --env-file .env \
  projectapi_backend
```

---

## 5. Verifying & Inspecting the Running Container

### 1. Check Container Health and Port Status
```bash
docker ps
```
*Expected Output:*
```text
CONTAINER ID   IMAGE                COMMAND                  STATUS                  PORTS
ad2ea3a14a58   projectapi_backend   "docker-entrypoint.s…"   Up (healthy)            0.0.0.0:5000->5000/tcp
```

### 2. View Application Logs
```bash
docker logs --tail 50 -f projectapi_backend
```
*Expected Output:*
```text
Server is listening on port 5000
Redis Connected
```

### 3. Test HTTP Response
```bash
curl -i http://localhost:5000/
```
*Expected Output:*
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{"success":true,"message":"API Running"}
```

### 4. Execute Interactive Shell Inside Container
```bash
docker exec -it projectapi_backend sh
```

---

## 6. How to Run with Docker Compose

To launch the backend service with Docker Compose:

### Start Services in Background
```bash
docker compose up -d --build
```

### View Compose Logs
```bash
docker compose logs -f backend
```

### Stop All Services
```bash
docker compose down
```

---

## 7. Troubleshooting & Common Issues

### Issue 1: Port 5000 is already in use
Check what process is holding port 5000:
```bash
netstat -ano | grep 5000
```
Stop the conflicting process or map to a different host port:
```bash
docker run -d --name projectapi_backend -p 5001:5000 --env-file .env projectapi_backend
```

### Issue 2: Redis Connection Error (`connect ENOENT`)
- Ensure `REDIS_URL` in `.env` is unquoted (do not wrap with `"..."` or `'...'` because `--env-file` passes quotes literally).
- The backend configuration automatically strips extraneous quotes:
  ```ts
  const cleanRedisUrl = (process.env.REDIS_URL || "").replace(/^["']|["']$/g, "");
  ```

### Issue 3: Container already exists error
If Docker says `The container name "/projectapi_backend" is already in use`:
```bash
docker rm -f projectapi_backend
```
Then run the `docker run` command again.
