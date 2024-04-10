import { defaultLocale, locales } from "shared/frontend/i18n";
import { getRoutingLocale } from "@i18n/utils";
import { getAllBlogArticlesByLocale } from "@services/content/getAllBlogArticlesByLocale";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";
import { getBlogPostSlug } from "@utils";
import { generateOgImageForPost } from "@utils/og";
import type { APIContext } from "astro";

export async function getStaticPaths() {
    const paths = await Promise.all(
        locales.map(async (locale) => {
            const posts = (await getAllBlogArticlesByLocale({ locale })) ?? [];

            if (posts === undefined) {
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
    return new Response(await generateOgImageForPost(props.post as IGenBlogArticleMetaFragment, params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
