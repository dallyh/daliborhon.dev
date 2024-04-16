import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";
import { TagIcon } from "@sanity/icons";
import tagIconMediaPreview from "../../lib/tagIconMediaPreview";

export default defineType({
	name: "tag",
	title: "Tag",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			type: "string",
			name: "title",
			title: "Title",
			validation: (rule) =>
				rule
					.custom((value) => {
						if (!value) {
							return "Title is required.";
						}

						function initialIsCapital(word: string) {
							return word[0] !== word[0].toLowerCase();
						}

						if (value.length > 0 && !initialIsCapital(value)) {
							return "First letter must be uppercase.";
						}

						return true;
					})
					.error(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
			options: {
				source: "title",
				maxLength: 256,
				isUnique: isUniqueAcrossAllDocuments,
			},
		}),
		defineField({
			name: "color",
			title: "Background color",
			type: "color",
		}),
	],
	preview: {
		select: {
			title: "title",
			color: "color",
		},
		prepare({ title, color }) {
			return {
				title: title,
				media: tagIconMediaPreview({ color }),
			};
		},
	},
});
