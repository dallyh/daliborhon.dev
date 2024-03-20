import { siteConfig } from "../../site.config";
import i18next, { type InitOptions } from "i18next";
import fsBackend from "i18next-fs-backend";

export const defaultLocale = siteConfig.i18n.defaultLocale;
export const locales = Object.keys(siteConfig.i18n.locales);
export const localeKeys = Object.fromEntries(Object.entries(siteConfig.i18n.locales).map(([key, value]) => [key, value.locale]));
export type AllowedLocales = keyof typeof siteConfig.i18n.locales;

const i18nConfig: InitOptions = {
    debug: false,
    ns: [],
    defaultNS: "common",
    nsSeparator: ".",
    keySeparator: false,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
};

const i18n = i18next
    .createInstance({
        ...i18nConfig,
        backend: {
            loadPath: "./src/i18n/locales/{{lng}}/{{ns}}.yaml",
        },
    })
    .use(fsBackend);

export const t = i18n.t;

export const loadNamespaces = async (locale: string, namespaces: string[]) => {
    if (!i18n.isInitialized) {
        logMessage("loadNamespaces", "i18n is not initialized. Trying to init.");
        await initOnce();
    }

    if (i18n.language !== locale) {
        await i18n.changeLanguage(locale);
    }

    for (let i = 0; i < namespaces.length; i++) {
        if (i18n.hasLoadedNamespace(namespaces[i]) === false) {
            logMessage("loadNamespaces", "loading namespace: " + namespaces[i]);
            await i18n.loadNamespaces(namespaces[i]);
        }
    }
};

export const interpolate = (stringToInterpolate: string, replacements: { [key: string]: string }): string => {
    return Object.keys(replacements).reduce((acc, key) => acc.replace(new RegExp(`{{${key}}}`, "g"), replacements[key]), stringToInterpolate);
};

const initOnce = async () => {
    if (!i18n.isInitialized) {
        logMessage("initOnce", "i18n start init.");
        await i18n.init().then(() => {
            logMessage("initOnce", "i18n was initialized.");
        });

        await i18n.loadLanguages(locales).then(() => {
            logMessage("initOnce", "i18n loaded languages.");
        });
    }
};

const logMessage = (fn: string, msg: string) => {
    const gray = "\x1b[90m";
    const currentDate = new Date();
    console.log(gray, `${currentDate.toLocaleTimeString()} [i18n: ${fn}]: ${msg}`);
};

export default i18n;
