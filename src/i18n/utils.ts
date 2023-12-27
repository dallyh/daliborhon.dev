import { getCollection, getDataEntryById, getEntry } from "astro:content";
import { locales, defaultLocale } from "./consts";
import { getRelativeLocaleUrl } from "astro:i18n";

export function getLocale(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (locales.includes(lang)) {
        return lang;
    }
    return defaultLocale;
}

export async function getPathFromUrl(url: URL, blogLocale?: string | undefined): Promise<string | undefined> {
    let pathname = url.pathname;
    let locale = defaultLocale;

    const parts = pathname?.split("/");
    const possibleLocale = parts[1];
    const slug = parts.pop() || parts.pop();

    // First check if we are on default locale
    if (locales.includes(possibleLocale)) {
        locale = possibleLocale;
        pathname = pathname.substring(3, pathname.length);
    }

    // Then translate URL path for blog posts
    if (pathname.includes("posts") && slug !== undefined) {
        if (blogLocale === undefined) {
            throw Error("getPathFromUrl: blog posts were found in path but there was no blogLocale parameter defined.");
        }

        const postId = await getBlogPostId(slug);

        if (postId === undefined) {
            throw Error("getPathFromUrl: postId was undefined.");
        }

        const postSlug = await getBlogPostByIdAndLocale(blogLocale, postId);
        pathname = pathname.replace(slug, postSlug.slug);
    }
    
    return pathname;
}

async function getBlogPostByIdAndLocale(locale: string, blogId: string) {
    const idWithoutLocale = blogId.split("/")[1];
    const blog = `${locale}/${idWithoutLocale}`;

    const post = await getCollection("posts", ({ id }) => {
        return id === blog;
    });

    if (post === undefined) {
        throw Error("getPathFromUrl: postId was undefined.");
    }

    return post[0];
}

export async function getRelativePathList(url: URL) {
    const paths = await Promise.all(
        locales.map(async (locale) => {
            const path = await getPathFromUrl(url, locale);
            const relativeUrl = getRelativeLocaleUrl(locale, path);

            return {
                relativeUrl: relativeUrl,
                locale: locale,
            };
        })
    );

    return paths;
}

async function getBlogPostId(slug: string | undefined): Promise<string | undefined> {
    if (slug === undefined) {
        return undefined;
    }

    const post = await getEntry({
        collection: "posts",
        slug: slug,
    });

    if (post !== undefined) {
        return post.id;
    }

    return undefined;
}

export function getBlogPostSlug(slug: string) {
    if (slug.includes("/")) {
        return slug.split("/")[1];
    }
    return slug;
}

// i18n routing
export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        if (locale == defaultLocale) {
            return { params: { lang: undefined } };
        } else {
            return { params: { lang: locale } };
        }
    });

    return paths;
}
