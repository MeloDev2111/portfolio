import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PROJECT_TAGS, MAX_PROJECT_TAGS } from "../src/utils/projectTags";

const DIR = join(__dirname, "../src/content/projects/en");

const projects = readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
        const text = readFileSync(join(DIR, file), "utf-8");
        const line = text.match(/^tags:\s*(\[.*\])\s*$/m);
        return { file, tags: line ? (JSON.parse(line[1]) as string[]) : [] };
    });

describe("project tags", () => {
    it.each(projects)("$file only uses the shared vocabulary", ({ tags }) => {
        const allowed: readonly string[] = PROJECT_TAGS;
        expect(tags.filter((t) => !allowed.includes(t))).toEqual([]);
    });

    it.each(projects)("$file has 1 to 5 tags, no repeats", ({ tags }) => {
        expect(tags.length).toBeGreaterThan(0);
        expect(tags.length).toBeLessThanOrEqual(MAX_PROJECT_TAGS);
        expect(new Set(tags).size).toBe(tags.length);
    });

    it("every vocabulary tag is used by some project", () => {
        const used = new Set(projects.flatMap((p) => p.tags));
        expect(PROJECT_TAGS.filter((t) => !used.has(t))).toEqual([]);
    });
});
