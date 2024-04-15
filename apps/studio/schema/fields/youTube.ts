import { PlayIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const youtube = defineType({
	name: "youtube",
	type: "object",
	title: "YouTube Embed",
	icon: PlayIcon,
	fields: [
		defineField({
			name: "url",
			type: "url",
			title: "YouTube video URL",
		}),
	],
});
