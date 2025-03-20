import fs from "node:fs";
import path from "node:path";
import type { CollectionEntry } from "astro:content";
import type { Locale } from "@paraglide/runtime";
import satori, { type SatoriOptions } from "satori";
import sharp from "sharp";
import postOgImage from "./templates/post";
import siteOgImage from "./templates/site";

const getFonts = async () => {
	const fontsFolder = "./src/assets/fonts";
	const root = process.cwd();
	const fontsPath = path.join(root, fontsFolder);

	const fontFileRegular = fs.readFileSync(path.join(fontsPath, "Nunito-Regular.ttf"));
	const fontFileBold = fs.readFileSync(path.join(fontsPath, "Nunito-Bold.ttf"));

	return { fontFileRegular, fontFileBold };
};

const { fontFileRegular, fontFileBold } = await getFonts();

const options: SatoriOptions = {
	width: 1200,
	height: 630,
	embedFont: true,
	fonts: [
		{
			name: "Nunito",
			data: fontFileRegular,
			weight: 400,
			style: "normal",
		},
		{
			name: "Nunito",
			data: fontFileBold,
			weight: 600,
			style: "normal",
		},
	],
};

async function svgBufferToPngBuffer(svg: string) {
	const buffer = await sharp(Buffer.from(svg, "utf-8")).png({ quality: 45 }).toBuffer();
	return buffer;
}

export async function generateOgImageForPost(post: CollectionEntry<"posts">, locale: string) {
	const svg = await satori(await postOgImage(post, locale as Locale), options);
	return await svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
	const svg = await satori(siteOgImage(), options);
	return await svgBufferToPngBuffer(svg);
}
