import { q, z } from "groqd";

export const colorSchema = q.object({
    _type: q.literal("color"),
    hex: q.string(),
    alpha: q.number(),
    hsl: q.object({
        _type: q.literal("hslaColor"),
        h: q.number(),
        s: q.number(),
        l: q.number(),
        a: q.number(),
    }),
    hsv: q.object({
        _type: q.literal("hsvaColor"),
        h: q.number(),
        s: q.number(),
        v: q.number(),
        a: q.number(),
    }),
    rgb: q.object({
        _type: q.literal("rgbaColor"),
        r: q.number(),
        g: q.number(),
        b: q.number(),
        a: q.number(),
    }),
});

export type Color = z.infer<typeof colorSchema>;
