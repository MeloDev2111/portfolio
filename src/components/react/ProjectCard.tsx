import React, { useState, useRef, useEffect } from "react";

export interface ProjectCardLabels {
    demo: string;
    code: string;
    site: string;
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

const isRepoUrl = (url: string) => /github\.com|gitlab\.com/.test(url);

const ExternalIcon: React.FC = () => (
    <svg
        aria-hidden="true"
        className="w-3.5 h-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M7 17 17 7M8 7h9v9" />
    </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"
        />
    </svg>
);

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
    const textRef = useRef<HTMLParagraphElement>(null);
    // The card opens the running app when there is one, otherwise the code/site.
    // Nested <a> tags are invalid, so the card is an <article> with real links
    // inside (title and action row) plus a click handler for the rest of its area.
    const primary = inProgress ? undefined : (demo ?? link);
    // The action row only shows on cards with a demo, where the two links differ.
    const secondary = demo && link !== demo ? link : undefined;

    const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!primary) return;
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        window.open(primary, "_blank", "noopener,noreferrer");
    };

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

    return (
        <article
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
                            !inProgress ? "group-hover:scale-105" : ""
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

                {/* Overlay */}
                <div className="absolute inset-0 bg-gunmetal/20 group-hover:bg-gunmetal/0 transition-colors duration-300" />

                {/* Live demo: a quiet tag at rest, a preview call to action on hover */}
                {demo && !inProgress && (
                    <>
                        <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-gunmetal/85 backdrop-blur-md border border-moon/40 text-[10px] font-bold tracking-wider uppercase text-moon transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0">
                            <PlayIcon className="w-2.5 h-2.5" />
                            {labels.liveBadge}
                        </span>
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 z-10 flex items-end justify-center pb-5 bg-gradient-to-t from-gunmetal/90 via-gunmetal/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-moon text-gunmetal text-sm font-semibold shadow-[0_0_24px_color-mix(in_srgb,var(--color-moon)_45%,transparent)] motion-safe:translate-y-2 motion-safe:transition-transform motion-safe:duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
                                <PlayIcon className="w-3.5 h-3.5" />
                                {labels.demo}
                            </span>
                        </div>
                    </>
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
                        {primary ? (
                            <a
                                href={primary}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="decoration-moon underline-offset-4 focus-visible:outline-none focus-visible:underline"
                            >
                                {title}
                            </a>
                        ) : (
                            title
                        )}
                    </h3>
                    <div className="flex flex-col gap-2 items-end">
                        {featured && !inProgress && (
                            <span className="px-2 py-0.5 rounded text-[10px] tracking-wider font-bold bg-moon text-gunmetal uppercase shadow-[0_0_10px_color-mix(in_srgb,var(--color-moon)_40%,transparent)]">
                                {labels.featured}
                            </span>
                        )}
                    </div>
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

                {/* Actions */}
                {demo && !inProgress && (
                    <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/5">
                        {demo && (
                            <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-moon text-gunmetal text-xs font-semibold transition-shadow hover:shadow-[0_0_14px_color-mix(in_srgb,var(--color-moon)_45%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon"
                            >
                                {labels.demo}
                                <ExternalIcon />
                            </a>
                        )}
                        {secondary && (
                            <a
                                href={secondary}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-300 text-xs font-semibold transition-colors hover:border-moon/40 hover:text-moon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon"
                            >
                                {isRepoUrl(secondary)
                                    ? labels.code
                                    : labels.site}
                                <ExternalIcon />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};
