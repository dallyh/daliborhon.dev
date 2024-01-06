import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImage";
import { defaultLocale } from "@config/i18n";
import { getRoutingLocale } from "@i18n/utils";
import { getBlogPostSlug } from "@utils/getBlogPostSlug";

export async function getStaticPaths() {
    const allPosts = await getCollection("posts", ({ data }) => {
        return !data.hidden;
    });
    const paths = allPosts.map((post) => {
        return { params: { lang: getRoutingLocale(post.data.language), slug: getBlogPostSlug(post.data.language, post) }, props: { post: post } };
    });

    return paths;
}

export async function GET({ params, props }: APIContext) {
    return new Response(await generateOgImageForPost(props.post as CollectionEntry<"posts">, params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
