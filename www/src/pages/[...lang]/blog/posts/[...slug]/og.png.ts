import type { CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/og";
import type { APIContext } from "astro";

export { getStaticPaths } from "./index.astro";

export async function GET({ params, props }: APIContext) {
	if (!params.lang) {
		return new Response(null, { status: 404 });
	}

	const post = props.post as CollectionEntry<"posts">;
	return new Response(await generateOgImageForPost(post, params.lang), {
		headers: { "Content-Type": "image/png" },
	});
}
