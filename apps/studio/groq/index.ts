import type {
    AllPostsQueryResult,
    AllProjectsQueryResult,
    RecentPostsQueryResult,
    AllPostsByTagQueryResult,
    AllFeaturedPostsQueryResult,
    AllPostsByCategoryQueryResult,
    AllCategoriesQueryResult,
    PostQueryResult,
    CategoryQueryResult,
    ProjectQueryResult,
    RecentFeaturedPostsQueryResult,
    Color,
    BlockContent,
} from "./schema/studio.schema";

type Unpacked<T> = T extends (infer U)[] ? U : T;

export type Post = PostQueryResult;
export type Project = ProjectQueryResult;
export type Category = CategoryQueryResult;
export type ProjectTag = {
    title: string;
    color: Color;
};
export type Tags = string[];
export type Tag = string;
export type AllUniqueTagsQueryResult = {
    tags: Tags;
};

export type {
    AllPostsQueryResult,
    AllProjectsQueryResult,
    RecentPostsQueryResult,
    AllPostsByTagQueryResult,
    AllFeaturedPostsQueryResult,
    AllPostsByCategoryQueryResult,
    AllCategoriesQueryResult,
    RecentFeaturedPostsQueryResult,
    Color,
    BlockContent
};

export const CURRENT_API_VERSION = "2024-04-10";
export * from "./queries";
