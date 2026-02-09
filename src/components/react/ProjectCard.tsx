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
            className={`group relative overflow-hidden rounded-2xl glass-card border border-white/5 hover:border-[#c08b5a]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(192,139,90,0.15)] hover:-translate-y-1 flex flex-col h-full ${featured ? "md:col-span-2" : ""}`}
        >
            {/* Noise Texture */}
            <div className="absolute inset-0 bento-noise opacity-10 pointer-events-none"></div>

            {/* Image / Gradient Placeholder */}
            <div className="h-48 overflow-hidden bg-gunmetal relative border-b border-white/5">
                {image ? (
                    <img
                        src={typeof image === "string" ? image : image.src}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
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
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-bold text-light group-hover:text-[#c08b5a] transition-colors">
                        {title}
                    </h3>
                    {featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] tracking-wider font-bold bg-[#c08b5a] text-gunmetal uppercase">
                            Featured
                        </span>
                    )}
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-400 border border-white/5 group-hover:border-[#c08b5a]/20 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
};
