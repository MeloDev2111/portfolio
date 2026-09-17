import React, { useState, useRef, useEffect } from "react";
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
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const Component = inProgress || !link ? "div" : "a";

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

                <div
                    className="relative mb-6 flex-grow"
                    onMouseEnter={() => isTruncated && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <p
                        ref={textRef}
                        className="text-fg-muted text-sm line-clamp-3 leading-relaxed"
                    >
                        {description}
                    </p>

                    {/* Custom Tooltip */}
                    <div
                        className={`absolute bottom-full left-0 mb-2 w-full p-4 bg-surface-raised/98 backdrop-blur-xl border border-border-strong rounded-xl text-sm text-fg-muted shadow-2xl transition-all duration-300 z-50 origin-bottom leading-relaxed ${
                            showTooltip && isTruncated
                                ? "opacity-100 translate-y-0 scale-100 visible"
                                : "opacity-0 translate-y-4 scale-95 invisible pointer-events-none"
                        }`}
                    >
                        {description}
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-surface-raised/98 border-r border-b border-border-strong rotate-45 transform"></div>
                    </div>
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
