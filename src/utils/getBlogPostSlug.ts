export function getBlogPostSlug(slug: string | undefined) {
    if (slug !== undefined) {
        return slug.split("/")[1];
    }

    throw Error(`${typeof getBlogPostSlug.name}: slug was undefined`);
}