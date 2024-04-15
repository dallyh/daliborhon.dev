import * as m from "$messages";
import type { AllowedLocales } from "@daliborhon.dev/shared/frontend/i18n";
import { slugifyStr } from "@utils";

export function createResumePdfFilename(locale: string, extension: boolean = false) {
	const filename = slugifyStr(locale, m.common__resume({}, { languageTag: locale as AllowedLocales })) + "-dalibor-hon";

	if (extension) {
		return filename + ".pdf";
	}

	return filename;
}
