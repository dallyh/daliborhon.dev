import { defaultLocale } from "@daliborhon.dev/integrations/astro-i18n";
import { generateOgImageForSite } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "@daliborhon.dev/integrations/astro-i18n";

export async function GET({ params }: APIContext) {
	return new Response(await generateOgImageForSite(params.lang ?? defaultLocale), {
		headers: { "Content-Type": "image/png" },
	});
}
