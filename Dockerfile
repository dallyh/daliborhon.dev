# --- Stage 1: Builder ---
FROM node:22-slim AS build

ARG ASTRO_DB_APP_TOKEN
ARG ASTRO_DB_REMOTE_URL
ARG GITHUB_API_AUTH_TOKEN
ARG OA_GITHUB_CLIENT_ID
ARG OA_GITHUB_CLIENT_SECRET
ARG PREVIEW
ARG UPTIME_API_TOKEN

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable 

COPY . /app
WORKDIR /app

RUN pnpm config set inject-workspace-packages true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm --filter @daliborhon.dev/web build
RUN pnpm deploy ./deploy --filter "@daliborhon.dev/web"
    
# --- Stage 2: Runtime ---
FROM node:22-slim AS runtime

RUN corepack enable

WORKDIR /app
COPY --from=build /app/deploy .

# Optional: switch to non-root user for security
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Start the app
CMD ["pnpm", "start"]
