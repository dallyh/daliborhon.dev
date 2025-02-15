---
title: Deploying libsql-server with Astro on Zerops
description: A guide on how to deploy libsql-server with Astro and a persistent database on Zerops.
tags:
    - development
    - astro
    - zerops
locale: en
draft: true
featured: true
image: ../../../assets/content/blog/deploying-libsql-server-with-astro-on-zerops.png
pubDate: 2025-02-12T21:17:21.957Z
modDate: null
fmContentType: blog
---

Deploying a persistent database using [`libsql-server`](https://github.com/tursodatabase/libsql/blob/main/libsql-server/README.md) alongside an [Astro](https://astro.build) project that leverages [`@astrojs/db`](https://docs.astro.build/en/guides/astro-db/) on [Zerops](https://zerops.io) is surprisingly straightforward.

For this guide you can either use your own existing Astro project, or you can clone the [example GitHub repository](https://github.com/dallyh/astro-libsql-zerops-example) and follow along.

:::tip
**Zerops** is a developer-first cloud platform that provides an easy-to-use and fully managed infrastructure for your projects. You can learn more at [zerops.io](https://zerops.io).
:::

:::note
This guide assumes you’re already familiar with [`@astrojs/db`](https://docs.astro.build/en/guides/astro-db/), Astro, and Zerops. If you’re new to any of these, I highly recommend checking them out before proceeding—you won’t regret it! Before diving in, make sure you have an Astro project set up with Astro DB integration.
:::

## Setting Up the Zerops Environment

To get a functional project running on Zerops, you’ll need three key services:

1. A **Node.js service** for the Astro frontend
2. An **object-storage service** to persist the database
3. An **Ubuntu-based service** to run `libsql-server`

In this tutorial, we’ll be using [`zcli`](https://docs.zerops.io/references/cli), a command-line utility, to create our Zerops project and all required services. If you haven’t installed `zcli` yet, set it up by following the [official documentation](https://docs.zerops.io/references/cli).

### Creating a Zerops Project and Services

You can either create a Zerops project manually or use a predefined YAML configuration. To make things efficient and for the sake of simplicity, we’ll use a `zerops-project-import.yml` file in the root of our Astro project.

```yaml
<!--zerops-project-import.yml-->
project:
    name: astro-libsql
    corePackage: LIGHT
services:
    - hostname: libsqld
      type: ubuntu@24.04
      verticalAutoscaling:
          cpu: 1
          cpuMode: SHARED
          minRam: 0.25
          maxRam: 1
          minDisk: 1
          maxDisk: 5
      minContainers: 1
      maxContainers: 1
    - hostname: frontend
      type: nodejs@22
      verticalAutoscaling:
          cpu: 1
          cpuMode: SHARED
          minRam: 0.25
          maxRam: 1
          minDisk: 1
          maxDisk: 5
      minContainers: 1
      maxContainers: 1
    - hostname: dbstorage
      type: object-storage
      objectStorageSize: 2
```

This YAML file defines the project and necessary services, ensuring a smooth setup. You can find a detailed breakdown of the format in the [Zerops documentation](https://docs.zerops.io/references/import).

To import the project to Zerops, run the following command in the root of the Astro project.

```sh
zcli project project-import ./zerops-project-import.yml
```

After running this, the expected output should look like:

```
➤  INFO  Import yaml found: C:\Repos\astro-libsql-zerops-example\zerops-project-import.yml
➤  INFO  Yaml file was checked
➤  INFO  Number of services to be added: 3
➤  INFO  Queued processes: 3
✔  DONE  dbstorage: stack.create
✔  DONE  frontend: stack.create
✔  DONE  libsqld: stack.create
➤  INFO  project imported
```

## Configuring and Deploying Services

Next, we need to configure and deploy the `libsqld` and `frontend` services. The `dbstorage` service requires no additional setup since it’s just an object storage instance.

### Setting Up the Services with zerops.yml

The `zerops.yml` file dictates how our services should be built and run. This file should be created in the root of the Astro project. You can find a specification of the format in the [Zerops documentation](https://docs.zerops.io/zerops-yml/specification).

Our file contains setups for the `libsqld` and `frontend` services along with predefined environment variables, build and runtime commands.

```yaml
<!--zerops.yml-->
zerops:
    - setup: libsqld
      run:
          base: ubuntu@24.04
          envVariables:
              LIBSQL_BOTTOMLESS_ENDPOINT: ${dbstorage_apiUrl}
              LIBSQL_BOTTOMLESS_BUCKET: ${dbstorage_bucketName}
              LIBSQL_BOTTOMLESS_AWS_DEFAULT_REGION: eu-central-1
              LIBSQL_BOTTOMLESS_AWS_ACCESS_KEY_ID: ${dbstorage_accessKeyId}
              LIBSQL_BOTTOMLESS_AWS_SECRET_ACCESS_KEY: ${dbstorage_secretAccessKey}
          prepareCommands:
              - curl --proto '=https' --tlsv1.2 -LsSf https://github.com/tursodatabase/libsql/releases/download/libsql-server-v0.24.31/libsql-server-installer.sh | sh
              - mv /root/.cargo/bin/sqld /usr/local/bin/sqld
          start: sqld --enable-bottomless-replication --http-listen-addr 0.0.0.0:8080
          ports:
              - port: 8080
                httpSupport: true
    - setup: frontend
      build:
          base: nodejs@22
          envVariables:
              ASTRO_DB_REMOTE_URL: ${RUNTIME_ASTRO_DB_REMOTE_URL}
          buildCommands:
              - npm install
              - npm run build:remote
          cache:
              - node_modules
          deployFiles:
              - dist
              - node_modules
              - package.json
      run:
          base: nodejs@22
          ports:
              - port: 4321
                httpSupport: true
          envVariables:
              HOST: 0.0.0.0
              ASTRO_DB_REMOTE_URL: http://libsqld:8080
          start: npm run start
```

### Deploying the Database Service

The database service is set to use `dbstorage` object storage for bottomless replication. In the `zerops.yml` file you can see that some environment variables are beginning with a prefix `LIBSQL_BOTTOMLESS-*`. Those variables point to automatically generated `dbstorage` oject storage environment variables accessible inside a Zerops project.

The `libsql-server` is installed in the runtime by invoking the `libsql-server` installer. After the installation is done, the `sqld` server daemon is moved the final directory, where it can be directly executed.

To push the `libsqld` service to Zerops, run:

```sh
zcli push
```

Select the `astro-libsql` project and then the `libsqld` service.

![zcli push - project list](../../../assets/content/blog/zcli-push-project.png)

![zcli push - service list](../../../assets/content/blog/zcli-push-libsqld.png)

After the service push is complete, the server daemon should start and it should also automatically create a database and start replicating it. The replication is active because bottomless replication is enabled by providing a `--enable-bottomless-replication` flag. You can very this in the Zerops dashboard under `libsqld` service runtime logs.

### Pushing the Database Schema

After deployment of the `libsqld` service, push the database schema using Astro DB’s `push` command.

For this we first need to connect to the [VPN](https://docs.zerops.io/references/vpn) provided by Zerops, so we can access the remote database server. You can connect to the VPN using `zcli vpn up`.

```sh
zcli vpn up && npx astro db push --remote
```

:::note
You have to have [Wireguard](https://www.wireguard.com/) installed for the VPN connection to be estabilished.
:::

#### Seeding the Database

To populate the database with initial data, run:

```sh
npx astro db execute ./db/seed.ts --remote
```

### Deploying the Frontend

To deploy the Astro project, run:

```sh
zcli push
```

Select `astro-libsql`, then the `frontend` service. Once deployed, the site should be accessible at `http://frontend:4321/` (while still connected to the VPN). Again the status of the service can be verified in the Zerops dashboard under `frontend` service runtime logs.

If you're using the [example GitHub repository](https://github.com/dallyh/astro-libsql-zerops-example), then after seeding, open the page [http://frontend:4321](http://frontend:4321) in your browser, and you should see comments from the database!

![Page with data](../../../assets/content/blog/zerops-astro-libsql-pg-data.png)

## Wrapping Up

At this point, you have successfully:

- ✅ Set up Zerops services for your Astro project
- ✅ Deployed a persistent database using `libsql-server`
- ✅ Pushed the database schema and seeded it with data
- ✅ Deployed an Astro frontend to serve your application

Don’t forget to disconnect from the VPN when you’re done:

```sh
zcli vpn down
```

Happy coding! 🚀
