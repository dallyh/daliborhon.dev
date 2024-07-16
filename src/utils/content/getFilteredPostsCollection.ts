import { type CollectionEntry, getCollection } from "astro:content";

interface FilteredPostsOptions {
	featured?: boolean;
	sort?: boolean;
	locale?: string;
	slice?: number;
	tagId?: string;
}

export async function getFilteredPostsCollection(options: FilteredPostsOptions | undefined = undefined) {
	if (options === undefined) {
		return await getCollection("posts");
	}

	const { featured, sort, locale, slice, tagId } = options;

	let posts = await getCollection("posts", ({ data }) => {
		return buildCondition(data, { featured, locale, tagId });
	});

	if (posts === undefined) return undefined;

	if (sort) {
		posts = posts.sort((a, b) => new Date(b.data.pubDate).valueOf() - new Date(a.data.pubDate).valueOf());
	}

	if (slice) {
		posts = posts.slice(0, slice);
	}

	return posts;
}

export async function getAllVisiblePostsCollection() {
	return getCollection("posts", ({ data }) => {
		return buildCondition(data);
	});
}

interface BuildConditionOptions {
	featured?: boolean;
	locale?: string;
	categoryId?: string;
	tagId?: string;
}

function buildCondition(data: any, options: BuildConditionOptions = {}) {
	const { featured, locale, tagId } = options;

	// Basic condition
	let condition: boolean;

	// In DEV mode, show all posts
	if (import.meta.env.DEV) {
		condition = true;
	} else {
		condition = !data.hidden;
	}

	if (locale) {
		condition = condition && data.language === locale;
	}

	if (featured) {
		condition = condition && data.featured;
	}

	if (tagId) {
		condition = condition && data.tags.some((tag: CollectionEntry<"tags">) => tag.id === tagId);
	}

	return condition;
}
