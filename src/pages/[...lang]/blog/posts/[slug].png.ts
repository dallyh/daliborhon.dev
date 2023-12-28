import type { APIContext } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForPost } from "@utils/generateOgImage";
import { defaultLocale } from "@i18n/consts";

export async function getStaticPaths() {
    const allPosts = await getCollection("posts");
    const paths = allPosts.map((post) => {
        return { params: { lang: post.data.language === defaultLocale ? undefined : post.data.language, slug: post.slug }, props: { post: post } };
    });

    return paths;
}

export async function GET({ params, props }: APIContext) {
    return new Response(await await generateOgImageForPost(props.post as CollectionEntry<"posts">, params.lang ?? defaultLocale), {
        headers: { "Content-Type": "image/png" },
    });
}
