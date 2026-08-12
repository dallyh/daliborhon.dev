# syntax=docker/dockerfile:1

FROM node:lts-slim AS build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY www/package.json ./www/package.json
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm config set --location=project inject-workspace-packages true && \
    pnpm install --no-frozen-lockfile

COPY . .

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
ARG HCAPTCHA_SECRET_KEY
ARG HCAPTCHA_SITE_KEY
ARG RESEND_API_KEY
ARG UMAMI_URL
ARG CONTACT_FORM_ACCESS_KEY
ARG UMAMI_SITE_ID

ENV NODE_ENV=production

RUN --mount=type=cache,id=astro-cache,target=/app/www/node_modules/.astro \
    pnpm config set --location=project inject-workspace-packages true && \
    pnpm run build:web && \
    pnpm run deploy:web

FROM node:lts-slim AS runtime

WORKDIR /app
COPY --from=build /app/deploy .

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

EXPOSE 4321
USER node

CMD ["node", "./dist/server/entry.mjs"]
