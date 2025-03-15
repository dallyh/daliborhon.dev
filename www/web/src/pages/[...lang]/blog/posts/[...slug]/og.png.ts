import { generateOgImageForPost } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "./index.astro";

export async function GET({ params, props }: APIContext) {
	if (!params.lang) {
		return new Response(null, { status: 404 });
	}
	return new Response(await generateOgImageForPost(props.post, params.lang), {
		headers: { "Content-Type": "image/png" },
	});
}
