# --- Stage 1: Builder ---
FROM node:23-slim AS build

ARG GITHUB_API_AUTH_TOKEN
ARG OA_GITHUB_CLIENT_ID
ARG OA_GITHUB_CLIENT_SECRET
ARG PREVIEW
ARG UPTIME_API_TOKEN
ARG UMAMI_USERNAME
ARG UMAMI_PASSWORD
ARG SITE
ARG COOLIFY_BRANCH
ARG SOURCE_COMMIT

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable 

COPY . /app
WORKDIR /app

RUN pnpm config set inject-workspace-packages true
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
# Cache .astro build artifacts
RUN --mount=type=cache,id=astro_cache,target=/app/node_modules/.astro pnpm run build:web
RUN pnpm run deploy:web

# --- Stage 2: Runtime ---
FROM node:23-slim AS runtime

RUN corepack enable

WORKDIR /app
COPY --from=build /app/deploy .

# Start the app
CMD ["pnpm", "start"]
