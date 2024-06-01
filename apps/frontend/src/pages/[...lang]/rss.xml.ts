import * as m from "$messages";
import rss from "@astrojs/rss";
import { allPostsQuery } from "@services/sanity/queries/posts";
import { runQuery } from "@services/sanity/runQuery";
import { getBlogPostUrl } from "@utils";
import type { APIContext } from "astro";
import { experimental_AstroContainer } from "astro/container";
import PortableText from "@components/astro/global/PortableText/PortableText.astro";

export { getStaticPaths } from "@i18n/utils";

export async function GET({ site, currentLocale }: APIContext) {
	const allBlogArticles = await runQuery(allPostsQuery, { language: currentLocale });

	const items = await Promise.all(
		allBlogArticles.map(async (post) => {
			const container = await experimental_AstroContainer.create();
			const content = await container.renderToString(PortableText, {
				props: {
					value: post.body,
					headings: post.headings,
				},
			});

			return {
				title: post.title,
				pubDate: post.publishedAt,
				description: post.headline,
				link: getBlogPostUrl(currentLocale!, post),
				content: content,
			};
		}),
	);

	return rss({
		stylesheet: `/rss/style-${currentLocale}.xsl`,
		title: m.blog__blog_site_title(),
		description: m.blog__blog_site_description(),
		site: site!,
		customData: `<language>${currentLocale}</language>`,
		items: items,
	});
}
