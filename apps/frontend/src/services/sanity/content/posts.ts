import { sanityClient } from "sanity:client";
import { type Post } from "@daliborhon.dev/studio/schema";
import { allPostsQuery } from "@daliborhon.dev/studio/groq";
import { defaultLocale } from "@daliborhon.dev/shared/frontend/i18n";

interface GetAllPosts {
    locale: string;
    lastId?: string;
    arr?: Post[];
}

export const getAllPostsByLocale = async ({ locale = defaultLocale, lastId, arr = [] }: GetAllPosts): Promise<Post[]> => {
    console.log(`Getting all posts. Last id: '${lastId}', current count: '${arr.length}'`);
    console.log(allPostsQuery);
    const allPosts: Post[] = await sanityClient.fetch(allPostsQuery, { language: locale, lastId: lastId ?? "" });

    if (allPosts.length === 0) {
        console.log("Last page was empty.");
        return arr;
    }

    allPosts.forEach((post) => {
        arr.push(post);
    });

    return await getAllPostsByLocale({
        locale: locale,
        lastId: allPosts[allPosts.length - 1]._id,
        arr,
    });
};
