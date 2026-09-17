import { describe, it, expect } from "vitest";
import {
    sectionClasses,
    cardClasses,
    buttonClasses,
    tagClasses,
} from "../components/ui/_variants";

describe("sectionClasses", () => {
    it("maps tone and space to their classes", () => {
        const classes = sectionClasses({ tone: "subtle", space: "lg" });
        expect(classes).toContain("bg-bg-subtle");
        expect(classes).toContain("py-24");
    });

    it("appends the custom class", () => {
        expect(sectionClasses({ class: "custom" })).toContain("custom");
    });
});

describe("cardClasses", () => {
    it("uses the glass utility for the glass variant", () => {
        expect(cardClasses({ variant: "glass" })).toContain("glass");
    });

    it("swaps to glass-interactive when interactive", () => {
        const classes = cardClasses({ variant: "glass", interactive: true });
        expect(classes).toContain("glass-interactive");
    });

    it("does not apply glass-interactive to non-glass variants", () => {
        const classes = cardClasses({ variant: "solid", interactive: true });
        expect(classes).not.toContain("glass-interactive");
        expect(classes).toContain("hover:border-border-accent");
    });

    it("applies glow and noise only when requested", () => {
        expect(cardClasses({ glow: true })).toContain("glow-accent");
        expect(cardClasses({ noise: true })).toContain("noise");
        expect(cardClasses({})).not.toContain("glow-accent");
    });

    it("passes span through untouched for grid placement", () => {
        expect(cardClasses({ span: "md:col-span-2" })).toContain(
            "md:col-span-2",
        );
    });
});

describe("buttonClasses", () => {
    it("gives primary the amber action fill", () => {
        expect(buttonClasses({ variant: "primary" })).toContain("bg-action");
    });

    it("drops the touch-target minimums for the link variant", () => {
        const classes = buttonClasses({ variant: "link" });
        expect(classes).not.toContain("min-h-11");
        expect(classes).not.toContain("min-w-11");
    });

    it("enforces a 44x44 minimum hit area for non-link variants", () => {
        const classes = buttonClasses({ variant: "secondary" });
        expect(classes).toContain("min-h-11");
        expect(classes).toContain("min-w-11");
    });
});

describe("tagClasses", () => {
    it("uses action-text, never raw amber, for the action variant", () => {
        const classes = tagClasses({ variant: "action" });
        expect(classes).toContain("text-action-text");
        expect(classes).not.toContain("text-action ");
    });
});
