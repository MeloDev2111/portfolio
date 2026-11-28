// @vitest-environment node
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * Card descriptions are clamped to 3 lines (2 in the list view); the rest is
 * reachable through the hover panel or the "read more" dialog. Past this soft
 * limit the text still works, but it reads like a README, so the test warns
 * instead of failing.
 */
const SOFT_LIMIT = 280;
const ROOT = join(__dirname, "../src/content/projects");

const descriptions = readdirSync(ROOT)
    .filter((lang) => statSync(join(ROOT, lang)).isDirectory())
    .flatMap((lang) =>
        readdirSync(join(ROOT, lang))
            .filter((f) => f.endsWith(".md"))
            .map((file) => {
                const text = readFileSync(join(ROOT, lang, file), "utf-8");
                const line = text.match(/^description:\s*(".*")\s*$/m);
                return {
                    file: `${lang}/${file}`,
                    description: line ? (JSON.parse(line[1]) as string) : null,
                };
            }),
    )
    .filter(
        (d): d is { file: string; description: string } =>
            d.description !== null,
    );

describe("project descriptions", () => {
    it.each(descriptions)("$file is not empty", ({ description }) => {
        expect(description.trim().length).toBeGreaterThan(0);
    });

    it("warns about descriptions past the soft limit", () => {
        const long = descriptions.filter(
            (d) => d.description.length > SOFT_LIMIT,
        );
        for (const d of long)
            process.stderr.write(
                `[project descriptions] ${d.file}: ${d.description.length} chars (soft limit ${SOFT_LIMIT})
`,
            );
        expect(true).toBe(true);
    });
});
