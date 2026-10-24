
# ==========================================
# Multi-stage Dockerfile for Backend API
# Runs as ROOT user
# ==========================================

# 1. Base Stage
FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl


# 2. Dependencies Stage
FROM base AS deps

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

# Generate Prisma Client (build-time dummy DATABASE_URL for Prisma 7 config evaluation)
ENV DATABASE_URL="postgresql://placeholder:5432/db"
RUN npx prisma generate


# 3. Builder Stage
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY package*.json tsconfig.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
COPY src ./src

RUN npm run build


# 4. Production Runner Stage
FROM base AS runner

ENV NODE_ENV=production
ENV PORT=5000

WORKDIR /app

# Copy dependencies, build output and Prisma files
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY package*.json ./

# Explicitly run as root
USER root

EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:5000/ || exit 1

# Start the backend
CMD ["npm", "run", "start"]
