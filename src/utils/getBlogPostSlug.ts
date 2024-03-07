import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugifyStr";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";

export function getBlogPostSlug(locale: string, post: IGenBlogArticleMetaFragment) {

    //"{{year}}/{{month}}/{{day}}/{{slug}}"
    const year = post._meta?.createdAt!.getFullYear();
    const month = (new Date(post._meta?.createdAt!).getMonth() + 1).toString().padStart(2, "0");
    const day = new Date(post._meta?.createdAt!).getDate().toString().padStart(2, "0");

    const date = `${year}/${month}/${day}`;
    const slug = slugifyStr(locale, post?.title!);

    return `${date}/${slug}`;
}
