---
title: Nasazení libsql-server s Astro na Zerops
description: Průvodce nasazením libsql-server s Astro a perzistentní databází na Zerops.
tags:
    - development
    - astro
    - zerops
locale: cs
draft: true
featured: true
image: ../../../assets/content/blog/deploying-libsql-server-with-astro-on-zerops.png
pubDate: 2025-02-12T21:17:21.957Z
modDate: null
fmContentType: blog
---

Nasazení perzistentní databáze pomocí [`libsql-server`](https://github.com/tursodatabase/libsql/blob/main/libsql-server/README.md) spolu s projektem [Astro](https://astro.build), který využívá [`@astrojs/db`](https://docs.astro.build/en/guides/astro-db/) na [Zerops](https://zerops.io), je překvapivě jednoduché.

Pro tento průvodce můžete buď použít svůj vlastní projekt Astro, nebo si naklonovat [ukázkové úložiště na GitHubu](https://github.com/dallyh/astro-libsql-zerops-example) a postupovat podle něj.

:::tip
**Zerops** je cloudová platforma zaměřená na vývojáře, která poskytuje snadno použitelnou a plně spravovanou infrastrukturu pro vaše projekty. Více se dozvíte na [zerops.io](https://zerops.io).
:::

:::note
Tento průvodce předpokládá, že jste již obeznámeni s [`@astrojs/db`](https://docs.astro.build/en/guides/astro-db/), Astro a Zerops. Pokud s těmito technologiemi nemáte zkušenosti, doporučuji se s nimi nejprve seznámit! Před začátkem se ujistěte, že máte nastavený projekt Astro s integrací Astro DB.
:::

## Nastavení prostředí Zerops

Pro spuštění funkčního projektu na Zerops budete potřebovat tři klíčové služby:

1. **Node.js službu** pro frontend Astro
2. **Object storage** pro perzistenci databáze
3. **Službu založenou na Ubuntu** pro spuštění `libsql-server`

V tomto tutoriálu použijeme [`zcli`](https://docs.zerops.io/references/cli), což je nástroj příkazového řádku pro vytváření Zerops projektů a všech potřebných služeb. Pokud jste `zcli` ještě nenainstalovali, nastavte jej podle [oficiální dokumentace](https://docs.zerops.io/references/cli).

### Vytvoření projektu Zerops a služeb

Projekt Zerops můžete vytvořit ručně nebo použít předem definovanou YAML konfiguraci. Pro zjednodušení použijeme soubor `zerops-project-import.yml` v kořenové složce našeho Astro projektu.

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

Tento YAML soubor definuje projekt a potřebné služby, což zajišťuje hladké nastavení. Podrobný popis formátu naleznete v [dokumentaci Zerops](https://docs.zerops.io/references/import).

Pro import projektu do Zerops spusťte následující příkaz v kořenovém adresáři Astro projektu.

```sh
zcli project project-import ./zerops-project-import.yml
```

Po spuštění by měl očekávaný výstup vypadat takto:

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

## Konfigurace a nasazení služeb

Dále musíme nakonfigurovat a nasadit služby `libsqld` a `frontend`. Služba `dbstorage` nevyžaduje žádné další nastavení, protože slouží pouze jako objektové úložiště.

### Nastavení služeb pomocí zerops.yml

Soubor `zerops.yml` určuje, jak mají být naše služby sestaveny a spuštěny. Tento soubor by měl být vytvořen v kořenovém adresáři projektu Astro. Specifikaci formátu najdete v [dokumentaci Zerops](https://docs.zerops.io/zerops-yml/specification).

Náš soubor obsahuje nastavení pro služby `libsqld` a `frontend` spolu s předdefinovanými proměnnými prostředí, příkazy pro sestavení a spuštění.

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

### Nasazení databázové služby

Databázová služba je nastavena tak, aby používala objektové úložiště `dbstorage` pro bezednou replikaci. V souboru `zerops.yml` můžete vidět, že některé proměnné prostředí začínají předponou `LIBSQL_BOTTOMLESS-*`. Tyto proměnné odkazují na automaticky generované proměnné prostředí objektového úložiště `dbstorage` přístupné uvnitř projektu Zerops.

`libsql-server` se do běhového prostředí instaluje vyvoláním instalačního programu `libsql-server`. Po dokončení instalace je démon `sqld` serveru přesunut do posledního adresáře, kde může být přímo spuštěn.

Chcete-li službu `libsqld` přesunout do systému Zerops, spusťte následující příkaz:

```sh
zcli push
```

Vyberte projekt `astro-libsql` a poté službu `libsqld`.

![zcli push - seznam projektů](../../../assets/content/blog/zcli-push-project.png)

![zcli push - seznam služeb](../../../assets/content/blog/zcli-push-libsqld.png)

Po dokončení služby push by se měl spustit démon serveru a měl by také automaticky vytvořit databázi a začít ji replikovat. Replikace je aktivní, protože je povolena bezedná replikace zadáním příznaku `--enable-bottomless-replication`. Velmi dobře to můžete vidět na ovládacím panelu Zerops v části `libsqld` service runtime logs.

### Posouvání schématu databáze

Po nasazení služby `libsqld` přesuňte schéma databáze pomocí příkazu `push` služby Astro DB.

K tomu se nejprve musíme připojit k [VPN](https://docs.zerops.io/references/vpn) poskytované společností Zerops, abychom mohli přistupovat ke vzdálenému databázovému serveru. K VPN se můžete připojit pomocí příkazu `zcli vpn up`.

```sh
zcli vpn up && npx astro db push --remote
```

:::note
Pro navázání připojení VPN je nutné mít nainstalovaný [Wireguard](https://www.wireguard.com/).
:::

#### Naplnění databáze

Pro naplnění databáze počátečními daty spusťte příkaz:

```sh
npx astro db execute ./db/seed.ts --remote
```

### Nasazení rozhraní

Chcete-li nasadit projekt Astro, spusťte následující příkaz:

```sh
zcli push
```

Vyberte projekt `astro-libsql` a poté službu `frontend`. Po nasazení by měl být web přístupný na adrese `http://frontend:4321/` (při současném připojení k síti VPN). Stav služby lze opět ověřit na panelu Zerops v části `frontend` service runtime logs.

Pokud používáte [příklad úložiště GitHub](https://github.com/dallyh/astro-libsql-zerops-example), pak po nasazení otevřete v prohlížeči stránku [http://frontend:4321](http://frontend:4321) a měli byste vidět komentáře z databáze!

![Stránka s daty](../../../assets/content/blog/zerops-astro-libsql-pg-data.png)

## Závěr

V tomto okamžiku jste úspěšně:

- ✅ nastavit služby Zerops pro váš projekt Astro.
- ✅ nasadili jste perzistentní databázi pomocí `libsql-server`
- ✅ Vytvořili jste schéma databáze a nasadili do něj data
- ✅ Nasadil frontend Astro, který bude sloužit vaší aplikaci

Nezapomeňte se po dokončení odpojit od sítě VPN:

```sh
zcli vpn down
```

Šťastné kódování! 🚀
