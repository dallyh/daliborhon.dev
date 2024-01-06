import { localeSettings, locales } from "@config/i18n";
import type { Config, Field, UnknownField } from "@staticcms/core";

/**
 * Builds a CMS config out of other configurations.
 * @returns a CMS config.
 */
export function createCmsConfig(): Config {
    if (import.meta.env.DEV) {
        console.warn("[getCmsConfig] CMS running in development mode!");
    }

    // Locally run OAuth provider
    const OAuthProvider = import.meta.env.DEV ? "http://localhost:3010/api" : "https://static-cms-gh-oauth-provider.netlify.app/api";
    console.log("[getCmsConfig] CMS config OAuthProvider: " + OAuthProvider);

    const siteUrl = import.meta.env.DEV ? "http://localhost:4321/" : `${import.meta.env.SITE}${import.meta.env.BASE_URL}`;
    console.log("[getCmsConfig] CMS config SITE_URL: " + siteUrl);

    const localBackend = import.meta.env.DEV ? true : false;
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

    const tagDisplayFields = locales.flatMap((locale) => [`languages.${locale}`]);
    console.log("[getCmsConfig] CMS config tagDisplayFields:\n\n" + JSON.stringify(tagDisplayFields, null, 2));

    const sortedLocales = Object.keys(localeSettings).sort((a, b) => {
        const isACmsDefault = localeSettings[a].cmsDefault || false;
        const isBCmsDefault = localeSettings[b].cmsDefault || false;

        // Put the "cmsDefault" locale first in the result
        if (isACmsDefault && !isBCmsDefault) {
            return -1;
        } else if (!isACmsDefault && isBCmsDefault) {
            return 1;
        }

        // Sort based on other criteria if both are "cmsDefault" or not
        return 0;
    });

    console.log(`[getCmsConfig] CMS config locales:\n\n ${JSON.stringify(sortedLocales)}\n\n Default locale of: '${sortedLocales[0]}'`);

    const config: Config = {
        local_backend: localBackend,
        publish_mode: "editorial_workflow",
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
            // Default locale is sorted on the first position
            locales: sortedLocales,
            // This is currently broken, so we have to rely on the sorted locales.
            // I want "en" to be the default in the editor.
            //default_locale: cmsDefaultLocale,
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
                summary_fields: ["title", "pubDateTime", "hidden"],
                view_filters: {
                    filters: [
                        {
                            name: "hidden",
                            label: "Hidden posts",
                            field: "hidden",
                            pattern: true,
                        },
                        {
                            name: "visible",
                            label: "Visible posts",
                            field: "hidden",
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
                            name: "visibility",
                            label: "Visibility",
                            field: "hidden",
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
                        name: "hidden",
                        label: "Hide post on the website",
                        widget: "boolean",
                        default: false,
                        i18n: "duplicate",
                        required: false,
                    },
                    {
                        name: "featured",
                        label: "Featured",
                        widget: "boolean",
                        default: false,
                        i18n: true,
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

    return config;
}
