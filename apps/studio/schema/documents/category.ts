import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { defineField, defineType } from "sanity";
import { internationalizedArrayIsRequired } from "../../lib/internationalizedArrayStringIsRequired";
import { CubeIcon } from "@sanity/icons";

export default defineType({
	name: "category",
	title: "Category",
	type: "document",
	icon: CubeIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "internationalizedArrayString",
			validation: (rule) => internationalizedArrayIsRequired(rule),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "internationalizedArrayCategorySlug",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "internationalizedArrayText",
			validation: (rule) => internationalizedArrayIsRequired(rule),
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: title.find((title: any) => {
					return title._key == siteConfig.i18n.defaultLocale;
				}).value,
			};
		},
	},
});
