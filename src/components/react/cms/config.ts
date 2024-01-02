import { localeSettings, locales } from "@i18n/config";
import type { Config, Field, UnknownField } from "@staticcms/core";

export function getCmsConfig(): Config {
    if (import.meta.env.MODE === "development") {
        console.warn("[getCmsConfig] CMS running in development mode!");
    }

    const OAuthProvider = "https://dh-dev-static-cms-gh-oauth-provider.glitch.me";
    console.log("[getCmsConfig] CMS config OAuthProvider: " + OAuthProvider);

    const siteUrl = import.meta.env.SITE;
    console.log("[getCmsConfig] CMS config SITE_URL: " + siteUrl);

    const localBackend = import.meta.env.MODE === "development" ? true : false;
    console.log("[getCmsConfig] CMS config local_backend: " + localBackend);

    const languageSelectorOptions = Object.values(localeSettings).map(({ label, locale }) => ({ label, value: locale }));
    console.log("[getCmsConfig] CMS config languageSelectorOptions:\n\n" + JSON.stringify(languageSelectorOptions, null, 2));

    const tagTranslationsArray: Field<UnknownField>[] = Object.keys(localeSettings).map((key) => ({
        name: key,
        label: `${localeSettings[key].label} - tag translation`,
        widget: "string",
        i18n: false,
    }));
    console.log("[getCmsConfig] CMS config tagTranslationsArray fields:\n\n" + JSON.stringify(tagTranslationsArray, null, 2));

    const tagDisplayFields = Object.keys(localeSettings).flatMap((key) => [`languages.${localeSettings[key].locale}`]);
    console.log("[getCmsConfig] CMS config tagDisplayFields:\n\n" + JSON.stringify(tagDisplayFields, null, 2));

    return {
        local_backend: localBackend,
        backend: {
            name: "github",
            base_url: OAuthProvider,
            repo: "dallyh/daliborhon.dev",
            branch: "blog-test",
            commit_messages: {
                create: 'Create {{collection}} "{{slug}}"',
                update: 'Update {{collection}} "{{slug}}"',
                delete: 'Delete {{collection}} "{{slug}}"',
                uploadMedia: 'Upload "{{path}}"',
                deleteMedia: 'Delete "{{path}}"',
            },
        },
        media_folder: "public/assets/uploads/",
        public_folder: "/assets/uploads/",
        site_url: siteUrl,
        slug: {
            clean_accents: true,
        },
        i18n: {
            structure: "multiple_folders",
            locales: locales,
        },
        collections: [
            {
                name: "posts",
                label: "Posts",
                label_singular: "Post",
                folder: "src/content/posts",
                create: true,
                delete: true,
                i18n: true,
                slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
                sortable_fields: {
                    fields: ["title", "pubDateTime"],
                    default: {
                        field: "pubDateTime",
                    },
                },
                summary_fields: ["title", "pubDateTime", "draft"],
                view_filters: {
                    filters: [
                        {
                            name: "Drafts",
                            label: "Drafts",
                            field: "draft",
                            pattern: true,
                        },
                        {
                            name: "Not drafts",
                            label: "Not drafts",
                            field: "draft",
                            pattern: false,
                        },
                    ],
                },
                view_groups: {
                    groups: [
                        {
                            name: "Year",
                            label: "Year",
                            field: "pubDateTime",
                            pattern: "\\d{4}",
                        },
                        {
                            name: "Drafts",
                            label: "Drafts",
                            field: "draft",
                        },
                    ],
                },
                fields: [
                    {
                        name: "title",
                        label: "Title",
                        widget: "string",
                        i18n: true,
                    },
                    {
                        name: "postId",
                        label: "Post ID (UUID)",
                        widget: "uuid",
                        i18n: "duplicate",
                    },
                    {
                        name: "description",
                        label: "Description",
                        widget: "string",
                        i18n: true,
                    },
                    {
                        name: "author",
                        label: "Author",
                        widget: "string",
                        default: "Dalibor Hon",
                        i18n: "duplicate",
                    },
                    {
                        name: "tags",
                        label: "Tags",
                        widget: "relation",
                        i18n: true,
                        collection: "tags",
                        multiple: true,
                        value_field: "id",
                        search_fields: ["id"],
                        display_fields: tagDisplayFields,
                    },
                    {
                        name: "language",
                        label: "Language",
                        widget: "select",
                        i18n: true,
                        options: languageSelectorOptions,
                    },
                    {
                        name: "draft",
                        label: "Draft",
                        widget: "boolean",
                        default: true,
                        i18n: "duplicate",
                        required: false,
                    },
                    {
                        name: "featured",
                        label: "Featured",
                        widget: "boolean",
                        default: false,
                        i18n: "duplicate",
                        required: false,
                    },
                    {
                        name: "ogImage",
                        label: "OG Image",
                        widget: "image",
                        i18n: "duplicate",
                        choose_url: true,
                        required: false,
                    },
                    {
                        name: "pubDateTime",
                        label: "Publish Date",
                        widget: "datetime",
                        i18n: "duplicate",
                        date_format: true,
                        time_format: true,
                    },
                    {
                        name: "modDatetime",
                        label: "Modified Date",
                        widget: "datetime",
                        i18n: "duplicate",
                        required: false,
                        date_format: true,
                        time_format: true,
                        default: "",
                    },
                    {
                        name: "body",
                        label: "Body",
                        widget: "markdown",
                        show_raw: true,
                        i18n: true,
                    },
                ],
            },
            {
                name: "tags",
                label: "Tags",
                label_singular: "Tag",
                folder: "src/content/tags",
                identifier_field: "id",
                create: true,
                delete: true,
                i18n: false,
                slug: "{{id}}",
                extension: "json",
                fields: [
                    {
                        name: "id",
                        label: "Tag dentifier",
                        widget: "string",
                        i18n: "duplicate",
                    },
                    {
                        name: "languages",
                        label: "Translations",
                        widget: "object",
                        fields: tagTranslationsArray,
                    },
                ],
            },
        ],
    };
}
