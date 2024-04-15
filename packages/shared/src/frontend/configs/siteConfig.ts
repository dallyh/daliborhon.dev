export const siteConfig = {
	blog: {
		pageSize: 6,
		recentPostsSize: 6,
		featuredPostsSize: 6,
		previewPostsSize: 6,
		codeBlockTheme: "material-theme-palenight",
	},
	projects: {
		recentProjectsSize: 3,
	},
	i18n: {
		locales: {
			cs: {
				path: "cs",
				codes: ["cs", "cs-CZ", "sk", "sk-SK"],
				title: "Čeština",
			},
			en: {
				path: "en",
				codes: ["en", "en-GB", "en-US", "en-CA"],
				title: "English",
			},
		},
		defaultLocale: "cs",
		localeCookie: {
			name: "redirected-locale",
			expDays: 60,
		},
	},
};
