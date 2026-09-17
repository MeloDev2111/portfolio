import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

function luminance(hex: string): number {
    const clean = hex.replace("#", "");
    const rgb =
        clean.length === 3
            ? clean.split("").map((c) => parseInt(c + c, 16) / 255)
            : clean.match(/.{2}/g)!.map((x) => parseInt(x, 16) / 255);

    const [r, g, b] = rgb.map((v) =>
        v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    );
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1: string, hex2: string): number {
    const l1 = luminance(hex1);
    const l2 = luminance(hex2);
    const lightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (lightest + 0.05) / (darkest + 0.05);
}

const tokensCssPath = fileURLToPath(
    new URL("../styles/tokens.css", import.meta.url),
);
const tokensCss = readFileSync(tokensCssPath, "utf-8");

// Parse primitives from @theme block
const primitiveMatches = tokensCss.matchAll(
    /(--color-[\w-]+):\s*(#[0-9a-fA-F]{3,8});/g,
);
const primitives: Record<string, string> = {};
for (const match of primitiveMatches) {
    primitives[match[1]] = match[2];
}

function parseThemeBlock(blockRegex: RegExp): Record<string, string> {
    const blockMatch = tokensCss.match(blockRegex);
    if (!blockMatch) return {};
    const content = blockMatch[1];
    const vars: Record<string, string> = {};

    const varMatches = content.matchAll(
        /(--[\w-]+):\s*(?:var\((--color-[\w-]+)\)|(#[0-9a-fA-F]{3,8}));/g,
    );
    for (const match of varMatches) {
        const varName = match[1];
        const refColor = match[2];
        const directHex = match[3];
        if (directHex) {
            vars[varName] = directHex;
        } else if (refColor && primitives[refColor]) {
            vars[varName] = primitives[refColor];
        }
    }
    return vars;
}

const darkTokens = parseThemeBlock(/:root\s*\{([\s\S]*?)\n\}/);
const lightTokens = parseThemeBlock(
    /\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/,
);

describe("WCAG AA Contrast Ratios (≥ 4.5:1)", () => {
    describe("Dark Theme", () => {
        it("fg / bg passes AA", () => {
            const ratio = contrastRatio(darkTokens["--fg"], darkTokens["--bg"]);
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("fg-muted / bg passes AA", () => {
            const ratio = contrastRatio(
                darkTokens["--fg-muted"],
                darkTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("fg-subtle / bg passes AA", () => {
            const ratio = contrastRatio(
                darkTokens["--fg-subtle"],
                darkTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("accent / bg passes AA", () => {
            const ratio = contrastRatio(
                darkTokens["--accent"],
                darkTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("accent-fg / accent passes AA", () => {
            const ratio = contrastRatio(
                darkTokens["--accent-fg"],
                darkTokens["--accent"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("action-fg / action passes AA", () => {
            const ratio = contrastRatio(
                darkTokens["--action-fg"],
                darkTokens["--action"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
    });

    describe("Light Theme", () => {
        it("fg / bg passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--fg"],
                lightTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("fg-muted / bg passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--fg-muted"],
                lightTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("fg-subtle / bg passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--fg-subtle"],
                lightTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("accent / bg passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--accent"],
                lightTokens["--bg"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("accent-fg / accent passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--accent-fg"],
                lightTokens["--accent"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });

        it("action-fg / action passes AA", () => {
            const ratio = contrastRatio(
                lightTokens["--action-fg"],
                lightTokens["--action"],
            );
            expect(ratio).toBeGreaterThanOrEqual(4.5);
        });
    });
});

describe("Phase 6 Invariant Guards", () => {
    it("tokens.css has no legacy aliases", () => {
        const legacy = [
            "--color-gunmetal:",
            "--color-gold:",
            "--color-charcoal:",
            "--color-light:",
            "--color-copper:",
        ];
        for (const alias of legacy) {
            expect(tokensCss).not.toContain(alias);
        }
    });

    it("src/ contains no legacy class names", () => {
        const srcDir = fileURLToPath(new URL("../", import.meta.url));

        function scanFiles(dir: string): string[] {
            const entries = readdirSync(dir);
            const files: string[] = [];
            for (const entry of entries) {
                if (entry === "tests") continue;
                const full = join(dir, entry);
                if (statSync(full).isDirectory()) {
                    files.push(...scanFiles(full));
                } else if (/\.(astro|tsx|ts|css|html)$/.test(entry)) {
                    files.push(full);
                }
            }
            return files;
        }

        const files = scanFiles(srcDir);
        const legacyPatterns = [
            /\bbg-gunmetal\b/,
            /\btext-gold\b/,
            /\bbg-gold\b/,
            /\.glass-card\b/,
            /\.bento-noise\b/,
        ];

        for (const file of files) {
            const content = readFileSync(file, "utf-8");
            for (const pattern of legacyPatterns) {
                expect(
                    pattern.test(content),
                    `Found legacy class matching ${pattern} in ${file}`,
                ).toBe(false);
            }
        }
    });

    it("src/ contains no raw hex values outside allowed design-system files", () => {
        const srcDir = fileURLToPath(new URL("../", import.meta.url));

        function scanFiles(dir: string): string[] {
            const entries = readdirSync(dir);
            const files: string[] = [];
            for (const entry of entries) {
                if (entry === "tests") continue;
                const full = join(dir, entry);
                if (statSync(full).isDirectory()) {
                    files.push(...scanFiles(full));
                } else if (/\.(astro|tsx|ts|css|html)$/.test(entry)) {
                    files.push(full);
                }
            }
            return files;
        }

        const files = scanFiles(srcDir);
        const allowedFiles = [
            "tokens.css",
            "skills.ts",
            "theme.ts",
            "ThemeScript.astro",
            "Logo.astro",
        ];

        const hexRegex = /#[0-9a-fA-F]{3,8}\b/g;

        for (const file of files) {
            const basename = file.split(/[\\/]/).pop()!;
            if (allowedFiles.includes(basename)) continue;

            const content = readFileSync(file, "utf-8");
            const matches = content.match(hexRegex);
            expect(
                matches,
                `Found raw hex code ${matches?.join(", ")} in ${file}`,
            ).toBeNull();
        }
    });
});
