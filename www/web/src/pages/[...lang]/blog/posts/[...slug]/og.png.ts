import { locales } from "@paraglide/runtime";
import { getBlogPostSlug, getFilteredPostsCollection } from "@utils/content";
import { getRoutingLocale } from "@utils/i18n";
import { generateOgImageForPost } from "@utils/og";
import type { APIContext } from "astro";

export async function getStaticPaths() {
	const paths = await Promise.all(
		locales.map(async (locale) => {
			const posts = (await getFilteredPostsCollection({ sort: true, locale: locale })) ?? [];

			if (posts.length === 0) {
				return [];
			}

			return posts.map((post) => ({
				params: {
					lang: getRoutingLocale(locale),
					slug: getBlogPostSlug(locale, post),
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
	if (!params.lang) {
		return new Response(null, { status: 404 });
	}
	return new Response(await generateOgImageForPost(props.post, params.lang), {
		headers: { "Content-Type": "image/png" },
	});
}
