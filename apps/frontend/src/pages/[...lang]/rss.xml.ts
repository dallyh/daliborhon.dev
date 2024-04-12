import * as m from "$messages";
import rss from "@astrojs/rss";
import { allPostsQuery } from "@services/sanity/queries/posts";
import { runQuery } from "@services/sanity/runQuery";
import { getBlogPostUrl } from "@utils";
import type { APIContext } from "astro";
import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe, type PortableTextHtmlComponents, type PortableTextComponentOptions, type PortableTextMarkComponentOptions } from "@portabletext/to-html";
import { sanityClient } from "sanity:client";
import imageUrlBuilder from "@sanity/image-url";
import { q } from "groqd";

export { getStaticPaths } from "@i18n/utils";

export async function GET({ site, currentLocale }: APIContext) {
    const html = htm.bind(vhtml);

    const components: Partial<PortableTextHtmlComponents> = {
        types: {
            image: ({ value }: PortableTextComponentOptions<any>) => {
                const builder = imageUrlBuilder(sanityClient);
                const image = builder.image(value).fit("max").auto("format");

                return html`<img src="${image.url()}" />`.toString();
            },
            code: ({ value }: PortableTextComponentOptions<any>) => html`<pre>${value.code}</pre>`.toString(),
            "icon.manager": ({ value }: PortableTextComponentOptions<any>) => html`${value.metadata.inlineSvg}`.toString(),
        },
        marks: {
            // This does not work somehow...
            link: ({ children, value }: PortableTextMarkComponentOptions<any>) => {
                const href = value.href || "";

                if (uriLooksSafe(href)) {
                    const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
                    return html`<a href="${href}" rel="${rel}">${children}</a>`.toString();
                }

                return children;
            },
        },
    };

    const allBlogArticles = await runQuery(allPostsQuery, { language: currentLocale });

    const items = allBlogArticles.map((post) => {
        const content = toHTML(post.body, { components: components });
        
        return {
            title: post.title,
            pubDate: post.publishedAt,
            description: post.headline,
            link: getBlogPostUrl(currentLocale!, post),
            content: content,
        };
    });

    return rss({
        stylesheet: `/rss/style-${currentLocale}.xsl`,
        title: m.blog__blog_site_title(),
        description: m.blog__blog_site_description(),
        site: site!,
        customData: `<language>${currentLocale}</language>`,
        items: items,
    });
}
