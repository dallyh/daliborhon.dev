module.exports = {
	plugins: [require("postcss-import"), require("tailwindcss/nesting"), require("autoprefixer"), require("postcss-preset-env")],
	"postcss-preset-env": {
		stage: 3,
		features: {
			"custom-properties": false,
		},
	},
};
