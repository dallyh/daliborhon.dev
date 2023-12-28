import type { APIContext, APIRoute } from "astro";
import { generateOgImageForSite } from "@utils/generateOgImage";
import { getStaticPaths } from "@i18n/utils";
import { defaultLocale } from "@i18n/config";

export { getStaticPaths };

export async function GET({ params }: APIContext) {
    return new Response(await generateOgImageForSite(params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
