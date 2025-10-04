import { getCollection, type InferEntrySchema } from "astro:content";
import { PREVIEW } from "astro:env/client";

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

interface BuildConditionOptions {
	featured?: boolean;
	locale?: string;
	categoryId?: string;
	tagId?: string;
}

function buildCondition(data: InferEntrySchema<"posts">, options: BuildConditionOptions = {}) {
	const { featured, locale, tagId } = options;

	// Basic condition
	let condition: boolean;

	// In PREVIEW mode, show all posts
	if (PREVIEW) {
		condition = true;
	} else {
		condition = !data.draft;
	}

	if (locale) {
		condition = condition && data.locale === locale;
	}

	if (featured) {
		condition = condition && (data.featured ?? false);
	}

	if (tagId) {
		condition = condition && data.tags.some((tag) => tag.id === tagId);
	}

	return condition;
}
