import React, {
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { LinkIcon, type ProjectLinkItem } from "./ProjectLinks";

export interface ProjectDescriptionLabels {
    readMore: string;
    close: string;
}

interface ProjectDescriptionProps {
    title: string;
    text: string;
    links: ProjectLinkItem[];
    /** Tailwind classes for the clamped paragraph (font size, line-clamp). */
    className: string;
    labels: ProjectDescriptionLabels;
}

const MARGIN = 12;
/** Panel padding (px-4 pt-1.5): the text inside lines up with the original. */
const PAD_X = 16;
const PAD_Y = 6;
const MAX_WIDTH = 800; // max-w-3xl (768) + padding: the list row text
const OPEN_DELAY = 250;

interface Position {
    top: number;
    left: number;
    width: number;
}

/**
 * Project description clamped to a few lines. When the text does not fit:
 * - with a mouse, hovering the text unfolds the full description in a panel
 *   laid over it, rendered on <body> (no clipping by the card, no layout shift);
 * - a "read more" button opens it in a dialog: a bottom sheet on phones, a
 *   centered panel on larger screens. This is also the keyboard path.
 * The full text always stays in the DOM, so screen readers read it as is.
 */
export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
    title,
    text,
    links,
    className,
    labels,
}) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const timer = useRef<number | undefined>(undefined);
    const [truncated, setTruncated] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [pos, setPos] = useState<Position | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const titleId = useId();

    useEffect(() => {
        const el = textRef.current;
        if (!el) return;
        const check = () => setTruncated(el.scrollHeight > el.clientHeight + 1);
        check();
        const ro = new ResizeObserver(check);
        ro.observe(el);
        return () => ro.disconnect();
    }, [text]);

    // Lay the panel over the clamped text, same font and width, so it reads as
    // the text unfolding downwards (over the tags, never over the image and its
    // links). It only moves up when the bottom of the viewport cuts it.
    const place = useCallback(() => {
        const p = textRef.current;
        const panel = panelRef.current;
        if (!p || !panel) return;
        const anchor = p.getBoundingClientRect();
        const style = getComputedStyle(p);
        const vw = document.documentElement.clientWidth;
        const width = Math.min(
            anchor.width + PAD_X * 2,
            MAX_WIDTH,
            vw - MARGIN * 2,
        );
        const left = Math.min(
            Math.max(anchor.left - PAD_X, MARGIN),
            vw - width - MARGIN,
        );
        panel.style.fontSize = style.fontSize;
        panel.style.lineHeight = style.lineHeight;
        // Measure at the final width and font: the height depends on them.
        panel.style.width = `${width}px`;
        const height = panel.offsetHeight;
        const top = Math.max(
            Math.min(anchor.top - PAD_Y, window.innerHeight - MARGIN - height),
            MARGIN,
        );
        setPos({ top, left, width });
    }, []);

    useLayoutEffect(() => {
        if (!hovering) {
            setPos(null);
            return;
        }
        place();
        window.addEventListener("scroll", place, true);
        window.addEventListener("resize", place);
        return () => {
            window.removeEventListener("scroll", place, true);
            window.removeEventListener("resize", place);
        };
    }, [hovering, place]);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const onEnter = (e: React.PointerEvent) => {
        if (!truncated || e.pointerType !== "mouse") return;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setHovering(true), OPEN_DELAY);
    };
    const onLeave = () => {
        window.clearTimeout(timer.current);
        setHovering(false);
    };

    const openDialog = (e: React.MouseEvent) => {
        // The card opens its link on click; this button must not.
        e.stopPropagation();
        onLeave();
        dialogRef.current?.showModal();
        setDialogOpen(true);
    };
    const closeDialog = () => dialogRef.current?.close();

    // The page behind a modal should not scroll.
    useEffect(() => {
        if (!dialogOpen) return;
        const root = document.documentElement;
        const prev = root.style.overflow;
        root.style.overflow = "hidden";
        return () => {
            root.style.overflow = prev;
        };
    }, [dialogOpen]);

    return (
        <>
            <p
                ref={textRef}
                onPointerEnter={onEnter}
                onPointerLeave={onLeave}
                className={className}
            >
                {text}
            </p>

            {truncated && (
                <button
                    type="button"
                    onClick={openDialog}
                    aria-haspopup="dialog"
                    className="mt-1 -ml-1 px-1 py-1 text-xs font-semibold tracking-wide text-moon/80 hover:text-moon rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon"
                >
                    {labels.readMore}
                </button>
            )}

            {hovering &&
                createPortal(
                    <div
                        ref={panelRef}
                        aria-hidden="true"
                        style={
                            pos
                                ? {
                                      top: pos.top,
                                      left: pos.left,
                                      width: pos.width,
                                  }
                                : { top: 0, left: 0, visibility: "hidden" }
                        }
                        className="fixed z-[60] pointer-events-none rounded-xl border border-white/10 bg-charcoal px-4 pt-1.5 pb-3 text-gray-200 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)] motion-safe:animate-[desc-pop_160ms_ease-out]"
                    >
                        {text}
                    </div>,
                    document.body,
                )}

            {truncated &&
                createPortal(
                    // Portaled React events still bubble to the card: stop them here.
                    <dialog
                        ref={dialogRef}
                        aria-labelledby={titleId}
                        onClose={() => setDialogOpen(false)}
                        onClick={(e) => {
                            e.stopPropagation();
                            // A click on the backdrop lands on the <dialog> itself.
                            if (e.target === e.currentTarget) closeDialog();
                        }}
                        className="project-sheet m-0 mt-auto sm:m-auto w-full max-w-none sm:max-w-lg max-h-[85dvh] p-0 bg-transparent text-light backdrop:bg-gunmetal/75 backdrop:backdrop-blur-sm"
                    >
                        <div className="relative flex flex-col max-h-[85dvh] rounded-t-2xl sm:rounded-2xl border border-white/10 bg-charcoal shadow-2xl">
                            <div
                                aria-hidden="true"
                                className="sm:hidden mx-auto mt-3 h-1 w-10 rounded-full bg-white/20"
                            />
                            <div className="flex items-start justify-between gap-4 px-6 pt-4 sm:pt-6">
                                <h3
                                    id={titleId}
                                    className="font-heading text-xl font-bold text-light"
                                >
                                    {title}
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeDialog}
                                    aria-label={labels.close}
                                    className="-mr-2 -mt-1 grid place-items-center w-10 h-10 shrink-0 rounded-full text-gray-400 hover:text-light hover:bg-white/5 cursor-pointer focus-visible:outline-2 focus-visible:outline-moon"
                                >
                                    <svg
                                        aria-hidden="true"
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    >
                                        <path d="M6 6l12 12M18 6L6 18" />
                                    </svg>
                                </button>
                            </div>
                            <p className="px-6 pt-3 pb-2 overflow-y-auto text-[15px] leading-relaxed text-gray-300">
                                {text}
                            </p>
                            {links.length > 0 && (
                                <div className="flex gap-3 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                                    {links.map((item) => (
                                        <a
                                            key={item.kind}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-full border text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon ${
                                                item.kind === "demo"
                                                    ? "bg-moon text-gunmetal border-moon"
                                                    : "border-white/15 text-light hover:border-moon/60 hover:text-moon"
                                            }`}
                                        >
                                            <LinkIcon
                                                kind={item.kind}
                                                className="w-4 h-4"
                                            />
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                            {links.length === 0 && <div className="pb-6" />}
                        </div>
                    </dialog>,
                    document.body,
                )}
        </>
    );
};
