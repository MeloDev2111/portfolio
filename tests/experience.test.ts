import { describe, it, expect } from "vitest";
import {
    EXPERIENCE,
    boldMarkup,
    formatMonth,
    formatTenure,
    getTimeline,
    localize,
    monthsBetween,
    totalYears,
} from "../src/utils/experience";

const NOW = new Date(2026, 9, 21); // 21 Oct 2026

describe("monthsBetween", () => {
    it("counts the start and end month, like LinkedIn", () => {
        expect(monthsBetween("2026-03", "2026-10")).toBe(8);
        expect(monthsBetween("2022-05", "2026-03")).toBe(47);
        expect(monthsBetween("2023-05", "2023-10")).toBe(6);
    });

    it("uses the current month for Present", () => {
        expect(monthsBetween("2026-03", "Present", NOW)).toBe(8);
    });
});

describe("formatTenure", () => {
    it("formats months and years in English", () => {
        expect(formatTenure(8, "en")).toBe("8 mos");
        expect(formatTenure(13, "en")).toBe("1 yr 1 mo");
        expect(formatTenure(47, "en")).toBe("3 yrs 11 mos");
        expect(formatTenure(24, "en")).toBe("2 yrs");
    });

    it("formats in Spanish and Japanese", () => {
        expect(formatTenure(47, "es")).toBe("3 años 11 meses");
        expect(formatTenure(13, "es")).toBe("1 año 1 mes");
        expect(formatTenure(47, "ja")).toBe("3年11か月");
    });
});

describe("formatMonth", () => {
    it("capitalizes the month", () => {
        expect(formatMonth("2026-03", "es")).toMatch(/^Mar/);
        expect(formatMonth("2026-03", "en")).toBe("Mar 2026");
    });
});

describe("totalYears", () => {
    it("returns whole years since the first role", () => {
        expect(totalYears(EXPERIENCE, NOW)).toBe(4);
    });
});

describe("localize", () => {
    it("falls back to English when a language is missing", () => {
        const text = { en: "Hello", es: "Hola" };
        expect(localize(text, "es")).toBe("Hola");
        expect(localize(text, "ja")).toBe("Hello");
    });
});

describe("boldMarkup", () => {
    it("turns **bold** into strong tags", () => {
        expect(boldMarkup("a **b** c")).toContain("<strong");
        expect(boldMarkup("a **b** c")).toContain(">b</strong>");
    });
});

describe("EXPERIENCE data", () => {
    it("keeps companies and roles newest first", () => {
        for (const company of EXPERIENCE) {
            const starts = company.roles.map((r) => r.start);
            expect([...starts].sort().reverse()).toEqual(starts);
        }
        const timeline = getTimeline();
        expect(timeline[0].current).toBe(true);
    });

    it("has the same number of highlights in English and Spanish", () => {
        for (const role of EXPERIENCE.flatMap((c) => c.roles)) {
            expect(role.highlights.es).toHaveLength(role.highlights.en.length);
        }
    });
});
