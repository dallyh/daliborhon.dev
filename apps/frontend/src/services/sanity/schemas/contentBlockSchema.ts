import { q, z } from "groqd";

const codeBlock = q.object({
    language: q.string(),
    _key: q.string(),
    code: q.string(),
    _type: q.literal("code"),
    filename: q.string().optional(),
});

const imageBlock = q.object({
    _key: q.string(),
    _type: q.literal("image"),
    asset: q.object({
        _ref: q.string(),
        _type: q.literal("reference"),
    }),
});

const iconSchema = q.object({
    icon: q.string(),
    _key: q.string(),
    _type: q.literal("icon.manager"),
    metadata: q.object({
        size: q.object({
            width: q.number(),
            height: q.number(),
        }),
        color: q
            .object({
                rgba: q.object({
                    r: q.number(),
                    g: q.number(),
                    b: q.number(),
                    a: q.number(),
                }),
                hex: q.string(),
            })
            .optional(),
        palette: q.boolean(),
        flip: q.union([q.literal("horizontal"), q.literal("vertical"), q.literal("horizontal,vertical")]).or(q.string().optional()),
        rotate: q.union([q.literal(0), q.literal(1), q.literal(2), q.literal(3)]),
        vFlip: q.boolean(),
        hFlip: q.boolean(),
        inlineSvg: q.string().optional(),
        collectionName: q.string(),
        iconName: q.string(),
        downloadUrl: q.string().url(),
        url: q.string().url(),
        collectionId: q.string(),
        author: q.object({
            name: q.string(),
            url: q.string().url(),
        }),
        license: q.object({
            name: q.string(),
            url: q.string().url(),
        }),
    }),
});

const baseChildren = q.object({
    _key: q.string(),
    _type: q.string(),
    text: q.string(),
    marks: q.array(q.string()).optional(),
});

const linkMarkDef = q.object({ _type: q.literal("link"), href: q.string(), _key: q.string() });
const markDefSingle = linkMarkDef;
const markDefsSchema = q.union([q.array(markDefSingle), markDefSingle]);

const singleChildren = q.union([iconSchema, baseChildren]);
const childrenSchema = q.union([q.array(singleChildren), singleChildren]);

const contentBlock = q
    .contentBlock({
        markDefs: markDefsSchema,
    })
    .extend({ children: childrenSchema })
    .or(codeBlock)
    .or(iconSchema)
    .or(imageBlock);

export const contentBlockSchema = q.array(contentBlock).or(contentBlock);

export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type Icon = z.infer<typeof iconSchema>;
export type CodeBlock = z.infer<typeof codeBlock>;
