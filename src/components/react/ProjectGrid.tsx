import React, { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
    id: string;
    data: {
        title: string;
        description: string;
        tags: string | string[]; // Allow string input
        link?: string;
        image?: string | { src: string; width: number; height: number };
        featured?: boolean;
        inProgress?: boolean;
    };
}

interface ProjectGridProps {
    projects: Project[];
    labels: {
        all: string;
        filter: string;
    };
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
    projects,
    labels,
}) => {
    const [activeTags, setActiveTags] = useState<string[]>([]);

    // Helper to normalize tags (handle if Astro passes Set, Array or String)
    const getSafeTags = (tags: unknown): string[] => {
        if (typeof tags === "string") return tags.split(",");
        if (Array.isArray(tags))
            return tags.filter((t): t is string => typeof t === "string");
        if (tags instanceof Set)
            return Array.from(tags).filter(
                (t): t is string => typeof t === "string",
            );
        return [];
    };

    // Pre-process normalized tags for each project
    const normalizedProjects = useMemo(() => {
        if (!projects || !Array.isArray(projects)) return [];
        return projects.map((p) => ({
            ...p,
            safeTags: getSafeTags(p.data.tags),
        }));
    }, [projects]);

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        normalizedProjects.forEach((p) => {
            p.safeTags.forEach((t) => tags.add(t));
        });
        return Array.from(tags).sort();
    }, [normalizedProjects]);

    // Handle tag toggle
    const toggleTag = (tag: string) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    // Filter projects (AND logic: project must contain all selected tags)
    const filteredProjects = useMemo(() => {
        if (activeTags.length === 0) return normalizedProjects;
        return normalizedProjects.filter((p) =>
            activeTags.every((tag) => p.safeTags.includes(tag)),
        );
    }, [normalizedProjects, activeTags]);

    // Calculate which unselected tags have at least 1 matching project in filteredProjects
    const availableTags = useMemo(() => {
        const set = new Set<string>();
        filteredProjects.forEach((p) => {
            p.safeTags.forEach((t) => set.add(t));
        });
        return set;
    }, [filteredProjects]);

    return (
        <div className="space-y-8">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2.5 justify-center items-center">
                <button
                    onClick={() => setActiveTags([])}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        activeTags.length === 0
                            ? "bg-[#c08b5a] text-gunmetal shadow-[0_0_12px_rgba(192,139,90,0.35)] font-semibold"
                            : "bg-charcoal text-gray-400 hover:text-white border border-white/5 hover:border-[#c08b5a]/30 cursor-pointer"
                    }`}
                >
                    <span>{labels.all}</span>
                    {activeTags.length > 0 && (
                        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-gray-300">
                            ✕
                        </span>
                    )}
                </button>
                {allTags.map((tag) => {
                    const isSelected = activeTags.includes(tag);
                    const isAvailable = isSelected || availableTags.has(tag);

                    return (
                        <button
                            key={tag}
                            onClick={() => isAvailable && toggleTag(tag)}
                            disabled={!isAvailable}
                            aria-pressed={isSelected}
                            aria-disabled={!isAvailable}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 select-none ${
                                isSelected
                                    ? "bg-[#c08b5a] text-gunmetal shadow-[0_0_12px_rgba(192,139,90,0.35)] font-semibold cursor-pointer"
                                    : isAvailable
                                      ? "bg-charcoal text-gray-300 hover:text-white border border-white/10 hover:border-[#c08b5a]/40 hover:bg-white/5 cursor-pointer"
                                      : "bg-charcoal/40 text-gray-600 border border-white/5 opacity-30 cursor-not-allowed"
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        title={project.data.title}
                        description={project.data.description}
                        tags={project.safeTags}
                        link={project.data.link}
                        image={project.data.image}
                        featured={project.data.featured}
                        inProgress={project.data.inProgress}
                        priority={index < 3}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-4">
                    <p>No projects match all selected filters.</p>
                    <button
                        onClick={() => setActiveTags([])}
                        className="text-[#c08b5a] hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};
