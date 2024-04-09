import { defineField, defineType } from "sanity";
import { siteConfig } from "shared/frontend";

export default defineType({
    name: "projectTag",
    title: "Project tag",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "internationalizedArrayString",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "color",
            title: "Background color",
            type: "color",
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
        prepare({ title }) {
            return {
                title: title.find((title: any) => {
                    return title._key == siteConfig.i18n.defaultLocale
                }).value
            };
        },
    },
});
