import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { defineField, defineType } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";
import { internationalizedArrayIsRequired } from "../../lib/internationalizedArrayStringIsRequired";
import { ProjectsIcon } from "@sanity/icons";
import tagField from "../fields/tagField";

export default defineType({
	name: "project",
	title: "Project",
	type: "document",
	icon: ProjectsIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "internationalizedArrayString",
			validation: (rule) => internationalizedArrayIsRequired(rule),
		}),
		defineField({
			name: "projectSourceUrl",
			title: "Source code URL",
			type: "url",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "internationalizedArrayText",
			validation: (rule) => internationalizedArrayIsRequired(rule),
		}),
		tagField,
		defineField({
			name: "projectStartDate",
			title: "Project start date",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			type: "icon.manager",
			name: "icon",
			title: "Icon",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			description: "description",
			icon: "icon",
		},
		prepare({ icon, title }) {
			return {
				media: mediaPreview(icon),
				title: title.find((title: any) => {
					return title._key == siteConfig.i18n.defaultLocale;
				}).value,
			};
		},
	},
});
