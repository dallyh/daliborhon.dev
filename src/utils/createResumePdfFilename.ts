import type { AllowedLocales } from "@i18n/config";
import * as m from "$messages";
import { slugifyStr } from "@utils";

export function createResumePdfFilename(locale: string, extension: boolean = false) {
    const filename = slugifyStr(locale, m.common__resume({}, { languageTag: locale as AllowedLocales })) + "-dalibor-hon";

    if (extension) {
        return filename + ".pdf";
    }

    return filename;
}
