import React, { useState, useRef, useEffect } from "react";

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
                        loading="eager"
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
            <div className="p-6 flex flex-col flex-grow relative z-30">
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

                <div
                    className="relative mb-6 flex-grow"
                    onMouseEnter={() => isTruncated && setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    <p
                        ref={textRef}
                        className="text-gray-400 text-sm line-clamp-3 leading-relaxed"
                    >
                        {description}
                    </p>

                    {/* Custom Tooltip */}
                    <div
                        className={`absolute bottom-full left-0 mb-2 w-full p-4 bg-[#1a1f2e]/98 backdrop-blur-xl border border-white/10 rounded-xl text-sm text-gray-300 shadow-2xl transition-all duration-300 z-50 origin-bottom leading-relaxed ${
                            showTooltip && isTruncated
                                ? "opacity-100 translate-y-0 scale-100 visible"
                                : "opacity-0 translate-y-4 scale-95 invisible pointer-events-none"
                        }`}
                    >
                        {description}
                        {/* Arrow */}
                        <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1a1f2e]/98 border-r border-b border-white/10 rotate-45 transform"></div>
                    </div>
                </div>

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
