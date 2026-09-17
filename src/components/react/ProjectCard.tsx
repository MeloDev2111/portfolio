import React from "react";
import { cardClasses, tagClasses } from "../ui/_variants";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    image?: string | { src: string; width: number; height: number };
    featured?: boolean;
    inProgress?: boolean;
    priority?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    tags,
    link,
    image,
    featured,
    inProgress,
    priority = false,
}) => {
    const Component = inProgress || !link ? "div" : "a";

    return (
        <Component
            href={!inProgress ? link : undefined}
            target={!inProgress && link ? "_blank" : undefined}
            rel={!inProgress && link ? "noopener noreferrer" : undefined}
            className={cardClasses({
                variant: "glass",
                radius: "bento",
                pad: "none",
                interactive: !inProgress,
                glow: !!(featured && !inProgress),
                noise: true,
                class: `group flex h-full flex-col ${
                    inProgress ? "opacity-80 cursor-default" : "cursor-pointer"
                }`,
            })}
        >
            {/* Image / Gradient Placeholder */}
            <div className="h-48 overflow-hidden bg-surface-sunken relative border-b border-border">
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
                    <div className="w-full h-full bg-gradient-to-br from-surface to-surface-sunken flex items-center justify-center">
                        <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">
                            🚀
                        </span>
                    </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-bg/20 group-hover:bg-bg/0 transition-colors duration-300" />

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
            <div className="p-6 flex flex-col flex-grow relative z-30">
                <div className="flex justify-between items-start mb-4 gap-2">
                    <h3
                        className={`text-xl font-heading font-bold text-fg-strong transition-colors ${!inProgress && "group-hover:text-accent"}`}
                    >
                        {title}
                    </h3>
                    <div className="flex flex-col gap-2 items-end">
                        {featured && !inProgress && (
                            <span
                                className={tagClasses({
                                    variant: "accent",
                                    size: "xs",
                                    class: "tracking-wider uppercase",
                                })}
                            >
                                Featured
                            </span>
                        )}
                    </div>
                </div>

                <div className="relative mb-6 flex-grow">
                    <p className="text-fg-muted text-sm line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className={tagClasses({
                                variant: "neutral",
                                size: "sm",
                                class: "group-hover:border-border-accent transition-colors",
                            })}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Component>
    );
};
