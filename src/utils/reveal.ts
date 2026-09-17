/**
 * Scroll-reveal via IntersectionObserver — one-shot, unobserves after
 * revealing. Short-circuits under prefers-reduced-motion: elements reveal
 * synchronously and no observer is created. Source of truth: the
 * `html:not(.js) [data-reveal]` guard in global.css keeps JS-disabled
 * visitors from seeing a blank page.
 */
export function initReveal(root: ParentNode = document): void {
    const elements = Array.from(
        root.querySelectorAll<HTMLElement>(
            "[data-reveal]:not([data-revealed])",
        ),
    );
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
        elements.forEach((el) => el.setAttribute("data-revealed", ""));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-revealed", "");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    elements.forEach((el) => io.observe(el));
}
