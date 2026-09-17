import { en, type UIStrings, type UIKey } from "./locales/en";
import { es } from "./locales/es";
import { ja } from "./locales/ja";

export const languages = {
    en: "English",
    es: "Español",
    ja: "日本語",
} as const;

export const defaultLang = "en";

export const ui = {
    en,
    es,
    ja,
} as const;

export type { UIStrings, UIKey };
