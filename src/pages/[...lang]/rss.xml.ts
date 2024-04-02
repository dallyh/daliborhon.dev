import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import * as m from "$messages";
import { getAllBlogArticlesByLocale } from "@services/content/getAllBlogArticlesByLocale";
import { getBlogPostUrl } from "@utils";
import { parseJSONToHTML } from "@caisy/rich-text-html-parser";

export { getStaticPaths } from "@i18n/utils";

export async function GET({ site, currentLocale }: APIContext) {
    const allBlogArticles = await getAllBlogArticlesByLocale({ locale: currentLocale! });

    const items = allBlogArticles.map((post) => {
        const content = parseJSONToHTML(post.text?.json);

        return {
            title: post.title!,
            pubDate: post._meta?.firstPublishedAt!,
            description: post.description!,
            link: getBlogPostUrl(currentLocale!, post),
            content: content,
        };
    });

    return rss({
        title: m.blog__blog_site_title(),
        description: m.blog__blog_site_description(),
        site: site!,
        customData: `<language>${currentLocale}</language>`,
        items: items,
    });
}
