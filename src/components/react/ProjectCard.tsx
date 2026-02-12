import React from "react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    image?: string | { src: string; width: number; height: number };
    featured?: boolean;
    inProgress?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    link,
    image,
    featured,
    inProgress,
}) => {
    const Component = inProgress || !link ? "div" : "a";

    return (
        <Component
            href={!inProgress ? link : undefined}
            target={!inProgress && link ? "_blank" : undefined}
            rel={!inProgress && link ? "noopener noreferrer" : undefined}
            className={`group relative overflow-hidden rounded-2xl glass-card border border-white/5 transition-all duration-500 flex flex-col h-full ${
                !inProgress
                    ? "hover:border-[#c08b5a]/40 hover:shadow-[0_0_30px_rgba(192,139,90,0.15)] hover:-translate-y-1 cursor-pointer"
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
                        loading="lazy"
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

                {/* In Progress Overlay */}
                {inProgress && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-bold tracking-widest uppercase shadow-lg backdrop-blur-md">
                            🚧 In Construction
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-start mb-4 gap-2">
                    <h3
                        className={`text-xl font-heading font-bold text-light transition-colors ${!inProgress && "group-hover:text-[#c08b5a]"}`}
                    >
                        {title}
                    </h3>
                    <div className="flex flex-col gap-2 items-end">
                        {featured && !inProgress && (
                            <span className="px-2 py-0.5 rounded text-[10px] tracking-wider font-bold bg-[#c08b5a] text-gunmetal uppercase shadow-[0_0_10px_rgba(192,139,90,0.4)]">
                                Featured
                            </span>
                        )}
                    </div>
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
        </Component>
    );
};
