import { q, z } from "groqd";

const codeBlockSchema = z.object({
    language: z.string(),
    _key: z.string(),
    code: z.string(),
    _type: z.literal("code"),
});

const imageBlockSchema = z.object({
    _key: z.string(),
    _type: z.literal("image"),
    asset: z.object({
        _ref: z.string(),
        _type: z.literal("reference"),
    }),
});

const iconSchema = z.object({
    icon: z.string(),
    _key: z.string(),
    _type: z.literal("icon.manager"),
    metadata: z.object({
        size: z.object({
            width: z.number(),
            height: z.number(),
        }),
        palette: z.boolean(),
        flip: z.string(),
        vFlip: z.boolean(),
        hFlip: z.boolean(),
        inlineSvg: z.string(),
        collectionName: z.string(),
        iconName: z.string(),
        downloadUrl: z.string().url(),
        url: z.string().url(),
        collectionId: z.string(),
        author: z.object({
            name: z.string(),
            url: z.string().url(),
        }),
        license: z.object({
            name: z.string(),
            url: z.string().url(),
        }),
        rotate: z.number(),
    }),
});

const contentBlockSchemaSingle = q
    .contentBlock({
        markDefs: q.object({ _type: q.literal("link"), href: q.string() }),
    })
    .or(codeBlockSchema)
    .or(iconSchema)
    .or(imageBlockSchema);

export const contentBlockSchema = q.array(contentBlockSchemaSingle).or(contentBlockSchemaSingle);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
