import React, { useState, useMemo } from "react";
import { cardClasses, buttonClasses } from "../ui/_variants";

interface Certification {
    id: string;
    data: {
        name: string;
        issuer: string;
        date: string;
        badge?: string;
        url?: string;
        starred?: boolean;
    };
}

interface CertificationListProps {
    certifications: Certification[];
    labels: {
        sortDesc: string;
        sortAsc: string;
        sortBy: string;
    };
}

export const CertificationList: React.FC<CertificationListProps> = ({
    certifications,
    labels,
}) => {
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

    const sortedCertifications = useMemo(() => {
        return [...certifications].sort((a, b) => {
            const dateA = new Date(a.data.date).getTime();
            const dateB = new Date(b.data.date).getTime();
            return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
        });
    }, [certifications, sortOrder]);

    return (
        <div className="space-y-8">
            {/* Controls */}
            <div className="flex justify-end items-center gap-4">
                <span className="text-fg-muted text-sm">{labels.sortBy}:</span>
                <div className="flex bg-surface rounded-lg p-1 border border-border-strong">
                    <button
                        onClick={() => setSortOrder("desc")}
                        className={buttonClasses({
                            variant: sortOrder === "desc" ? "primary" : "ghost",
                            size: "sm",
                        })}
                    >
                        {labels.sortDesc}
                    </button>
                    <button
                        onClick={() => setSortOrder("asc")}
                        className={buttonClasses({
                            variant: sortOrder === "asc" ? "primary" : "ghost",
                            size: "sm",
                        })}
                    >
                        {labels.sortAsc}
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedCertifications.map((cert) => (
                    <a
                        key={cert.id}
                        href={cert.data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cardClasses({
                            variant: "glass",
                            radius: "bento",
                            pad: "md",
                            interactive: true,
                            class: "group relative block h-full",
                        })}
                    >
                        {cert.data.starred && (
                            <div
                                className="absolute top-4 right-4 text-accent opacity-80 group-hover:opacity-100 transition-opacity"
                                title="Featured Certification"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                        <div className="flex items-start gap-4">
                            {cert.data.badge && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={cert.data.badge}
                                        alt={cert.data.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>
                            )}
                            <div className="flex-grow">
                                <h3 className="text-lg font-heading font-bold text-fg-strong group-hover:text-accent transition-colors line-clamp-2">
                                    {cert.data.name}
                                </h3>
                                <p className="text-sm text-fg-muted mt-1">
                                    {cert.data.issuer}
                                </p>
                                <p className="text-xs text-fg-muted mt-2">
                                    {cert.data.date}
                                </p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
