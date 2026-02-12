import { describe, it, expect } from "vitest";
import { publicFileExists } from "../utils/files";

describe("publicFileExists Utility", () => {
    it("should return true for existing file", () => {
        expect(publicFileExists("favicon.svg")).toBe(true);
        expect(publicFileExists("/favicon.svg")).toBe(true);
    });

    it("should return false for missing file", () => {
        expect(publicFileExists("nondestingfile.txt")).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(publicFileExists(undefined)).toBe(false);
    });
});
