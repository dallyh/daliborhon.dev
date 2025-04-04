import { generateOgImageForSite } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "@utils/i18n";

export async function GET({}: APIContext) {
	return new Response(await generateOgImageForSite(), {
		headers: { "Content-Type": "image/png" },
	});
}
