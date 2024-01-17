// i18n settings
export const localeSettings: LocaleSettingsType = {
    cs: {
        label: "Čeština",
        locale: "cs",
        default: true,
    },
    en: {
        label: "English",
        locale: "en",
        cmsDefault: true,
    },
};

// Type backing allowed locales
// TODO - can this be dynamic, like the rest of the settings?
export type AllowedLocales = "cs" | "en";

// Defaults
export const defaultLocale = Object.keys(localeSettings).find((key) => localeSettings[key].default)!;

// Locales
export const locales = Object.keys(localeSettings);
export const localeKeys = Object.fromEntries(Object.entries(localeSettings).map(([key, value]) => [key, value.locale]));

// The type backing the settings
export type LocaleSettingsType = Record<
string,
    {
        label: string;
        locale: string;
        default?: boolean;
        cmsDefault?: boolean;
    }
>;

export default {};
