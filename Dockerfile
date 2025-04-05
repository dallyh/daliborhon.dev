# --- Stage 1: Builder ---
FROM node:22 AS builder

# Set working dir
WORKDIR /app

# Copy everything
COPY . .

# Enable workspace package injection for monorepos
RUN corepack enable && \
    pnpm config set inject-workspace-packages true && \
    pnpm install && \
    pnpm --filter @daliborhon.dev/web build && \
    pnpm deploy ./deploy --filter "@daliborhon.dev/web"

# --- Stage 2: Runtime ---
FROM node:22-slim AS runtime

# Set working dir
WORKDIR /app

# Only copy the deploy folder from builder (lean image!)
COPY --from=builder /app/deploy .

# Optional: switch to non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Start the app
CMD ["pnpm", "start"]
