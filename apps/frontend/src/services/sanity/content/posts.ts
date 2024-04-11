import { sanityClient } from "sanity:client";
import {
    allPostsByCategoryQuery,
    allPostsByTagQuery,
    allUniqueTagsQuery,
    recentFeaturedPostsQuery,
    type AllPostsByCategoryQueryResult,
    type AllPostsByTagQueryResult,
    type AllPostsQueryResult,
    type AllUniqueTagsQueryResult,
    type RecentFeaturedPostsQueryResult,
    type RecentPostsQueryResult,
} from "@daliborhon.dev/studio/groq";
import { allPostsQuery, recentPostsQuery } from "@daliborhon.dev/studio/groq";
import { defaultLocale } from "@daliborhon.dev/shared/frontend/i18n";
import { siteConfig } from "@daliborhon.dev/shared/frontend";

interface GetAllPosts {
    locale: string;
}

// TODO: Pagination
export const getAllPosts = async ({ locale = defaultLocale }: GetAllPosts): Promise<AllPostsQueryResult> => {
    console.log(`Getting all posts...`);

    const result = await sanityClient.fetch<AllPostsQueryResult>(allPostsQuery, { language: locale });

    return result;
};

interface GetRecentPosts {
    locale: string;
    recentItems?: number;
}

export const getRecentPosts = async ({ locale = defaultLocale, recentItems = siteConfig.blog.recentPostsSize }: GetRecentPosts): Promise<RecentPostsQueryResult> => {
    console.log(`Getting recent ${recentItems} posts.`);

    const result = await sanityClient.fetch<RecentPostsQueryResult>(recentPostsQuery, { language: locale, recentItems });
    return result;
};

interface GetFeaturedPosts {
    locale: string;
    recentItems?: number;
}

export const getRecentFeaturedPosts = async ({ locale = defaultLocale, recentItems = siteConfig.blog.featuredPostsSize }: GetFeaturedPosts): Promise<RecentFeaturedPostsQueryResult> => {
    console.log(`Getting recent ${recentItems} featured posts.`);

    const result = await sanityClient.fetch<RecentFeaturedPostsQueryResult>(recentFeaturedPostsQuery, { language: locale, recentItems });
    return result;
};

interface GetPostsByCategory {
    locale: string;
    categoryId: string;
}

export const getPostsByCategory = async ({ locale = defaultLocale, categoryId }: GetPostsByCategory): Promise<AllPostsByCategoryQueryResult> => {
    console.log(`Getting category ${categoryId} posts.`);

    const result = await sanityClient.fetch<AllPostsByCategoryQueryResult>(allPostsByCategoryQuery, { language: locale, categoryId });
    return result;
};

interface GetPostsByTag {
    locale: string;
    tag: string;
}

export const getPostsByTag = async ({ locale = defaultLocale, tag }: GetPostsByTag): Promise<AllPostsByTagQueryResult> => {
    console.log(`Getting posts tagged with ${tag}.`);

    const result = await sanityClient.fetch<AllPostsByTagQueryResult>(allPostsByTagQuery, { language: locale, postTag: tag });
    return result;
};

export const getAllPostTags = async (): Promise<AllUniqueTagsQueryResult> => {
    console.log(`Getting all post tags..`);

    const result = await sanityClient.fetch<AllUniqueTagsQueryResult>(allUniqueTagsQuery);
    return result;
};
