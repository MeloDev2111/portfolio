import { describe, it, expect, vi } from "vitest";
import {
    getRelativeLocaleUrl,
    getAllLanguageUrls,
    getLangFromUrl,
} from "../src/i18n/utils";

// Mock import.meta.env.BASE_URL
vi.stubGlobal("import", {
    meta: {
        env: {
            BASE_URL: "/portfolio/",
        },
    },
});

describe("i18n Utilities", () => {
    const TEST_BASE = "/portfolio";

    describe("getLangFromUrl", () => {
        it("should return the language from a URL with base path", () => {
            const url = new URL("https://example.com/portfolio/es/projects");
            expect(getLangFromUrl(url, TEST_BASE)).toBe("es");
        });

        it("should return default language if no language segment is found", () => {
            const url = new URL("https://example.com/portfolio/about");
            expect(getLangFromUrl(url, TEST_BASE)).toBe("en");
        });
    });

    describe("getRelativeLocaleUrl", () => {
        it("should generate correct localized URL with base path", () => {
            expect(getRelativeLocaleUrl("ja", "experience", TEST_BASE)).toBe(
                "/portfolio/ja/experience",
            );
        });

        it("should handle paths with leading slash", () => {
            expect(getRelativeLocaleUrl("en", "/projects", TEST_BASE)).toBe(
                "/portfolio/en/projects",
            );
        });
    });

    describe("getAllLanguageUrls", () => {
        it("should return URLs for all supported languages", () => {
            const url = new URL("https://example.com/portfolio/en/experience");
            const langUrls = getAllLanguageUrls(url, TEST_BASE);

            expect(langUrls).toHaveLength(3);

            const en = langUrls.find((l) => l.code === "en");
            const es = langUrls.find((l) => l.code === "es");
            const ja = langUrls.find((l) => l.code === "ja");

            expect(en?.url).toBe("/portfolio/en/experience");
            expect(es?.url).toBe("/portfolio/es/experience");
            expect(ja?.url).toBe("/portfolio/ja/experience");

            expect(en?.active).toBe(true);
            expect(es?.active).toBe(false);
        });

        it("should preserve search parameters and hashes", () => {
            const url = new URL(
                "https://example.com/portfolio/en/projects?filter=data#list",
            );
            const langUrls = getAllLanguageUrls(url, TEST_BASE);

            const ja = langUrls.find((l) => l.code === "ja");
            expect(ja?.url).toBe("/portfolio/ja/projects?filter=data#list");
        });
    });
});
