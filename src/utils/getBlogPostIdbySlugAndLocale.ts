import { getCollection } from "astro:content";

export async function getBlogPostIdBySlugAndLocale(locale: string, searchSlug: string) {
    
    const post = await getCollection("posts", ({ data, slug }) => {
        if (slug.includes("/")) {
            return slug.split("/")[1] === searchSlug && data.language === locale;
        }
        
        return slug === `${locale}/${searchSlug}` && data.language === locale;
    });

    if (post.length > 1) {
        throw Error(`getPathFromUrl: there were multiple posts matching the slug: ${searchSlug} and locale ${locale}`);
    }

    if (post.length === 0) {
        throw Error(`getPathFromUrl: there were no posts matching the slug: ${searchSlug} and locale ${locale}`);
    }

    if (post === undefined) {
        throw Error("getPathFromUrl: post was undefined.");
    }

    return post[0];
}
