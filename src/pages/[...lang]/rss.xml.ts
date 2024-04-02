import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import * as m from "$messages";
import { getAllBlogArticlesByLocale } from "@services/content/getAllBlogArticlesByLocale";
import { getBlogPostUrl } from "@utils";
import { parseJSONToHTML } from "@caisy/rich-text-html-parser";

export { getStaticPaths } from "@i18n/utils";

function createImgTag(src: string, alt: string) {
    return `<img src="${src}" alt="${alt}">`;
}


export async function GET({ site, currentLocale }: APIContext) {
    const allBlogArticles = await getAllBlogArticlesByLocale({ locale: currentLocale! });

    const items = allBlogArticles.map((post) => {
        let content = parseJSONToHTML(post.text?.json);
        const img = createImgTag("https://assets.caisy.io/assets/1f552205-bf6f-43f0-8ed1-08f0d9fdccf4/d926400e-1020-406c-8d08-d7257a459f43/d8e6a398-f09e-41ae-a98d-61c179083b63/astro.jpg?original", "test");
        content = content + img;

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
