import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
    const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL.slice(0, -1)
        : import.meta.env.BASE_URL;
    const path = url.pathname.replace(base, "");
    const [, lang] = path.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function getRelativeLocaleUrl(lang: string, path: string) {
    const base = import.meta.env.BASE_URL.endsWith("/")
        ? import.meta.env.BASE_URL.slice(0, -1)
        : import.meta.env.BASE_URL;
    const p = path.startsWith("/") ? path : `/${path}`;
    return `${base}/${lang}${p}`;
}
