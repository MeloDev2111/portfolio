import React from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    image?: string | { src: string; width: number; height: number };
    featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    link,
    image,
    featured,
}) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-xl bg-charcoal border border-white/5 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 flex flex-col h-full ${featured ? "md:col-span-2" : ""}`}
        >
            {/* Image / Gradient Placeholder */}
            <div className="h-48 overflow-hidden bg-gunmetal relative">
                {image ? (
                    <img
                        src={typeof image === "string" ? image : image.src}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-charcoal to-gunmetal flex items-center justify-center">
                        <span className="text-4xl">🚀</span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gunmetal/20 group-hover:bg-gunmetal/0 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-bold text-light group-hover:text-gold transition-colors">
                        {title}
                    </h3>
                    {featured && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-gold text-gunmetal">
                            FEATURED
                        </span>
                    )}
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 rounded bg-white/5 text-xs text-gray-300 border border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
};
