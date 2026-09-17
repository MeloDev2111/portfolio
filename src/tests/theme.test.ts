import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolveTheme, THEME_STORAGE_KEY, THEME_COLOR } from "../utils/theme";

describe("resolveTheme", () => {
    it.each([
        ["dark", true, "dark"],
        ["dark", false, "dark"],
        ["light", true, "light"],
        ["light", false, "light"],
        [null, true, "light"],
        [null, false, "dark"],
        ["garbage", true, "light"],
        ["garbage", false, "dark"],
    ] as const)(
        "resolveTheme(%s, %s) -> %s",
        (stored, prefersLight, expected) => {
            expect(resolveTheme(stored, prefersLight)).toBe(expected);
        },
    );
});

describe("ThemeScript stays in sync with utils/theme.ts", () => {
    const scriptSource = readFileSync(
        fileURLToPath(new URL("../layouts/ThemeScript.astro", import.meta.url)),
        "utf-8",
    );

    it("uses the same localStorage key", () => {
        const match = scriptSource.match(/var KEY = "([^"]+)"/);
        expect(match?.[1]).toBe(THEME_STORAGE_KEY);
    });

    it("uses the same theme-color hex values", () => {
        const match = scriptSource.match(
            /var COLORS = \{ dark: "([^"]+)", light: "([^"]+)" \}/,
        );
        expect(match?.[1]).toBe(THEME_COLOR.dark);
        expect(match?.[2]).toBe(THEME_COLOR.light);
    });
});
