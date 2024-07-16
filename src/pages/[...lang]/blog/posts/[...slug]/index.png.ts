import { defaultLocale, locales } from "@i18n-config";
import { getRoutingLocale } from "@i18n/utils";
import { getBlogPostSlug, getFilteredPostsCollection } from "@utils/content";
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
	return new Response(await generateOgImageForPost(props.post, params.lang ?? defaultLocale), {
		headers: { "Content-Type": "image/png" },
	});
}
