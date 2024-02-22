import { defaultLocale } from "@config/i18n";
import { getStaticPaths } from "@i18n/utils";
import { generateOgImageForSite } from "@utils";
import type { APIContext } from "astro";

export { getStaticPaths };

export async function GET({ params }: APIContext) {
    return new Response(await generateOgImageForSite(params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
