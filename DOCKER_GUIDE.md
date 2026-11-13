# Docker Deployment Guide

The Docker guide for building, running, and managing the backend container has been documented in:
👉 [`backend/DOCKER_GUIDE.md`](./backend/DOCKER_GUIDE.md)

### Quick Run:
```bash
# Build
docker build -t projectapi_backend ./backend

# Run
docker run -d --name projectapi_backend -p 5000:5000 --env-file ./backend/.env projectapi_backend
```
