import path from "node:path";
import { nodeNormalizePath } from "../node-normalize-path.js";
import type { Plugin } from "vite";

const isServer = typeof process !== "undefined" && process.versions?.node;

const prefix = "virtual:i18n";
export const viteI18nPluginName = `${prefix}`;
export const viteI18nMessagesPluginName = `${prefix}:messages`;
export const viteI18nRuntimePluginName = `${prefix}:runtime`;
export const viteI18nRegistryPluginName = `${prefix}:registry`;

let viteI18nPluginPath: string;
let viteI18nMessagesPluginPath: string;
let viteI18nRuntimePluginPath: string;
let viteI18nRegistryPluginPath: string;

if (isServer) {
	import("node:url").then(({ fileURLToPath }) => {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		viteI18nPluginPath = nodeNormalizePath(path.resolve(__dirname, "./index.js"));
		viteI18nMessagesPluginPath = nodeNormalizePath(path.resolve(__dirname, "./paraglide/messages.js"));
		viteI18nRuntimePluginPath = nodeNormalizePath(path.resolve(__dirname, "./paraglide/runtime.js"));
		viteI18nRegistryPluginPath = nodeNormalizePath(path.resolve(__dirname, "./paraglide/registry.js"));
	});
} else {
	viteI18nPluginPath = viteI18nMessagesPluginName;
	viteI18nMessagesPluginPath = viteI18nMessagesPluginName;
	viteI18nRuntimePluginPath = viteI18nRuntimePluginName;
	viteI18nRegistryPluginPath = viteI18nRegistryPluginName;
}

export function createVitePlugins() {
	const vitePlugins = [viteI18nMessagesPlugin(), viteI18nRegistryPlugin(), viteI18nRuntimePlugin(), viteI18n()];

	return vitePlugins;
}

function viteI18n(): Plugin {
	return {
		name: "astro-i18n-alias",
		resolveId(id: string) {
			if (id === viteI18nPluginPath) {
				return viteI18nPluginPath;
			}
		},
	};
}

function viteI18nMessagesPlugin(): Plugin {
	return {
		name: "astro-i18n-messages-alias",
		resolveId(id: string) {
			if (id === viteI18nMessagesPluginName) {
				return viteI18nMessagesPluginPath;
			}
		},
	};
}

function viteI18nRuntimePlugin(): Plugin {
	return {
		name: "astro-i18n-runtime-alias",
		resolveId(id: string) {
			if (id === viteI18nRuntimePluginName) {
				return viteI18nRuntimePluginPath;
			}
		},
	};
}

function viteI18nRegistryPlugin(): Plugin {
	return {
		name: "astro-i18n-registry-alias",
		resolveId(id: string) {
			if (id === viteI18nRegistryPluginName) {
				return viteI18nRegistryPluginPath;
			}
		},
	};
}
