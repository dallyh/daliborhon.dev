---
title: Deploying libsql-server with Astro on Zerops
description: A guide on how to deploy libsql-server with Astro and a persistent database on Zerops.
tags:
    - development
    - astro
    - zerops
locale: en
draft: false
featured: true
image: ../../../assets/content/blog/deploying-libsql-server-with-astro-on-zerops.png
pubDate: 2025-02-25T22:26:40.947Z
modDate: null
fmContentType: blog
---

Deploying a persistent database using [libsql-server](https://github.com/tursodatabase/libsql/blob/main/libsql-server/README.md) alongside an [Astro](https://astro.build) project that leverages [@astrojs/db](https://docs.astro.build/en/guides/astro-db/) on [Zerops](https://zerops.io) is surprisingly straightforward. This article will show you how to proceed with the deployment.

**Prerequisites before you start reading:**
- Prior [Astro](https://astro.build) and [@astrojs/db](https://docs.astro.build/en/guides/astro-db/) knowledge
- A little bit of Zerops knowledge. You can learn more at [zerops.io](https://zerops.io).
- A command line utility called [zcli](https://docs.zerops.io/references/cli). If you haven’t installed `zcli` yet, set it up by following the [official documentation](https://docs.zerops.io/references/cli).
- Your own Astro project with a [@astrojs/node](https://docs.astro.build/en/guides/integrations-guide/node/) adapter

If you don't have your own Astro project yet, you can clone the [example GitHub repository](https://github.com/dallyh/astro-libsql-zerops-example) and follow along.

## Setting Up the Zerops Environment

To get a functional project running on Zerops, you’ll need three key services:

1. A **Node.js service** for the Astro frontend
2. An **object-storage service** to persist the database
3. An **Ubuntu-based service** to run `libsql-server`

### Creating a Zerops Project and Services

A [Zerops project](https://docs.zerops.io/features/infrastructure#project) is basically a container of interconnected services, which contains all of your manually defined services, as well as a project core service (managed by Zerops) which provides intercommunication between the project services, handles logs etc.

You can either create a Zerops project manually in the Zerops dashboard or use a predefined YAML configuration. To make things efficient and for the sake of simplicity, we’ll use a `zerops-project-import.yml` file in the root of our Astro project.

This YAML file defines the Zerops project and necessary services, ensuring a smooth setup. You can find a detailed breakdown of the format in the [Zerops documentation](https://docs.zerops.io/references/import).

```yaml
<!--zerops-project-import.yml-->
project:
    name: astro-libsql
    corePackage: LIGHT
services:
    # Ubuntu-based service
    - hostname: libsqld
      type: ubuntu@24.04
    # Node.js service
    - hostname: frontend
      type: nodejs@22
    # Object-storage service
    - hostname: dbstorage
      type: object-storage
      objectStorageSize: 2
```

To import the project to Zerops, run the following command in the root of the Astro project.

```sh
zcli project project-import ./zerops-project-import.yml
```

After running the command, the expected output should look like:

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

You can also verify successful creation of the project and all of the services in the Zerops dashboard. The `libsqld` and `frontend` services should be created as empty and waiting for deployment. The `dbstorage` should be ready for usage.

![Zerops dashboard](../../../assets/content/blog/zerops-deployed-astro-example-project.png)

## Configuring and Deploying Services

Next, we need to configure and deploy the `libsqld` and `frontend` services. The `dbstorage` service requires no additional setup since it’s just an object storage instance.

### Setting Up the Services with zerops.yml

The `zerops.yml` file dictates how our services should be built and run. This file should be created in the root of the Astro project. You can find a specification of the format in the [Zerops documentation](https://docs.zerops.io/zerops-yml/specification).

The file contains setups for the `libsqld` and `frontend` services along with predefined environment variables, build and runtime commands. If your Astro project requires different build commands and or files to be deployed, then you have to edit the `frontend` service section in the example file below.

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

The database service is set to use the `dbstorage` object storage for [bottomless](https://github.com/tursodatabase/libsql/tree/main/bottomless) replication. This ensures that the database is persisted accross service changes and redeploys. In the `zerops.yml` file you can see that some environment variables are beginning with a prefix `LIBSQL_BOTTOMLESS-*`. Those variables point to automatically generated `dbstorage` oject storage environment variables accessible inside a Zerops project.

The `libsql-server` is installed in the service runtime by invoking the `libsql-server` installer. After the installation is done, the `sqld` server daemon is moved the final directory, where it can be directly executed.

To push the `libsqld` service to Zerops, run:

```sh
zcli push
```

Select the `astro-libsql` project and then the `libsqld` service.

![zcli push - project list](../../../assets/content/blog/zcli-push-project.png)

![zcli push - service list](../../../assets/content/blog/zcli-push-libsqld.png)

After the service push is complete, the server daemon should start and it should also automatically create a database and start replicating it. The replication is active because bottomless replication is enabled by providing a `--enable-bottomless-replication` flag. You can verify this in the Zerops dashboard under `libsqld` service runtime logs.

### Pushing the Database Schema

After deployment of the `libsqld` service, we need to push the database schema using `@astrojs/db`'s `push` command. Because pushing database schemas in a build step of the service and or application is generally not recommended to do for various reasons, we should push the database schema from our local computer.

For this we first need to connect to the [VPN](https://docs.zerops.io/references/vpn) provided by Zerops, so we can access the remote database server. You can connect to the VPN using `zcli vpn up`. Run the command in the terminal and then select the `astro-libsql` project. If the connection fails, make sure that you have properly installed [Wireguard](https://www.wireguard.com/) which is required for the VPN connection to be estabilished.

:::caution
Before the push, make sure that the `ASTRO_DB_REMOTE_URL` is set in your Astro project. It should be set to the URL of the `libsqld` service, which in this case is `http://libsqld:8080`.
:::


After the VPN is connected, push the database schema to the remote database:

```sh
npx astro db push --remote
```

:::note
Most Astro projects already have the `astro` command defined in `package.json`. In the Astro DB's [documentation](https://docs.astro.build/en/guides/astro-db/#pushing-table-schemas) we are guided to run the `push` command using `npm` as follows: `npm run astro db push --remote`. This does not work properly in some cases, because `npm run` does not correctly pass the `--remote` flag. If you're not using `npx` to execute the push or any other DB commands, then you should run the command like this: `npm run astro db push --- --remote`.
:::

#### Seeding the Database

Sometimes it is needed to populate (seed) the database with initial data if you are starting with a fresh database. This can be done by executing the following command:

```sh
npx astro db execute ./db/seed.ts --remote
```

This will seed the database with initial required data by executing the `seed.ts` file, which should contain your predefined data.

If you already have a database with some data and you need to migrate it, you should be able to do it with tools such as [Beekeeper Studio](https://www.beekeeperstudio.io/features/import-export). The database is accessible to you while you are connected to the VPN. You can connect to it as you would to any other database.

### Deploying the Frontend

To deploy the Astro project, run:

```sh
zcli push
```

Select `astro-libsql`, then the `frontend` service. Once deployed, the site should be accessible at `http://frontend:4321` (assuming you're still connected to the VPN and your Astro project is using the default port). Again the status of the service can be verified in the Zerops dashboard under `frontend` service runtime logs.

Astro connects to the database via `ASTRO_DB_REMOTE_URL` environment variable, which in turn points to the `RUNTIME_ASTRO_DB_REMOTE_URL` environment variable. The `RUNTIME_` prefix means that the variable is taken from the `frontend` service runtime defined in the `zerops.yml` file.

```yaml
<!--zerops.yml-->
# ... other defined settings
- setup: frontend
# ... other defined settings
  run:
      envVariables:
         ASTRO_DB_REMOTE_URL: http://libsqld:8080 # Here
```

If you're using the [example GitHub repository](https://github.com/dallyh/astro-libsql-zerops-example), then after you push the service, open the page [http://frontend:4321](http://frontend:4321) in your browser, and you should see comments from the database!

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
