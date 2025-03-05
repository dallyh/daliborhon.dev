import { baseLocale } from "@paraglide/runtime";
import { generateOgImageForSite } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "@utils/i18n";

export async function GET({ params }: APIContext) {
	return new Response(await generateOgImageForSite(params.lang ?? baseLocale), {
		headers: { "Content-Type": "image/png" },
	});
}
