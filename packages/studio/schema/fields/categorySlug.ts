import { SanityDocument, SlugSourceContext, defineField } from "sanity";

export const categorySlug = defineField({
    name: "categorySlug",
    title: "Slug",
    type: "slug",
    validation: (Rule) => Rule.required(),
    options: {
        source: (doc: SanityDocument, context: SlugSourceContext) => {
            if (!doc.title) {
                return "";
            }
            const lang = (context.parent as any)._key;
            const titles = doc.title as any;
            const title = titles.find((title: any) => {
                return title._key === lang;
            });

            if (title) {
                return title.value;
            }

            return "";
        },
    },
});
