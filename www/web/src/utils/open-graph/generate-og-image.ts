import type { CollectionEntry } from "astro:content";
import type { Locale } from "@paraglide/runtime";
import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./templates/post";
import siteOgImage from "./templates/site";
import path from "node:path";
import fs from "node:fs";

const getFonts = async () => {
	const fontsFolder = "./src/assets/fonts";
	const root = process.cwd();
	const fontsPath = path.join(root, fontsFolder);

	const fontFileRegular = fs.readFileSync(path.join(fontsPath, "IBMPlexMono-Regular.ttf"));
	const fontFileBold = fs.readFileSync(path.join(fontsPath, "IBMPlexMono-Medium.ttf"));

	return { fontFileRegular, fontFileBold };
};

const { fontFileRegular, fontFileBold } = await getFonts();

const options: SatoriOptions = {
	width: 1200,
	height: 630,
	embedFont: true,
	fonts: [
		{
			name: "IBM Plex Mono",
			data: fontFileRegular,
			weight: 400,
			style: "normal",
		},
		{
			name: "IBM Plex Mono",
			data: fontFileBold,
			weight: 600,
			style: "normal",
		},
	],
};

function svgBufferToPngBuffer(svg: string) {
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}

export async function generateOgImageForPost(post: CollectionEntry<"posts">, locale: string) {
	const svg = await satori(await postOgImage(post, locale as Locale), options);
	return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
	const svg = await satori(siteOgImage(), options);
	return svgBufferToPngBuffer(svg);
}
