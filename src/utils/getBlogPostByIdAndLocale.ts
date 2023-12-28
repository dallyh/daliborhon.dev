import { getCollection } from "astro:content";

export async function getBlogPostByIdAndLocale(locale: string, postId: string) {
    const post = await getCollection("posts", ({ data }) => {
        return data.postId === postId && data.language === locale;
    });

    if (post.length > 1) {
        throw Error("getBlogPostByIdAndLocale: there were multiple posts matching the post id: " + postId);
    }

    if (post.length > 1) {
        throw Error(`getBlogPostByIdAndLocale: there were multiple posts matching the post id: ${postId} and locale ${locale}`);
    }

    if (post.length === 0) {
        throw Error(`getBlogPostByIdAndLocale: there were no posts matching the post id: ${postId} and locale ${locale}`);
    }

    if (post === undefined) {
        throw Error("getPathFromUrl: post was undefined.");
    }

    return post[0];
}