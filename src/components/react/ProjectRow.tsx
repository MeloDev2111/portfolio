import React from "react";
import { getProjectLinks, ProjectLinkButtons } from "./ProjectLinks";
import type { ProjectCardLabels } from "./ProjectCard";
import { ProjectDescription } from "./ProjectDescription";

interface ProjectRowProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    demo?: string;
    image?: string | { src: string; width: number; height: number };
    year?: number;
    inProgress?: boolean;
    labels: ProjectCardLabels;
}

/**
 * List row: thumbnail, title, two lines of description and a quiet meta line.
 * Badges are left to the gallery; here the buttons on the right already say
 * whether there is a demo, so nothing is repeated.
 */
export const ProjectRow: React.FC<ProjectRowProps> = ({
    title,
    description,
    tags,
    link,
    demo,
    image,
    year,
    inProgress,
    labels,
}) => {
    const links = inProgress ? [] : getProjectLinks(labels, link, demo);
    const primary = links[0]?.href;
    const meta = [year, ...tags].filter(Boolean).join("  ·  ");

    const handleRowClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!primary) return;
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        window.open(primary, "_blank", "noopener,noreferrer");
    };

    return (
        <article
            onClick={handleRowClick}
            className={`group grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-6 gap-y-3 p-4 sm:p-5 rounded-xl transition-colors duration-200 ${
                primary ? "cursor-pointer hover:bg-white/[0.03]" : ""
            }`}
        >
            {/* Thumbnail */}
            <div className="hidden sm:block w-40 md:w-48 aspect-[2/1] rounded-lg overflow-hidden bg-charcoal border border-white/5">
                {image && (
                    <img
                        src={typeof image === "string" ? image : image.src}
                        alt=""
                        className={`w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105 ${inProgress ? "opacity-50" : ""}`}
                        loading="lazy"
                        decoding="async"
                    />
                )}
            </div>

            {/* Text */}
            <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <h3
                        className={`font-heading font-bold text-lg transition-colors ${primary ? "text-light group-hover:text-moon" : "text-light/70"}`}
                    >
                        {title}
                    </h3>
                    {inProgress && (
                        <span className="px-1.5 py-0.5 rounded border border-yellow-500/40 text-[10px] font-bold tracking-wider uppercase text-yellow-400">
                            {labels.inProgress}
                        </span>
                    )}
                </div>
                <div className="mt-1.5 max-w-3xl">
                    <ProjectDescription
                        title={title}
                        text={description}
                        links={links}
                        labels={labels}
                        className="text-[15px] leading-relaxed text-gray-400 line-clamp-2"
                    />
                </div>
                <p className="mt-2 text-xs text-gray-500 font-mono tracking-tight">
                    {meta}
                </p>
            </div>

            {/* Links */}
            <div className="row-start-1 col-start-2 sm:col-start-3 self-start sm:self-center">
                <ProjectLinkButtons items={links} />
            </div>
        </article>
    );
};
