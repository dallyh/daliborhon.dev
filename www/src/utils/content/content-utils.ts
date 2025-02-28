import type { CollectionEntry } from "astro:content";
import { getCollection, getEntry } from "astro:content";
import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import { Logger } from "@logger";
import type { Locale } from "@paraglide/runtime";
import { removeTrailingSlash } from "@utils";
import type { MarkdownHeading } from "astro";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";
import calculateReadingTime from "reading-time";
import { getFilteredPostsCollection } from "./get-filtered-posts-collection";

const logger = new Logger("content-utils");

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

export function getOgImageUrl(locale: Locale, post: CollectionEntry<"posts">) {
	// For automatically generated images
	// In dev mode, the trailing slash has to be present when it is set in the config
	if (import.meta.env.DEV) {
		return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}/og.png`);
	}

	return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}/og.png`));
}

export function getBlogPostUrl(locale: Locale, post: CollectionEntry<"posts">) {
	return getRelativeLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}

export async function getBlogPostTranslations(post: CollectionEntry<"posts">) {
	const slug = getSlugWithoutLocale(post.id);

	const posts = await getCollection("posts", ({ id }) => {
		const slugWithoutLocale = getSlugWithoutLocale(id);
		return slugWithoutLocale === slug;
	});

	if (!posts || posts.length === 0) {
		throw Error(`getBlogPostTranslations: there were no translated posts matching for slug ${slug}.`);
	}

	return posts;
}

export function getBlogPostSlug(locale: Locale, post: CollectionEntry<"posts">) {
	return getSlugWithoutLocale(post.id); // example cs/2024-01-01-title-already-slugified

	/*
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
	*/
}

export function getAbsoluteBlogPostUrl(locale: Locale, post: CollectionEntry<"posts">) {
	return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}

export function getBlogPostDate(locale: string, pubDate: string | Date, modDate: string | Date | null) {
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

export function wasPostUpdated(pubDate: string | Date, modDate: string | Date | null) {
	if (modDate === null || modDate === "") {
		return false;
	}

	if (modDate && pubDate) {
		const updated = new Date(modDate).getTime() > new Date(pubDate).getTime();
		return updated;
	}

	return false;
}

export function getBlogPostImageUrl(locale: Locale, post: CollectionEntry<"posts">): string | ImageMetadata {
	// Uploaded or external images
	if (typeof post.data.image === "string" && post.data.image !== "") {
		return post.data.image;
	}

	// Images with source and alt
	if (typeof post.data.image === "object" && post.data.image?.src) {
		return post.data.image;
	}

	// if the post has no image, just return OG image
	return getOgImageUrl(locale, post);
}

export async function getPostsByTag(locale: string, tagId: string) {
	const posts = await getFilteredPostsCollection({ locale: locale, tagId: tagId });

	if (posts === undefined || posts.length === 0) {
		logger.warn(`getPostsByTag ${tagId}: posts were empty.`);
	}

	return posts;
}

export async function getProjectsByLocale(locale: string, sort: boolean = true, max: number | undefined = undefined) {
	let projects = await getCollection("projects", ({ data }) => {
		return data.locale === locale;
	});

	if (sort) {
		projects = projects.sort((a, b) => new Date(b.data.startDate).valueOf() - new Date(a.data.startDate).valueOf());
	}

	if (max) {
		projects = projects.slice(0, max);
	}

	return projects;
}

export function getSlugWithoutLocale(postId: string) {
	if (postId.indexOf("/") > 0) {
		return postId.split("/")[1];
	}

	throw new Error(`Incorrect slug ${postId}`);
}

export async function getTagById(tagId: string | undefined) {
	if (tagId === undefined) {
		return undefined;
	}

	const tag = await getEntry("tags", tagId);

	if (tag === undefined) {
		logger.warn(`getTagById: tag ${tagId} was undefined.`);
	}

	return tag;
}

export function generateTOCHTML(headings: MarkdownHeading[]): string {
	if (!headings.length) return "";

	// Determine the base (minimum) depth
	const baseDepth = Math.min(...headings.map((h) => h.depth));
	let currentDepth = baseDepth;
	let html = "<ol>";

	const first = headings[0];
	html += `<li><a class="toc-link" href="#${first.slug}">${first.text}</a>`;

	for (let i = 1; i < headings.length; i++) {
		const heading = headings[i];
		const level = heading.depth;

		if (level > currentDepth) {
			// Open new nested lists until we reach the desired depth
			while (currentDepth < level) {
				html += "<ol><li>";
				currentDepth++;
			}
			html += `<a class="toc-link" href="#${heading.slug}">${heading.text}</a>`;
		} else if (level === currentDepth) {
			// Same level: close previous item and start a new one
			html += `</li><li><a class="toc-link" href="#${heading.slug}">${heading.text}</a>`;
		} else {
			// Higher-level heading (lower depth): close nested lists
			while (currentDepth > level) {
				html += "</li></ol>";
				currentDepth--;
			}
			// Close the previous item and add a new one at the proper level
			html += `</li><li><a class="toc-link" href="#${heading.slug}">${heading.text}</a>`;
		}
	}

	// Close any open tags. We need to close the last <li> then each opened <ol>.
	while (currentDepth-- >= baseDepth) {
		html += "</li></ol>";
	}

	return html;
}
