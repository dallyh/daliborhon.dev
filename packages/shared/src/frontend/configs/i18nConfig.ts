import { siteConfig } from "./siteConfig";

export const defaultLocale = siteConfig.i18n.defaultLocale;
export const locales = Object.keys(siteConfig.i18n.locales);
export const localeKeys = Object.fromEntries(Object.entries(siteConfig.i18n.locales).map(([key, value]) => [key, value.path]));
export const astroI18nConfigPaths = Object.values(siteConfig.i18n.locales).map(({ path, codes }) => ({ path, codes }));

export type AllowedLocales = keyof typeof siteConfig.i18n.locales;