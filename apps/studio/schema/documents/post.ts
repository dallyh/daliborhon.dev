import { type SanityDocument, type SlugSourceContext, defineField, defineType } from "sanity";
import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";
import { DocumentTextIcon } from "@sanity/icons";
import tagField from "../fields/tagField";

export default defineType({
	name: "post",
	title: "Post",
	type: "document",
	icon: DocumentTextIcon,
	fields: [
		defineField({
			// should match 'languageField' plugin configuration setting, if customized
			name: "language",
			type: "string",
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: (Rule) => Rule.required(),
			options: {
				source: (doc: SanityDocument, context: SlugSourceContext) => {
					if (doc.publishedAt) {
						const publishedAt = new Date(doc.publishedAt as unknown as string);
						const year = publishedAt.getFullYear();
						const month = (publishedAt.getMonth() + 1).toString().padStart(2, "0");
						const day = publishedAt.getDate().toString().padStart(2, "0");
						return `${year}-${month}-${day}-${doc.title}`;
					}

					return doc.title as string;
				},
				maxLength: 256,
				isUnique: isUniqueAcrossAllDocuments,
			},
		}),
		defineField({
			name: "headline",
			title: "Headline",
			type: "text",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
				metadata: ["blurhash", "lqip", "palette"],
			},
		}),
		defineField({
			name: "publishedAt",
			title: "Published at",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "updatedAt",
			title: "Updated at",
			type: "datetime",
		}),
		defineField({
			name: "featured",
			title: "Featured",
			type: "boolean",
			initialValue: false,
		}),
		tagField,
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			validation: (Rule) => Rule.required(),
			of: [
				{
					type: "reference",
					to: {
						type: "category",
					},
				},
			],
		}),
		defineField({
			name: "body",
			title: "Body",
			validation: (Rule) => Rule.required(),
			type: "blockContent",
		}),
	],
	preview: {
		select: {
			title: "title",
			headline: "headline",
			media: "mainImage",
		},
	},
});
