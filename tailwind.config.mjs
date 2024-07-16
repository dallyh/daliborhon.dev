/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["selector", '[data-theme="dark"]'],
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						a: {
							color: "var(--a-color)",
							"text-decoration": "none",
							"&:hover": {
								"text-decoration-color": "inherit",
								"text-decoration": "underline",
							},
							"&:visited": {
								color: "var(--a-visited)",
							},
						},
					},
				},
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
