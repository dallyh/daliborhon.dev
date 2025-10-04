import { generateOgImageForSite } from "@utils/og";

export { getStaticPaths } from "@utils/i18n";

export async function GET() {
	return new Response(await generateOgImageForSite(), {
		headers: { "Content-Type": "image/png" },
	});
}
