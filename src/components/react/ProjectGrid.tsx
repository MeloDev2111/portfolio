import React, { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';

interface Project {
    slug: string;
    data: {
        title: string;
        description: string;
        tags: string[];
        link?: string;
        image?: string;
        featured?: boolean;
        date: Date; // Keep as Date object, purely for sorting if needed, though we strictly use props for display
    }
}

interface ProjectGridProps {
    projects: Project[];
    labels: {
        all: string;
        filter: string;
    };
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, labels }) => {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        projects.forEach(p => p.data.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, [projects]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (!activeTag) return projects;
        return projects.filter(p => p.data.tags.includes(activeTag));
    }, [projects, activeTag]);

    return (
        <div className="space-y-8">
            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
                <button
                    onClick={() => setActiveTag(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTag === null
                            ? 'bg-gold text-gunmetal shadow-[0_0_10px_rgba(244,208,63,0.3)]'
                            : 'bg-charcoal text-gray-400 hover:text-light border border-white/5 hover:border-gold/30'
                        }`}
                >
                    {labels.all}
                </button>
                {allTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTag === tag
                                ? 'bg-gold text-gunmetal shadow-[0_0_10px_rgba(244,208,63,0.3)]'
                                : 'bg-charcoal text-gray-400 hover:text-light border border-white/5 hover:border-gold/30'
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        title={project.data.title}
                        description={project.data.description}
                        tags={project.data.tags}
                        link={project.data.link}
                        image={project.data.image}
                        featured={project.data.featured}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    No projects found for this filter.
                </div>
            )}
        </div>
    );
};
