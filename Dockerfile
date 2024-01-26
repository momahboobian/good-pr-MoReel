# Use node:18-alpine as base image
FROM node:18-alpine AS base

# Install libc6-compat for Prisma
RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Build and compile source code
FROM base AS builder

# Set working directory
WORKDIR /app

# Copy only necessary files for building
COPY . .

# Run npm build
RUN npm run build

# Production image
FROM base AS runner

# Set working directory
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create user and group
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy only necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Set the correct permission for prerender cache
RUN chown -R nextjs:nodejs /app/.next

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="localhost"

# Run the application
CMD ["npm", "start"]