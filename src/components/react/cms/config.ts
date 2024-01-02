import type { Config } from "@staticcms/core";

export const config: Config = {
    local_backend: true,
    backend: {
        name: "git-gateway",
        site_domain: "https://daliborhon-dev.netlify.app",
        auth_endpoint: "/.netlify/identity/",
        //repo: "dallyh/daliborhon.dev",
        //site_domain: "fe45932a-7f17-4972-a91c-346bcf16134a", // Netlify Site ID sent do "site_id" URL query
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
    site_url: "https://daliborhon.dev", // TO-DO read this from config
    slug: {
        clean_accents: true,
    },
    i18n: {
        structure: "multiple_folders",
        locales: ["en", "cs"], // TO-DO read this from config
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
                    display_fields: ["languages.cs", "languages.en"], // TO-DO read this from config
                },
                {
                    name: "language",
                    label: "Language",
                    widget: "select",
                    i18n: true,
                    options: [
                        {
                            label: "Čeština", // TO-DO read this from config
                            value: "cs",
                        },
                        {
                            label: "English", // TO-DO read this from config
                            value: "en",
                        },
                    ],
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
                    fields: [
                        {
                            name: "cs", // TO-DO read this from config
                            label: "Czech tag translation",
                            widget: "string",
                            i18n: false,
                        },
                        {
                            name: "en", // TO-DO read this from config
                            label: "English tag translation",
                            widget: "string",
                            i18n: false,
                        },
                    ],
                },
            ],
        },
    ],
};
