# Welcome to my [Website!](https://daliborhon.dev)

## Info

This is an [Astro](https://astro.build) and [Sanity](https://sanity.io) project, to be used as my personal website.
All of the hosting is currently done on [Cloudflare](https://cloudflare.com).

This project uses `pnpm` as it's package manager. It is installed using `corepack`. If you don't have it enabled, please see the [corepack docs](https://nodejs.org/api/corepack.html).

> [!WARNING]
> I'm not a developer (but i'm trying). Please be vary of what lies in this repository.

For more info please see the [frontend](./apps/frontend/README.md) readme, and the [studio](./apps/studio/README.md) readme files.

## Turborepo

Because I see myself rebuilding this project on Cloudflare many times even without any changes, I do use remote cache for Turborepo.
The cache is hosted on Cloudflare, and uses [this](https://adirishi.github.io/turborepo-remote-cache-cloudflare/) package to do so.

### Variables

Variables in `.env` are used only locally, variables in `.dev.vars` or `wrangler.toml` are used in the Cloudflare's runtime.

| Name                             | Defined in (per package/app) | Description                                                                                           |
| :------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| TURBO_API                        | wrangler.toml                | URL for self hosted Turborepo remote cache                                                            |
| TURBO_TEAM                       | wrangler.toml                | See [here](https://adirishi.github.io/turborepo-remote-cache-cloudflare/introduction/setup-turborepo) |
| TURBO_REMOTE_CACHE_SIGNATURE_KEY | .dev.vars                    | See [here](https://adirishi.github.io/turborepo-remote-cache-cloudflare/introduction/setup-turborepo) |
| TURBO_TOKEN                      | .dev.vars                    | See [here](https://adirishi.github.io/turborepo-remote-cache-cloudflare/introduction/setup-turborepo) |
