import type { CollectionEntry } from "astro:content";
import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import { removeTrailingSlash, slugifyStr } from "@utils";
import type { AllowedLocales } from "@i18n-config";
import { getCollection, getEntry } from "astro:content";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import calculateReadingTime from "reading-time";

// https://jahir.dev/blog/astro-reading-time
export const getReadingTime = (text: string): string | undefined => {
	if (!text || !text.length) return undefined;
	try {
		const { minutes } = calculateReadingTime(toString(fromMarkdown(text)));
		if (minutes && minutes > 0) {
			return `${Math.ceil(minutes)}`;
		}
		return undefined;
	} catch {
		return undefined;
	}
};

export function getOgImageUrl(locale: AllowedLocales, post: CollectionEntry<"posts">, url: URL) {
	// For automatically generated images
	// In dev mode, the trailing slash has to be present when it is set in the config
	if (import.meta.env.DEV) {
		return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`);
	}

	return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}

export function getBlogPostUrl(locale: AllowedLocales, post: CollectionEntry<"posts">) {
	return getRelativeLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}

export async function getBlogPostTranslations(post: CollectionEntry<"posts">) {
	const translationKey = post.data.translationKey;

	const posts = await getCollection("posts", ({ data }) => {
		return data.translationKey === translationKey;
	});

	if (!posts || posts.length === 0) {
		throw Error(`getBlogPostTranslations: there were no translated posts matching the translationKey: ${translationKey}.`);
	}

	return posts;
}

export function getBlogPostSlug(locale: AllowedLocales, post: CollectionEntry<"posts">) {
	const regex = /^(\d{4})-(\d{2})-(\d{2})/;
	const filename = getSlugWithoutLocale(post.id);
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

export function getAbsoluteBlogPostUrl(locale: AllowedLocales, post: CollectionEntry<"posts">) {
	return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}

export function getBlogPostDate(locale: string, pubDate: string | Date, modDate: string | Date | undefined) {
	const myDatetime = wasPostUpdated(pubDate, modDate) ? new Date(modDate!) : new Date(pubDate);

	const date = myDatetime.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	/*
	const time = myDatetime.toLocaleTimeString(locale, {
		hour: "2-digit",
		minute: "2-digit",
	});
	*/

	return {
		iso: myDatetime.toISOString(),
		date: date,
		//time: time,
	};
}

export function wasPostUpdated(pubDate: string | Date, modDate: string | Date | undefined) {
	if (modDate && pubDate) {
		const updated = !(new Date(pubDate).getTime() === new Date(modDate).getTime());
		return updated;
	}

	return false;
}

export function getBlogPostImageUrl(locale: AllowedLocales, post: CollectionEntry<"posts">, url: URL) {
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

export async function getPostsByTag(locale: string, tagId: string) {
	const posts = await getCollection("posts", ({ data }) => {
		return data.tags.some((t) => t.id === tagId) && data.language === locale;
	});

	if (posts === undefined || posts.length === 0) {
		console.warn(`getPostsByTag posts was empty.`);
	}

	return posts;
}

export async function getProjectsByLocale(locale: string, sort: boolean = true, max: number | undefined = undefined) {
	let projects = await getCollection("projects", ({ data }) => {
		return data.language === locale;
	});

	if (sort) {
		projects = projects.sort((a, b) => new Date(b.data.startDate).valueOf() - new Date(a.data.startDate).valueOf());
	}

	if (max) {
		projects = projects.slice(0, max);
	}

	return projects;
}

export function getSlugWithoutLocale(slug: string) {
	// cs/2024-xxx-slug

	if (slug.indexOf("/") > 0) {
		return slug.split("/")[1];
	}

	throw new Error(`Incorrect slug ${slug}`);
}

export async function getTagById(tagId: string | undefined) {
	if (tagId === undefined) {
		return undefined;
	}

	const tag = await getEntry("tags", tagId);

	if (tag === undefined) {
		console.warn(`getTagById: tag ${tagId} was undefined.`);
	}

	return tag;
}
