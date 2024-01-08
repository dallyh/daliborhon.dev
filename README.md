# Welcome to my [Website!](https://daliborhon.dev)
<p align="center">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/dallyh/daliborhon.dev/deploy.yaml">
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/dallyh/daliborhon.dev">
</p>

## Info
This is an [Astro](https://astro.build) project for my personal website, which I play to use as a blog.
The project is continually in development, as I also take it as an opportunity to learn something new.

This is a fully static website hosted on GitHub pages, using a fully static CMS for content management.

I guess for experienced developers a lot of things in this repo will not make any sense, however, everybody has to start somewhere.

## Stack
- Frameworks: 
  - [Astro](https://astro.build)
  - Some of the UI: [React](https://react.dev/)
  - Internationalization [i18next](https://www.i18next.com/)
- Content Management System: [Static CMS](https://staticcms.org)
  - User authorization: [Static CMS GitHub OAuth provider](https://github.com/dallyh/static-cms-gh-oauth-provider)

## Deployment
Deployments are done either on a new commit to the `main` branch (production), or on a new pull request for `main` branch.

Pull request creates a new build just for that particular pull request, which is used to preview the site. 
Previews are hosted [here](https://github.com/dallyh/deploy-previews).

## Commands
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                                 |
| :------------------------ | :--------------------------------------------------------------------- |
| `npm install`             | Installs dependencies                                                  |
| `npm run dev`             | Starts local dev server at `localhost:4321`                            |
| `npm run dev-host`        | Starts local dev server hosted at a network                            |
| `npm run build`           | Build production site to `./dist/`                                     |
| `npm run preview`         | Preview the build locally                                              |
| `npm run preview-host`    | Preview the build hosted at a network                                  |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro preview`                     |
| `npm run sync`            | Runs the `astro sync` command to generate content collection types     |
| `npm run prettier-check`  | Runs the `prettier . --check` command to check for formatting problems |
| `npm run prettier-format` | Runs the `prettier . --write` command to fix formatting problems       |
| `npm run astro --help`    | Get help using the Astro CLI                                           |
