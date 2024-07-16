import { removeTrailingSlash } from "@utils";
import { locales, type AllowedLocales } from "./i18n.config";
import { siteConfig } from "./site.config";

const localeSettings = siteConfig.i18n.locales;

/**
 * Builds a CMS config out of other configurations.
 * @returns a CMS config.
 */
export function createCmsConfig() {
	const siteUrl = removeTrailingSlash(`${import.meta.env.SITE}${import.meta.env.BASE_URL}`);
	const oAuthProviderBase =`${siteUrl}/cms`;
	const authEndpoint = "auth";
	const branch = import.meta.env.DEV ? "dev" : "main";

	if (import.meta.env.DEV) {
		console.warn("[getCmsConfig] CMS running in development mode!");
		console.log("[getCmsConfig] CMS config OAuth Endpoint: " + `${siteUrl}/cms/${authEndpoint}`);
		console.log("[getCmsConfig] CMS config siteUrl: " + siteUrl);
		console.log("[getCmsConfig] CMS config branch: " + branch);		
	}

	const tagTranslationsArray = Object.keys(localeSettings).map((key) => {
        const locale = key as AllowedLocales;
        return  {
            name: key,
            label: localeSettings[locale].title,
            widget: "string",
            i18n: false,
        }
    });

	const tagDisplayFields = locales.flatMap((locale) => [`languages.${locale}`]);

	const bodyField = {
		name: "body",
		label: "Body",
		widget: "markdown",
		show_raw: true,
		i18n: true,
		toolbar_buttons: {
			main: [
				"bold",
				"italic",
				"strikethrough",
				"code",
				"font",
				"unordered-list",
				"ordered-list",
				"decrease-indent",
				"increase-indent",
				"shortcode",
				{
					label: "Insert",
					groups: [
						{
							items: ["blockquote", "code-block"],
						},
						{
							items: ["insert-table"],
						},
						{
							items: ["image", "file-link"],
						},
					],
				},
			],
		},
	};

	const config = {
		load_config_file: false,
		backend: {
			name: "github",
			base_url: oAuthProviderBase,
			auth_endpoint: "auth",
			repo: "dallyh/daliborhon.dev",
			branch: branch,
			commit_messages: {
				create: 'Create {{collection}} "{{slug}}"',
				update: 'Update {{collection}} "{{slug}}"',
				delete: 'Delete {{collection}} "{{slug}}"',
				uploadMedia: 'Upload "{{path}}"',
				deleteMedia: 'Delete "{{path}}"',
			},
			automatic_deployments: false,
		},
		media_folder: "/public/assets/uploads/",
		public_folder: "/assets/uploads/",
		media_library: {
			max_file_size: 25000000,
		},
		site_url: siteUrl,
		slug: {
			clean_accents: true,
			encoding: "ascii",
		},
		i18n: {
			structure: "multiple_folders",
			locales: locales,
			default_locale: "en",
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
				slug: "{{year}}-{{month}}-{{day}}-{{title | localize}}",
				format: "yaml-frontmatter",
				sortable_fields: ["title", "featured", "hidden", "pubDate"],
				summary: "{{title}} ({{filename}})",
				view_groups: [
					{ label: "Hidden", field: "hidden" },
					{ label: "Featured", field: "featured" },
					{ label: "Published year", field: "pubDate", pattern: "\\d{4}" },
				],
				view_filters: [
					{ label: "Hidden posts", field: "hidden", pattern: true },
					{ label: "Visible posts", field: "hidden", pattern: false },
					{ label: "Featured", field: "featured", pattern: true },
				],
				fields: [
					{
						name: "title",
						label: "Title",
						widget: "string",
						i18n: true,
					},
					{
						name: "description",
						label: "Description",
						widget: "string",
						i18n: true,
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
						widget: "hidden",
						i18n: true,
						default: "{{locale}}",
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
						name: "image",
						label: "Post image",
						widget: "image",
						i18n: "duplicate",
						choose_url: true,
						required: false,
					},
					{
						name: "pubDate",
						label: "Publish Date",
						widget: "datetime",
						i18n: "duplicate",
						date_format: "yyyy-MM-dd",
						time_format: false,
					},
					{
						name: "modDate",
						label: "Modified Date",
						widget: "datetime",
						i18n: "duplicate",
						required: false,
						date_format: "yyyy-MM-dd",
						time_format: false,
						default: "",
					},
					bodyField,
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
				extension: "yaml",
				format: "yaml",
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
			{
				name: "projects",
				label: "Projects",
				label_singular: "Project",
				folder: "src/content/projects",
				create: true,
				delete: true,
				i18n: true,
				slug: "{{slug}}",
				format: "yaml-frontmatter",
				media_folder: "/public/assets/uploads/projects/",
				public_folder: "/assets/uploads/projects/",
				sortable_fields: ["title", "startDate", "active"],
				view_groups: [
					{ label: "Active", field: "active" },
					{ label: "Year", field: "startDate", pattern: "\\d{4}" },
				],
				fields: [
					{
						name: "title",
						label: "Title",
						widget: "string",
						i18n: true,
					},
					{
						name: "sourceUrl",
						label: "Link",
						widget: "string",
						type: "url",
						i18n: "duplicate",
					},
					{
						name: "tags",
						label: "Project tags",
						widget: "relation",
						i18n: true,
						collection: "projectTags",
						multiple: true,
						value_field: "id",
						search_fields: ["id"],
						display_fields: ["title"],
					},
					{
						name: "language",
						label: "Language",
						widget: "hidden",
						i18n: true,
						default: "{{locale}}",
					},
					{
						name: "image",
						label: "Image",
						widget: "image",
						i18n: "duplicate",
						choose_url: true,
					},
					{
						name: "startDate",
						label: "Project start date",
						widget: "datetime",
						i18n: "duplicate",
						date_format: "yyyy-MM-dd",
						time_format: false,
					},
					{
						name: "active",
						label: "Active",
						widget: "boolean",
						i18n: "duplicate",
						default: true,
					},
					bodyField,
				],
			},
			{
				name: "projectTags",
				label: "Project tags",
				label_singular: "Project tag",
				folder: "src/content/project-tags",
				identifier_field: "id",
				create: true,
				delete: true,
				i18n: false,
				slug: "{{id}}",
				extension: "yaml",
				format: "yaml",
				fields: [
					{
						name: "id",
						label: "Tag dentifier",
						widget: "string",
					},
					{
						name: "title",
						label: "Title",
						widget: "string",
					},
					{
						name: "bgColor",
						label: "Tag background color",
						widget: "color",
					},
				],
			},
		],
	};

	return config;
}
