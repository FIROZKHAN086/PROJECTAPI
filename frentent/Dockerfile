# Install dependencies in a dedicated layer for better build caching.
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build the Next.js application as a standalone server.
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY . .

# Keep public available even when the project has no public directory.
RUN mkdir -p /app/public

ARG NEXT_PUBLIC_BACKEND_URL=https://projectapi-backend.duckdns.org
ARG NEXT_PUBLIC_BASE_URL=https://projectapi.firozkhan.site
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL} \
    NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

RUN npm run build

# Run only the standalone production output.
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
