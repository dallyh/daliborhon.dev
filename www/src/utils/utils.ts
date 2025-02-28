import { m } from "@paraglide/messages";
import type { Locale } from "@paraglide/runtime";
import slug from "slug";

export function slugifyStr(locale: Locale | undefined, str: string) {
	if (locale === undefined) {
		return slug(str);
	}

	return slug(str, { locale: locale });
}

export function removeTrailingSlash(url: string) {
	return url.replace(/\/$/, "");
}

export function formatDateTime(date: Date, locale: string) {
	const formattedDate = date.toLocaleDateString(locale, {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return {
		iso: date.toISOString(),
		date: formattedDate,
	};
}

export function extractFileNameAndExtension(filePath: string) {
	// Using the lastIndexOf method to find the last occurrence of '/'
	const lastSlashIndex = filePath.lastIndexOf("/");

	// Using the substring method to extract the file name and extension
	const fileNameAndExtension = filePath.substring(lastSlashIndex + 1);

	// Using the lastIndexOf method to find the last occurrence of '.'
	const lastDotIndex = fileNameAndExtension.lastIndexOf(".");

	// Using the substring method to separate file name and extension
	const fileName = fileNameAndExtension.substring(0, lastDotIndex);
	const fileExtension = fileNameAndExtension.substring(lastDotIndex + 1);

	return {
		fileNameAndExtension: fileNameAndExtension,
		name: fileName,
		ext: fileExtension,
	};
}

export function createResumePdfFilename(locale: Locale, extension: boolean = false) {
	const filename = slugifyStr(locale, m.common__resume({}, { locale: locale })) + "-dalibor-hon";

	if (extension) {
		return filename + ".pdf";
	}

	return filename;
}
