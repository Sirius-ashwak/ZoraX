# Multi-stage build for ZoraX
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/
RUN npm ci --only=production && npm cache clean --force

# Build the frontend
FROM base AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:frontend

# Build the backend
FROM base AS backend-builder
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm ci
COPY backend/ ./backend/
RUN cd backend && npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built applications
COPY --from=frontend-builder /app/dist ./dist
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copy necessary files
COPY backend/package.json ./backend/
COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3001

ENV NODE_ENV=production
ENV PORT=3001

CMD ["npm", "run", "start"]