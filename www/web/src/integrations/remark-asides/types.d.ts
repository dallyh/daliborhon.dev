export type Translation = typeof import("./translations/cs.json");
export type Callout = keyof ReturnType<typeof import("./remark-asides").callouts>;

export type PluginOptions = {
	locales: string[];
	logger: import("astro").AstroIntegrationLogger;
};
