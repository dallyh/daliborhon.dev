import type { CollectionEntry } from "astro:content";
import { getOgImageUrl } from "./getOgImageUrl";

export function getBlogPostImageUrl(locale: string, post: CollectionEntry<"posts">, url: URL) {
    // Uploaded or external images
    if (typeof post.data.image === "string") {
        return post.data.image;
    }

    // Images with source and alt
    if (post.data.image?.src) {
        return post.data.image.src;
    }

    // if the post has no image, just return OG image
    return getOgImageUrl(locale, post, url);
}
