import { viteI18nRuntimePluginName, viteI18nMessagesPluginName, viteI18nRegistryPluginName, viteI18nPluginName } from "./virtual.js";

export function getDtsContent() {
	const i18n = `
    declare module "${viteI18nPluginName}" {
	    export * from "@daliborhon.dev/integrations/astro-i18n";
    }
    `;

	const runtime = `
    declare module "${viteI18nRuntimePluginName}" {
	    export * from "@daliborhon.dev/integrations/astro-i18n/runtime";
    }
    `;

	const messages = `
    declare module "${viteI18nMessagesPluginName}" {
	    export * from "@daliborhon.dev/integrations/astro-i18n/messages";
    }
    `;

	const registry = `
    declare module "${viteI18nRegistryPluginName}" {
	    export * from "@daliborhon.dev/integrations/astro-i18n/registry";
    }
    `;

	return [i18n, runtime, messages, registry].join("\n");
}
