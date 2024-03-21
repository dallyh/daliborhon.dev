import { siteConfig } from "../../site.config";

export const defaultLocale = siteConfig.i18n.defaultLocale;
export const locales = Object.keys(siteConfig.i18n.locales);
export const localeKeys = Object.fromEntries(Object.entries(siteConfig.i18n.locales).map(([key, value]) => [key, value.locale]));
export type AllowedLocales = keyof typeof siteConfig.i18n.locales;
