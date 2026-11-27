import React from "react";
import { getProjectLinks, PlayIcon, ProjectLinkButtons } from "./ProjectLinks";
import type { ProjectCardLabels } from "./ProjectCard";

interface ProjectRowProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    demo?: string;
    image?: string | { src: string; width: number; height: number };
    year?: number;
    featured?: boolean;
    inProgress?: boolean;
    labels: ProjectCardLabels;
}

const MAX_TAGS = 3;

/** Compact list row: built for scanning many projects at once. */
export const ProjectRow: React.FC<ProjectRowProps> = ({
    title,
    description,
    tags,
    link,
    demo,
    image,
    year,
    featured,
    inProgress,
    labels,
}) => {
    const links = inProgress ? [] : getProjectLinks(labels, link, demo);
    const primary = links[0]?.href;
    const extraTags = tags.length - MAX_TAGS;

    const handleRowClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!primary) return;
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        window.open(primary, "_blank", "noopener,noreferrer");
    };

    return (
        <article
            onClick={handleRowClick}
            className={`group grid grid-cols-[1fr_auto] lg:grid-cols-[6rem_minmax(0,1fr)_16rem_2.5rem_5.25rem] items-center gap-x-5 gap-y-3 px-4 py-4 lg:px-5 rounded-xl transition-colors duration-200 ${
                primary ? "cursor-pointer hover:bg-white/[0.03]" : "opacity-70"
            }`}
        >
            {/* Thumbnail */}
            <div className="hidden lg:block w-24 h-14 rounded-lg overflow-hidden bg-charcoal border border-white/5">
                {image && (
                    <img
                        src={typeof image === "string" ? image : image.src}
                        alt=""
                        className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>

            {/* Title + description */}
            <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3
                        className={`font-heading font-bold text-light text-base transition-colors ${primary ? "group-hover:text-moon" : ""}`}
                    >
                        {title}
                    </h3>
                    {featured && !inProgress && (
                        <span
                            className="w-1.5 h-1.5 rounded-full bg-moon shadow-[0_0_8px_var(--color-moon)]"
                            title={labels.featured}
                            aria-label={labels.featured}
                            role="img"
                        />
                    )}
                    {demo && !inProgress && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-moon/40 text-[9px] font-bold tracking-wider uppercase text-moon">
                            <PlayIcon className="w-2 h-2" />
                            {labels.liveBadge}
                        </span>
                    )}
                    {inProgress && (
                        <span className="px-1.5 py-0.5 rounded border border-yellow-500/40 text-[9px] font-bold tracking-wider uppercase text-yellow-400">
                            {labels.inProgress}
                        </span>
                    )}
                </div>
                <p className="mt-1 text-sm text-gray-400 line-clamp-2 lg:line-clamp-1">
                    {description}
                </p>
            </div>

            {/* Links (top-right on mobile, last column on desktop) */}
            <div className="row-start-1 col-start-2 lg:col-start-5 justify-self-end">
                <ProjectLinkButtons items={links} />
            </div>

            {/* Tags */}
            <div className="col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 flex flex-wrap gap-1.5">
                {tags.slice(0, MAX_TAGS).map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-gray-400 border border-white/5"
                    >
                        {tag}
                    </span>
                ))}
                {extraTags > 0 && (
                    <span
                        className="px-1.5 py-0.5 text-[11px] text-gray-500"
                        title={tags.slice(MAX_TAGS).join(", ")}
                    >
                        +{extraTags}
                    </span>
                )}
            </div>

            {/* Year */}
            <span className="hidden lg:block lg:col-start-4 lg:row-start-1 font-mono text-xs text-gray-500 tabular-nums">
                {year}
            </span>
        </article>
    );
};
