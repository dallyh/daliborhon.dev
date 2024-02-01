import type { CollectionEntry } from "astro:content";

export function getPostImgTransitionName(post: CollectionEntry<"posts">, transitionId: string | undefined = undefined) {
    const transitionName = `${post.data.title}-${transitionId ?? "none"}`;

    return transitionName;
}
