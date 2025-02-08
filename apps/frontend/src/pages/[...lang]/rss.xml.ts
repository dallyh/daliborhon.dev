import { render } from "astro:content";
import * as m from "@daliborhon.dev/integrations/i18n/messages";
import rss from "@astrojs/rss";
import { getBlogPostUrl, getFilteredPostsCollection } from "@utils/content";
import type { APIContext } from "astro";
import { experimental_AstroContainer } from "astro/container";

export { getStaticPaths } from "@daliborhon.dev/integrations/i18n";

export async function GET({ site, currentLocale }: APIContext) {
	const container = await experimental_AstroContainer.create();
	const allBlogArticles = await getFilteredPostsCollection({ locale: currentLocale, sort: true });

	if (allBlogArticles === undefined) {
		return new Response(null, { status: 500 });
	}

	const items = await Promise.all(
		allBlogArticles.map(async (post) => {
			const { Content } = await render(post);
			const { title, pubDate, description } = post.data;

			return {
				title: title,
				pubDate: pubDate,
				description: description,
				link: getBlogPostUrl(currentLocale!, post),
				content: await container.renderToString(Content),
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
