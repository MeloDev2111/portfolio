export type Theme = "dark" | "light";

// Namespaced: github.io serves every project from one origin, so a bare
// "theme" key would collide with anything else hosted under it.
export const THEME_STORAGE_KEY = "melodev-theme";

export const THEME_COLOR: Record<Theme, string> = {
    dark: "#0c111c",
    light: "#faf7f2",
};

/** Text colour matching THEME_COLOR. Used by the stylesheet-less redirect page. */
export const THEME_FG: Record<Theme, string> = {
    dark: "#e1e1e0",
    light: "#0c111c",
};

export function resolveTheme(
    stored: string | null,
    prefersLight: boolean,
): Theme {
    if (stored === "dark" || stored === "light") return stored;
    return prefersLight ? "light" : "dark";
}
