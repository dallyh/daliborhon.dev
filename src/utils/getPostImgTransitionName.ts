import type { CollectionEntry } from "astro:content";

export function getPostImgTransitionName(post: CollectionEntry<"posts">, transitionId: string | undefined = undefined) {
    const transitionName = `${post.id}-${transitionId ?? "none"}`;

    return transitionName;
}

//const transitionName = `${post.id}-${post.data.featured ?? "false"}`