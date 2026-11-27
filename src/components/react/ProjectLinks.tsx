import React from "react";

export interface ProjectLinkLabels {
    demo: string;
    code: string;
    site: string;
}

export interface ProjectLinkItem {
    kind: "demo" | "code" | "site";
    href: string;
    label: string;
}

const isRepoUrl = (url: string) => /github\.com|gitlab\.com/.test(url);

/**
 * Ordered destinations of a project: the running demo first, then the code
 * (or the public site when the main link is not a repository).
 */
export function getProjectLinks(
    labels: ProjectLinkLabels,
    link?: string,
    demo?: string,
): ProjectLinkItem[] {
    const items: ProjectLinkItem[] = [];
    if (demo) items.push({ kind: "demo", href: demo, label: labels.demo });
    if (link && link !== demo) {
        const repo = isRepoUrl(link);
        items.push({
            kind: repo ? "code" : "site",
            href: link,
            label: repo ? labels.code : labels.site,
        });
    }
    return items;
}

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"
        />
    </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
        />
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="9.5" />
        <path d="M2.5 12h19M12 2.5c2.5 2.6 3.8 5.8 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-5.8-3.8-9.5S9.5 5.1 12 2.5Z" />
    </svg>
);

export const LinkIcon: React.FC<{
    kind: ProjectLinkItem["kind"];
    className?: string;
}> = ({ kind, className }) =>
    kind === "demo" ? (
        <PlayIcon className={className} />
    ) : kind === "code" ? (
        <GitHubIcon className={className} />
    ) : (
        <GlobeIcon className={className} />
    );

/** Small icon-only buttons, used in the list view. */
export const ProjectLinkButtons: React.FC<{ items: ProjectLinkItem[] }> = ({
    items,
}) => (
    <div className="flex items-center gap-2">
        {items.map((item) => (
            <a
                key={item.kind}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className={`grid place-items-center w-10 h-10 rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moon ${
                    item.kind === "demo"
                        ? "bg-moon text-gunmetal border-moon hover:shadow-[0_0_14px_color-mix(in_srgb,var(--color-moon)_50%,transparent)]"
                        : "border-white/10 text-gray-300 hover:text-moon hover:border-moon/50"
                }`}
            >
                <LinkIcon
                    kind={item.kind}
                    className={
                        item.kind === "demo" ? "w-3.5 h-3.5 ml-0.5" : "w-4 h-4"
                    }
                />
            </a>
        ))}
    </div>
);
