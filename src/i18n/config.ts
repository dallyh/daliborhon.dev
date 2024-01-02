// i18n

export type LocaleSettingsType = Record<
    string,
    {
        label: string;
        locale: string;
        default?: boolean;
    }
>;

export const localeSettings: LocaleSettingsType = {
    cs: {
        label: "Čeština",
        locale: "cs",
        default: true,
    },
    en: {
        label: "English",
        locale: "cs",
    },
};

export const defaultLocale = Object.keys(localeSettings).find((key) => localeSettings[key].default) || null;
export const locales = Object.keys(localeSettings);
export const localeKeys = Object.fromEntries(Object.entries(localeSettings).map(([key, value]) => [key, value.locale]));

export default {};
