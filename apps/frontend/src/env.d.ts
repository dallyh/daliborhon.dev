/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />
declare module "@pagefind/default-ui";

type Unpacked<T> = T extends (infer U)[] ? U : T;

type Runtime = import("@astrojs/cloudflare").AdvancedRuntime<Env>;

declare namespace App {
    interface Locals extends Runtime {}
}
