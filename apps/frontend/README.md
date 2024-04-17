# Welcome to my [Website!](https://daliborhon.dev)

## Info

This is an [Astro](https://astro.build) project for my personal website, which I plan to use as a blog.
The project is continually in development, as I also take it as an opportunity to learn something new.

I guess for experienced developers a lot of things in this repo will not make any sense, however, everybody has to start somewhere.

## Stack

-   Frameworks:
    -   [Astro](https://astro.build)
    -   Some of the UI: [React](https://react.dev/)
    -   Internationalization [Inlang - ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
-   Content Management:
    -   [Sanity](https://sanity.io) is used for content management (blog, projects), also see the [Sanity Studio](../studio/README.md) application, which I use to define the schemas.
    -   [Astro Markdown](https://docs.astro.build/en/guides/markdown-content/) is used to manage other content

## Deployment

Deployments are done through Cloudflare pages on the main branch (production), and on all other `dev-*` branches as preview.
Past deployments are automatically deleted by a scheduled [worker](https://github.com/dallyh/cf-worker-clean-deployments).

### Webhooks

Deploy is also triggered by a new post/project in the CMS (Sanity). This is done through an endpoint, which authenticates the request and in turn calls a deploy hook provided by Cloudflare. The endpoint is localed at a path `/api/build` and it accepts a POST request with some headers.

Currently only preview deployment is set up, production deployment is done manually after a review of the preview by me.
That is, every new post and or project calls this endpoint with build environment set to preview. This endpoint in turn calls the preview webhook from Cloudflare,
which is set to trigger a build for the `dev` branch.

| Header                   | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| sanity-webhook-signature | Secret signature to authenticate the call from Sanity                    |
| x-webhook-build-env      | What environment to build. Possible values are 'prod', 'preview', 'all'. |

## Variables

Variables in `.env` are used only locally, variables in `.dev.vars` or `wrangler.toml` are used in the Cloudflare's runtime.

| Name                              | Defined in    | Description                                              |
| :-------------------------------- | ------------- | -------------------------------------------------------- |
| CLOUDFLARE_PREVIEW_BUILD_HOOK_URL | .dev.vars     | URL for Cloudflare's build hook url for preview build    |
| CLOUDFLARE_PROD_BUILD_HOOK_URL    | .dev.vars     | URL for Cloudflare's build hook url for production build |

## Commands

| Command                  | Action                                                                  |
| :----------------------- | :---------------------------------------------------------------------- |
| `dev`                    | Starts local dev server at `localhost:4321`                             |
| `dev:tunnel`             | Runs a localtunnel proxy to test endpoints                              |
| `dev-host`               | Starts local dev server hosted at a network                             |
| `build`                  | Build production site to `./dist/`                                      |
| `preview`                | Preview the build locally with Wrangler                                 |
| `astro ...`              | Run CLI commands like `astro add`, `astro preview`                      |
| `sync`                   | Runs the `astro sync` command to generate content collection types      |
| `prettier-check`         | Runs the `prettier . --check` command to check for formatting problems  |
| `prettier-format`        | Runs the `prettier . --write` command to fix formatting problems        |
| `build-and-preview`      | Builds production site and previews locally using Wrangler              |
| `build:index`            | Generates indexes for Pagefind from `./dist/` (site mustbe built first) |
| `build:turbo`            | Builds the project using Turborepo                                      |
| `compile:paraglide`      | Compiles Paraglide project located at `./project.inlang`                |
| `wrangler:types`         | Generates Wrangler types                                                |
