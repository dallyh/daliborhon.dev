import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { defineField, defineType } from "sanity";
import { mediaPreview } from "sanity-plugin-icon-manager";
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
        defineField({
            name: "projectTags",
            title: "Tags",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            type: "string",
                            name: "title",
                            title: "Title",
                            validation: (rule) =>
                                rule
                                    .custom((title: string) => {
                                        if (typeof title === "undefined") {
                                            return "Title is required.";
                                        }

                                        function initialIsCapital(word: string) {
                                            return word[0] !== word[0].toLowerCase();
                                        }

                                        if (title.length > 0 && !initialIsCapital(title)) {
                                            return "First letter must be uppercase.";
                                        }

                                        return true;
                                    })
                                    .error(),
                        },
                        {
                            name: "color",
                            title: "Background color",
                            type: "color",
                            validation: (Rule) => Rule.required(),
                        },
                    ],
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
