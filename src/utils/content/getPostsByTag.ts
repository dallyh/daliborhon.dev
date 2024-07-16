import { getCollection } from "astro:content";

export async function getPostsByTag(locale: string, tagId: string) {
	const posts = await getCollection("posts", ({ data }) => {
		return data.tags.some((t) => t.id === tagId) && data.language === locale;
	});

	return posts;
}
