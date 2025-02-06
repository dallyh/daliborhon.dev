/// <reference types="vite/client" />
import type { Plugin } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nodeNormalizePath } from "../node-normalize-path.js";

// Get the current file location
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function viteI18Plugin(): Plugin {
	return {
		name: "astro-i18n-alias",
		resolveId(id) {
			if (id === "astro-i18n:messages") {
				const filePath = path.resolve(__dirname, "./paraglide/messages.js");

				// Normalize for cross-platform compatibility
				return nodeNormalizePath(filePath);
			}
		},
	};
}
