# Welcome to my [CMS!](https://studio.daliborhon.dev)

## Info

This is a [Sanity Studio](https://sanity.io) project for my personal website, which I plan to use as a blog.
The project is continually in development, as I also take it as an opportunity to learn something new.
There is nothing special in this project, it uses some Studio plugins to build the schema.

Two datasets are used, one for production and one for development.

## Deployment

Deployments are done through Cloudflare pages on the main branch (production), and on all other `dev-*` branches as preview.
Past deployments are automatically deleted by a scheduled [worker](https://github.com/dallyh/cf-worker-clean-deployments).

## Commands

| Command          | Action                                                |
| :--------------- | :---------------------------------------------------- |
| `dev`            | Starts local dev server at `localhost:3333`           |
| `start`          | Alias to `sanity preview`, previews the build locally |
| `build`          | Build production Studio to `./dist/`                  |
| `build:turbo`    | Builds the project using Turborepo                    |
| `deploy`         | Deploys the Sanity studio to Sanity's servers         |
| `deploy:graphql` | Deploys the schema as GraphQL endpoint                |

