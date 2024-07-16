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
- Content management
    - For content I do use plain markdown (Astro's content collections) and [Sveltia](https://github.com/sveltia/sveltia-cms) to manage it.

## Deployment

Deployments are done on [Zerops](https://zerops.io) for all new tags containing `cms-*` (automatically by [Sveltia](https://github.com/sveltia/sveltia-cms)) or `deploy-*` (manually).


## Variables

List of used variables can be found in the [astro.config.mjs](./astro.config.mjs) file.

## Commands

| Command             | Action                                                                  |
| :------------------ | :---------------------------------------------------------------------- |
| `dev`               | Starts local dev server at `localhost:4321`                             |
| `dev:tunnel`        | Runs a localtunnel proxy to test endpoints                              |
| `dev-host`          | Starts local dev server hosted at a network                             |
| `build`             | Build production site to `./dist/`                                      |
| `start`             | Starts the production server                                            |
| `preview`           | Preview the build locally with Wrangler                                 |
| `astro ...`         | Run CLI commands like `astro add`, `astro preview`                      |
| `sync`              | Runs the `astro sync` command to generate content collection types      |
| `format:code`       | Formattes code using Biome and Prettier                                 |
| `format:imports`    | Formattes imports using Biome                                           |
| `build:index`       | Generates indexes for Pagefind from `./dist/` (site mustbe built first) |
| `compile:paraglide` | Compiles Paraglide project located at `./project.inlang`                |
