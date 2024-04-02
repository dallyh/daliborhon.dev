import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import * as m from "$messages";
import { getAllBlogArticlesByLocale } from "@services/content/getAllBlogArticlesByLocale";
import { getBlogPostUrl } from "@utils";
import { parseJSONToHTML } from "@caisy/rich-text-html-parser";
import { JSDOM } from "jsdom";

export { getStaticPaths } from "@i18n/utils";

export async function GET({ site, currentLocale }: APIContext) {
    const allBlogArticles = await getAllBlogArticlesByLocale({ locale: currentLocale! });

    const items = allBlogArticles.map((post) => {
        let content = parseJSONToHTML(post.text?.json);
        const connections = post.text?.connections;

        if (connections) {
            const dom = new JSDOM(content);
            const document = dom.window.document;

            connections.forEach((conn) => {
                if (conn?.__typename !== "Asset") {
                    return;
                }

                const link = document.querySelector<HTMLElement>(`[data-document-id="${conn?.id}"]`);

                if (!link) {
                    return;
                }

                const img = document.createElement("img");
                img.src = conn.src!;
                img.alt = conn.title!;
                img.title = conn.title!;

                link.replaceWith(img);
            });

            content = dom.serialize();
        }

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
