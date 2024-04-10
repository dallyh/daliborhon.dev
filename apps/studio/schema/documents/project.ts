import { defineField, defineType } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";
import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { internationalizedArrayIsRequired } from "../validation/internationalizedArrayStringIsRequired";

export default defineType({
    name: "project",
    title: "Project",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "internationalizedArrayString",
            validation: (rule) => internationalizedArrayIsRequired(rule),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "internationalizedArrayText",
            validation: (rule) => internationalizedArrayIsRequired(rule),
        }),
        defineField({
            name: "projectTags",
            title: "Project tags",
            type: "array",
            validation: (Rule) => Rule.required(),
            of: [
                {
                    type: "reference",
                    to: {
                        type: "projectTag",
                    },
                },
            ],
        }),
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