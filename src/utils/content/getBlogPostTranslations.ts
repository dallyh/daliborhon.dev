import { type CollectionEntry, getCollection } from "astro:content";

export async function getBlogPostTranslations(post: CollectionEntry<"posts">) {
	const translationKey = post.data.translationKey;

	const posts = await getCollection("posts", ({ data }) => {
		return data.translationKey === translationKey;
	})

	if (!posts || posts.length === 0) {
		throw Error(`getBlogPostTranslations: there were no translated posts matching the translationKey: ${translationKey}.`);
	}

	return posts;
}
