# --- Stage 1: Build & Dependencies ---
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Use 'npm ci' for deterministic, repeatable builds
# --omit=dev ensures we don't install devDependencies in production
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# --- Stage 2: Production Runtime ---
FROM node:22-alpine

# Set Node environment to production
ENV NODE_ENV=production

# Install dumb-init to handle PID 1 signal forwarding (graceful shutdowns)
RUN apk add --no-cache dumb-init

# Set the working directory
WORKDIR /app

# Copy node_modules and app source from the builder stage
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app .

# Security: Switch to the non-root 'node' user provided by the alpine image
USER node

# Expose the API port
EXPOSE 3000

# Use dumb-init as the entrypoint, and run node directly (not npm start)
# npm swallows system signals (like SIGTERM), preventing graceful shutdowns in Kubernetes
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]