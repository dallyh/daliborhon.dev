import { render } from "astro:content";
import rss from "@astrojs/rss";
import { m } from "@paraglide/messages";
import type { Locale } from "@paraglide/runtime";
import { getBlogPostUrl, getFilteredPostsCollection } from "@utils/content";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import sanitize from "sanitize-html";

export { getStaticPaths } from "@utils/i18n";

export async function GET({ site, currentLocale }: APIContext) {
	const container = await AstroContainer.create();
	const allBlogArticles = await getFilteredPostsCollection({ locale: currentLocale, sort: true });

	if (allBlogArticles === undefined) {
		return new Response(null, { status: 500 });
	}

	const items = await Promise.all(
		allBlogArticles.map(async (post) => {
			const { Content } = await render(post);
			const { title, pubDate, description } = post.data;
			const html = await container.renderToString(Content);

			return {
				title: title,
				pubDate: pubDate,
				description: description,
				link: getBlogPostUrl(currentLocale as Locale, post),
				content: sanitize(html, {
					allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
				}),
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
