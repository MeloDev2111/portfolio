// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from "vitest";
import { initReveal } from "../utils/reveal";

function makeRevealEl(): HTMLElement {
    const el = document.createElement("div");
    el.setAttribute("data-reveal", "");
    document.body.appendChild(el);
    return el;
}

describe("initReveal", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
    });

    it("does nothing when there are no [data-reveal] elements", () => {
        const ioSpy = vi.fn();
        // @ts-expect-error stubbing a browser global for the test
        global.IntersectionObserver = ioSpy;

        initReveal();

        expect(ioSpy).not.toHaveBeenCalled();
    });

    it("reveals synchronously without constructing an observer under reduced motion", () => {
        const el = makeRevealEl();
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: true,
        } as MediaQueryList);
        const ioSpy = vi.fn();
        // @ts-expect-error stubbing a browser global for the test
        global.IntersectionObserver = ioSpy;

        initReveal();

        expect(el.getAttribute("data-revealed")).toBe("");
        expect(ioSpy).not.toHaveBeenCalled();
    });

    it("observes elements and marks them revealed once intersecting, then unobserves", () => {
        const el = makeRevealEl();
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
        } as MediaQueryList);

        const observe = vi.fn();
        const unobserve = vi.fn();
        let capturedCallback: IntersectionObserverCallback = () => {};

        class FakeIntersectionObserver {
            constructor(callback: IntersectionObserverCallback) {
                capturedCallback = callback;
            }
            observe = observe;
            unobserve = unobserve;
            disconnect = vi.fn();
        }
        // @ts-expect-error stubbing a browser global for the test
        global.IntersectionObserver = FakeIntersectionObserver;

        initReveal();

        expect(observe).toHaveBeenCalledWith(el);
        expect(el.hasAttribute("data-revealed")).toBe(false);

        capturedCallback(
            [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
            {} as IntersectionObserver,
        );

        expect(el.getAttribute("data-revealed")).toBe("");
        expect(unobserve).toHaveBeenCalledWith(el);
    });

    it("skips elements already marked as revealed", () => {
        const el = makeRevealEl();
        el.setAttribute("data-revealed", "");
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
        } as MediaQueryList);
        const observe = vi.fn();
        // @ts-expect-error stubbing a browser global for the test
        global.IntersectionObserver = vi.fn().mockImplementation(() => ({
            observe,
            unobserve: vi.fn(),
        }));

        initReveal();

        expect(observe).not.toHaveBeenCalled();
    });
});
