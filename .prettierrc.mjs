/** @type {import("prettier").Config} */
export default {
	printWidth: 210,
	tabWidth: 4,
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	useTabs: true,
	singleQuote: false,
	trailingComma: "all",
	semi: true,
	overrides: [
		{
			files: ["*.json", "*.jsonc", "*.md", "*.toml", "*.yml"],
			options: {
				useTabs: false,
			},
		},
		{
			files: ["*.json", "*.jsonc"],
			options: {
				trailingComma: "none",
			},
		},
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
	],
};
