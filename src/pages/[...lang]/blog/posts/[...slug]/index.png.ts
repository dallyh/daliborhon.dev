import { defaultLocale } from "@config/i18n";
import { getRoutingLocale } from "@i18n/utils";
import { generateOgImageForPost, getBlogPostSlug, getFilteredPostsCollection } from "@utils";
import type { APIContext } from "astro";
import {type CollectionEntry } from "astro:content";

export async function getStaticPaths() {
    const allPosts = await getFilteredPostsCollection();

    const paths = allPosts?.map((post) => {
        return { params: { lang: getRoutingLocale(post.data.language), slug: getBlogPostSlug(post.data.language, post) }, props: { post: post } };
    });

    return paths;
}

export async function GET({ params, props }: APIContext) {
    return new Response(await generateOgImageForPost(props.post as CollectionEntry<"posts">, params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
