import React, { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
    slug: string;
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
    const getSafeTags = (tags: any): string[] => {
        if (typeof tags === "string") return tags.split(",");
        if (Array.isArray(tags)) return tags;
        if (tags instanceof Set) return Array.from(tags);
        return [];
    };

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        if (projects && Array.isArray(projects)) {
            projects.forEach((p) => {
                const pTags = getSafeTags(p.data.tags);
                pTags.forEach((t) => tags.add(t));
            });
        }
        return Array.from(tags).sort();
    }, [projects]);

    // Handle tag toggle
    const toggleTag = (tag: string) => {
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );
    };

    // Filter projects (AND logic: project must contain all selected tags)
    const filteredProjects = useMemo(() => {
        if (activeTags.length === 0) return projects;
        return projects.filter((p) => {
            const pTags = getSafeTags(p.data.tags);
            return activeTags.every((tag) => pTags.includes(tag));
        });
    }, [projects, activeTags]);

    return (
        <div className="space-y-8">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={() => setActiveTags([])}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTags.length === 0
                        ? "bg-[#c08b5a] text-gunmetal shadow-[0_0_10px_rgba(192,139,90,0.3)]"
                        : "bg-charcoal text-gray-400 hover:text-light border border-white/5 hover:border-[#c08b5a]/30"
                        }`}
                >
                    {labels.all}
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTags.includes(tag)
                            ? "bg-[#c08b5a] text-gunmetal shadow-[0_0_10px_rgba(192,139,90,0.3)]"
                            : "bg-charcoal text-gray-400 hover:text-light border border-white/5 hover:border-[#c08b5a]/30"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.slug}
                        title={project.data.title}
                        description={project.data.description}
                        tags={getSafeTags(project.data.tags)}
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
