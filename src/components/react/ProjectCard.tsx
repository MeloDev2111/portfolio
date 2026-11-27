import React, { useState, useRef, useEffect } from "react";
import {
    getProjectLinks,
    LinkIcon,
    PlayIcon,
    type ProjectLinkLabels,
} from "./ProjectLinks";

export interface ProjectCardLabels extends ProjectLinkLabels {
    featured: string;
    inProgress: string;
    liveBadge: string;
}

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    demo?: string;
    image?: string | { src: string; width: number; height: number };
    featured?: boolean;
    inProgress?: boolean;
    priority?: boolean;
    labels: ProjectCardLabels;
}

/**
 * Gallery card. Its destinations (demo, code or site) live in an overlay on the
 * image: revealed on hover/focus with a mouse, on the first tap on touch screens.
 * A click on the rest of the card opens the first destination (the demo when
 * there is one). Nested <a> tags are invalid, so the card is an <article>.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    link,
    demo,
    image,
    featured,
    inProgress,
    priority = false,
    labels,
}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLElement>(null);

    const links = inProgress ? [] : getProjectLinks(labels, link, demo);
    const primary = links[0]?.href;

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!primary) return;
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        // Touch screens have no hover: the first tap shows the options.
        const noHover = window.matchMedia("(hover: none)").matches;
        if (noHover && links.length > 1 && !revealed) {
            setRevealed(true);
            return;
        }
        window.open(primary, "_blank", "noopener,noreferrer");
    };

    // Hide the tapped-open overlay when the user taps elsewhere.
    useEffect(() => {
        if (!revealed) return;
        const close = (e: PointerEvent) => {
            if (!cardRef.current?.contains(e.target as Node))
                setRevealed(false);
        };
        document.addEventListener("pointerdown", close);
        return () => document.removeEventListener("pointerdown", close);
    }, [revealed]);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const { scrollHeight, clientHeight } = textRef.current;
                setIsTruncated(scrollHeight > clientHeight);
            }
        };

        checkTruncation();
        window.addEventListener("resize", checkTruncation);
        return () => window.removeEventListener("resize", checkTruncation);
    }, [description]);

    // Hidden overlays must not catch taps: on touch screens the first tap has to
    // reach the card (to reveal the options), not an invisible link.
    const overlayVisible = revealed
        ? "opacity-100"
        : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto";
    const buttonMotion = revealed
        ? "scale-100 translate-y-0"
        : "motion-safe:scale-90 motion-safe:translate-y-2 group-hover:scale-100 group-hover:translate-y-0 group-focus-within:scale-100 group-focus-within:translate-y-0";

    return (
        <article
            ref={cardRef}
            onClick={handleCardClick}
            className={`group relative overflow-hidden rounded-2xl glass-card border border-white/5 transition-all duration-500 flex flex-col h-full ${
                primary
                    ? "hover:border-moon/40 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-moon)_15%,transparent)] motion-safe:hover:-translate-y-1 cursor-pointer"
                    : "opacity-80 cursor-default"
            }`}
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 bento-noise opacity-10 pointer-events-none"></div>

            {/* Image / Gradient Placeholder */}
            <div className="h-48 overflow-hidden bg-gunmetal relative border-b border-white/5">
                {image ? (
                    <img
                        src={typeof image === "string" ? image : image.src}
                        alt={title}
                        width={
                            typeof image !== "string" ? image.width : undefined
                        }
                        height={
                            typeof image !== "string" ? image.height : undefined
                        }
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                            !inProgress
                                ? "motion-safe:group-hover:scale-105"
                                : ""
                        }`}
                        loading={priority ? "eager" : "lazy"}
                        decoding="async"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-charcoal to-gunmetal flex items-center justify-center">
                        <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">
                            🚀
                        </span>
                    </div>
                )}

                {/* Resting tint */}
                <div className="absolute inset-0 bg-gunmetal/20 group-hover:bg-gunmetal/0 transition-colors duration-300" />

                {/* Resting cue: this project has a running demo */}
                {demo && !inProgress && (
                    <span
                        className={`absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gunmetal/85 backdrop-blur-md border border-moon/40 text-[10px] font-bold tracking-wider uppercase text-moon transition-opacity duration-300 ${
                            revealed
                                ? "opacity-0"
                                : "group-hover:opacity-0 group-focus-within:opacity-0"
                        }`}
                    >
                        <PlayIcon className="w-2.5 h-2.5" />
                        {labels.liveBadge}
                    </span>
                )}

                {/* Destinations overlay */}
                {links.length > 0 && (
                    <div
                        className={`absolute inset-0 z-20 flex items-center justify-center gap-6 bg-gunmetal/70 backdrop-blur-[3px] transition-opacity duration-300 ${overlayVisible}`}
                    >
                        {links.map((item, i) => (
                            <a
                                key={item.kind}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ transitionDelay: `${i * 60}ms` }}
                                className={`group/btn flex flex-col items-center gap-2 transition-transform duration-300 focus-visible:outline-none ${buttonMotion}`}
                            >
                                <span
                                    className={`grid place-items-center w-14 h-14 rounded-full border transition-all duration-200 group-focus-visible/btn:outline-2 group-focus-visible/btn:outline-offset-2 group-focus-visible/btn:outline-moon ${
                                        item.kind === "demo"
                                            ? "bg-moon text-gunmetal border-moon shadow-[0_0_24px_color-mix(in_srgb,var(--color-moon)_45%,transparent)] group-hover/btn:shadow-[0_0_32px_color-mix(in_srgb,var(--color-moon)_70%,transparent)] motion-safe:group-hover/btn:scale-110"
                                            : "bg-white/10 text-light border-white/25 backdrop-blur-md group-hover/btn:border-moon group-hover/btn:text-moon motion-safe:group-hover/btn:scale-110"
                                    }`}
                                >
                                    <LinkIcon
                                        kind={item.kind}
                                        className={
                                            item.kind === "demo"
                                                ? "w-5 h-5 ml-0.5"
                                                : "w-6 h-6"
                                        }
                                    />
                                </span>
                                <span className="text-xs font-semibold text-light tracking-wide">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </div>
                )}

                {/* In Progress Overlay */}
                {inProgress && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md">
                            🚧 {labels.inProgress}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative z-30">
                <div className="flex justify-between items-start mb-4 gap-2">
                    <h3
                        className={`text-xl font-heading font-bold text-light transition-colors ${primary ? "group-hover:text-moon" : ""}`}
                    >
                        {title}
                    </h3>
                    {featured && !inProgress && (
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] tracking-wider font-bold bg-moon text-gunmetal uppercase shadow-[0_0_10px_color-mix(in_srgb,var(--color-moon)_40%,transparent)]">
                            {labels.featured}
                        </span>
                    )}
                </div>

                <div
                    className="relative mb-6 flex-grow"
                    onMouseEnter={() => isTruncated && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <p
                        ref={textRef}
                        className="text-gray-400 text-sm line-clamp-3 leading-relaxed"
                    >
                        {description}
                    </p>

                    {/* Custom Tooltip */}
                    <div
                        className={`absolute bottom-full left-0 mb-2 w-full p-4 bg-[#1a1f2e]/98 backdrop-blur-xl border border-white/10 rounded-xl text-sm text-gray-300 shadow-2xl transition-all duration-300 z-50 origin-bottom leading-relaxed ${
                            showTooltip && isTruncated
                                ? "opacity-100 translate-y-0 scale-100 visible"
                                : "opacity-0 translate-y-4 scale-95 invisible pointer-events-none"
                        }`}
                    >
                        {description}
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1a1f2e]/98 border-r border-b border-white/10 rotate-45 transform"></div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400 border border-white/5 group-hover:border-moon/20 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
};
