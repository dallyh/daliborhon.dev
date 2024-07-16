import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "../slugifyStr";
import { getSlugWithoutLocale } from "./getSlugWithoutLocale";

export function getBlogPostSlug(locale: string, post: CollectionEntry<"posts">) {
	const regex = /^(\d{4})-(\d{2})-(\d{2})/;
	const filename = getSlugWithoutLocale(post.slug);
	const slug = slugifyStr(locale, post.data.title);

	const match = filename.match(regex);
	if (match) {
		const [, year, month, day] = match;
		const date = `${year}-${month}-${day}`;

		return `${date}-${slug}`;
	}

	// As a fallback we can use the published time
	const year = post.data.pubDate.getFullYear();
	const month = (post.data.pubDate.getMonth() + 1).toString().padStart(2, "0");
	const day = post.data.pubDate.getDate().toString().padStart(2, "0");
	const date = `${year}-${month}-${day}`;

	return `${date}-${slug}`;
}
