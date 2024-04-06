import { defaultLocale } from "@i18n/config";
import { generateOgImageForSite } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "@i18n/utils";

export async function GET({ params }: APIContext) {
    return new Response(await generateOgImageForSite(params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
