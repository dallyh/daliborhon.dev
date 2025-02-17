# Welcome to my [Website!](https://daliborhon.dev)

## Info

This is an [Astro](https://astro.build) project for my personal website, which I plan to use as a blog.
The project is continually in development, as I also take it as an opportunity to learn something new.

This project and site is mostly just for me to have some coding fun. I don't really consider myself a developer, I'm more of a hobbyist when it comes to writing code.

## Stack

- Frameworks:
    - [Astro](https://astro.build)
    - Some of the UI: [React](https://react.dev/)
    - Internationalization [Inlang - ParaglideJS](https://inlang.com/m/gerre34r/library-inlang-paraglideJs)
- Content management
    - [Frontmatter CMS](https://frontmatter.codes/)
- Database
    - Self hosted [Libsql](https://github.com/tursodatabase/libsql) server

## Deployment

Deployments are done on [Zerops](https://zerops.io) for all new tags containing `deploy-*`.

## Database

Required env vars:

```
LIBSQL_BOTTOMLESS_ENDPOINT=https://storage-prg1.zerops.io
LIBSQL_BOTTOMLESS_BUCKET=bucket-name
LIBSQL_BOTTOMLESS_AWS_DEFAULT_REGION=eu-central-1
LIBSQL_BOTTOMLESS_AWS_ACCESS_KEY_ID=acces_key
LIBSQL_BOTTOMLESS_AWS_SECRET_ACCESS_KEY=secret_key
```

`libsql-server` does run in bottomless replication mode, and it is replicated to Zerops object storage which is esentially an S3 bucket.

## Variables

List of used variables can be found in the [astro.config.mjs](./www/web/astro.config.mjs) file.
