/** @type {import("prettier").Config} */
export default {
    printWidth: 210,
    tabWidth: 4,
    plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
