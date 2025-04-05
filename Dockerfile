# --- Stage 1: Builder ---
FROM node:22 AS builder

ARG ASTRO_DB_APP_TOKEN
ARG ASTRO_DB_REMOTE_URL
ARG GITHUB_API_AUTH_TOKEN
ARG OA_GITHUB_CLIENT_ID
ARG OA_GITHUB_CLIENT_SECRET
ARG PREVIEW
ARG UPTIME_API_TOKEN

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

# ✅ Enable corepack, which will install pnpm
RUN corepack enable

# Only copy the deploy folder from builder (lean image!)
COPY --from=builder /app/deploy .

# Optional: switch to non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Start the app
CMD ["pnpm", "start"]
