import { defineConfig, defineField } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schema";
import { tags } from "sanity-plugin-tags";
import { codeInput } from "@sanity/code-input";
import { media } from "sanity-plugin-media";
import { IconManager } from "sanity-plugin-icon-manager";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { siteConfig } from "@daliborhon.dev/shared/frontend";
import { colorInput } from "@sanity/color-input";
import { categorySlug } from "./schema/fields/categorySlug";
import { defaultWorkspace } from "./workspaces/workspaces";
import { documentInternationalization, DeleteTranslationAction } from "@sanity/document-internationalization";

const languages = Object.values(siteConfig.i18n.locales).map((locale) => {
    return { id: locale.path, title: locale.title };
});

const DEV_ENV = process.env.NODE_ENV === "development" ? true : false;

export default defineConfig({
    name: defaultWorkspace.name,
    title: defaultWorkspace.title,
    projectId: defaultWorkspace.projectId,
    dataset: DEV_ENV ? defaultWorkspace.getDevDataset() : defaultWorkspace.getProdDataset(),
    plugins: [
        structureTool(),
        visionTool(),
        tags(),
        codeInput(),
        media(),
        IconManager({
            inlineSvg: true,
        }),
        colorInput(),
        internationalizedArray({
            languages: [...languages],
            defaultLanguages: [siteConfig.i18n.defaultLocale],
            buttonLocations: ["unstable__fieldAction", "document"],
            fieldTypes: ["string", "text", categorySlug],
        }),
        documentInternationalization({
            supportedLanguages: [...languages],
            schemaTypes: ["post"],
            metadataFields: [defineField({ name: "slug", type: "slug" })],
        }),
    ],
    schema: {
        types: schema,
    },
    document: {
        actions: (prev, { schemaType }) => {
            if (["post"].includes(schemaType)) {
                return [...prev, DeleteTranslationAction];
            }

            return prev;
        },
    },
});
