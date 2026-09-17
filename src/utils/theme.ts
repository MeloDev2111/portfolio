export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

export const THEME_COLOR: Record<Theme, string> = {
    dark: "#0c111c",
    light: "#faf7f2",
};

export function resolveTheme(
    stored: string | null,
    prefersLight: boolean,
): Theme {
    if (stored === "dark" || stored === "light") return stored;
    return prefersLight ? "light" : "dark";
}
