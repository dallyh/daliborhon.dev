/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
declare module "@pagefind/default-ui";

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<Env>;

declare namespace App {
    interface Locals extends Runtime {}
}
