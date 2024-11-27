/** @type {import("prettier").Config} */
export default {
    printWidth: 210,
    tabWidth: 4,
    plugins: ["prettier-plugin-astro"],
    useTabs: true,
    singleQuote: false,
    semi: true,
    overrides: [
        {
            files: [".*", "*.json", "*.md", "*.toml", "*.yml"],
            options: {
                useTabs: false,
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
