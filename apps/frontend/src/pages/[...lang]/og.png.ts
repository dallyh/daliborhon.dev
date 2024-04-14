import { defaultLocale } from "@daliborhon.dev/shared/frontend/i18n";
import { generateOgImageForSite } from "@utils/og";
import type { APIContext } from "astro";

export const prerender = true;
export { getStaticPaths } from "@i18n/utils";

export async function GET({ params }: APIContext) {
    return new Response(await generateOgImageForSite(params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
