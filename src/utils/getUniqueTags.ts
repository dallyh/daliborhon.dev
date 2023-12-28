import { getCollection } from "astro:content";

export async function getUniqueTags(locale: string) {
    const allPosts = await getCollection("posts", ({ data }) => {
        return data.language === locale;
    });

    const allTags = allPosts.map((post) => {
        return post.data.tags.flat();
    });

    return [...new Set(allTags.flat())];
}
