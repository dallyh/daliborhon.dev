import { defaultLocale, locales } from "@daliborhon.dev/shared/frontend/i18n";
import { getRoutingLocale } from "@i18n/utils";
import { type Post, allPostsQuery } from "@services/sanity/queries/posts";
import { runQuery } from "@services/sanity/runQuery";
import { generateOgImageForPost } from "@utils/og";
import type { APIContext } from "astro";

export async function getStaticPaths() {
	const paths = await Promise.all(
		locales.map(async (locale) => {
			const posts = (await runQuery(allPostsQuery, { language: locale })) ?? [];

			if (posts === undefined) {
				return [];
			}

			return posts.map((post) => ({
				params: {
					lang: getRoutingLocale(locale),
					slug: post.slug,
				},
				props: {
					post: post,
				},
			}));
		}),
	);

	return paths.flat();
}

export async function GET({ params, props }: APIContext) {
	return new Response(await generateOgImageForPost(props.post as Post, params.lang ?? defaultLocale), {
		headers: { "Content-Type": "image/png" },
	});
}
