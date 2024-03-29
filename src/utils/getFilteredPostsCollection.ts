import { getCollection, type CollectionEntry } from "astro:content";

interface FilteredPostsOptions {
    featured?: boolean;
    sort?: boolean;
    locale?: string;
    slice?: number;
    categoryId?: string | "none";
    tagId?: string;
}

export async function getFilteredPostsCollection(options: FilteredPostsOptions | undefined = undefined) {
    if (options === undefined) {
        return await getCollection("posts");
    }

    const { featured, sort, locale, slice, categoryId, tagId } = options;

    let posts = await getCollection("posts", ({ data }) => {
        return buildCondition(data, { featured, locale, categoryId, tagId });
    });

    if (posts === undefined) return undefined;

    if (sort) {
        posts = posts.sort((a, b) => new Date(b.data.pubDateTime).valueOf() - new Date(a.data.pubDateTime).valueOf());
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
    const { featured, locale, categoryId, tagId } = options;

    // Basic condition
    let condition: boolean

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

    if (categoryId) {
        if (categoryId === "none") {
            condition = condition && data.category === undefined
        } else {
            condition = condition && data.category?.id === categoryId;
        }
    }

    if (tagId) {
        condition = condition && data.tags.some((tag: CollectionEntry<"tags">) => tag.id === tagId);
    }

    return condition;
}
