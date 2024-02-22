/** @type {import("prettier").Config} */
export default {
    printWidth: 210,
    tabWidth: 4,
    plugins: ["prettier-plugin-astro"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
};
