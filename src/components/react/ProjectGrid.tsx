import React, { useState, useMemo, useEffect, useRef } from "react";
import { ProjectCard, type ProjectCardLabels } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";

interface Project {
    id: string;
    data: {
        title: string;
        description: string;
        tags: string | string[]; // Allow string input
        link?: string;
        demo?: string;
        year?: number;
        image?: string | { src: string; width: number; height: number };
        featured?: boolean;
        inProgress?: boolean;
    };
}

type ViewMode = "grid" | "list";

interface ProjectGridProps {
    projects: Project[];
    labels: {
        all: string;
        more: string;
        noProjects: string;
        clearFilters: string;
        search: string;
        searchTech: string;
        tech: string;
        viewGrid: string;
        viewList: string;
        count: string; // "{n} projects"
        card: ProjectCardLabels;
    };
}

/** How many technologies are shown inline; the rest live in the "+N" panel. */
const TOP_TAGS = 8;
const VIEW_KEY = "projects:view";

const getSafeTags = (tags: unknown): string[] => {
    if (typeof tags === "string") return tags.split(",");
    if (Array.isArray(tags))
        return tags.filter((t): t is string => typeof t === "string");
    return [];
};

const normalize = (text: string) =>
    text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const GridIcon = () => (
    <svg
        aria-hidden="true"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
    >
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
);

const ListIcon = () => (
    <svg
        aria-hidden="true"
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
    >
        <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
    </svg>
);

const SearchIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
    >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
    </svg>
);

export const ProjectGrid: React.FC<ProjectGridProps> = ({
    projects,
    labels,
}) => {
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [view, setView] = useState<ViewMode>("grid");
    const [panelOpen, setPanelOpen] = useState(false);
    const [tagQuery, setTagQuery] = useState("");
    const panelRef = useRef<HTMLDivElement>(null);

    // Restore the last view the visitor chose.
    useEffect(() => {
        const saved = localStorage.getItem(VIEW_KEY);
        if (saved === "grid" || saved === "list") setView(saved);
    }, []);

    const changeView = (next: ViewMode) => {
        setView(next);
        localStorage.setItem(VIEW_KEY, next);
    };

    // Close the technologies panel on outside click or Escape.
    useEffect(() => {
        if (!panelOpen) return;
        const onPointer = (e: PointerEvent) => {
            if (!panelRef.current?.contains(e.target as Node))
                setPanelOpen(false);
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setPanelOpen(false);
        };
        document.addEventListener("pointerdown", onPointer);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onPointer);
            document.removeEventListener("keydown", onKey);
        };
    }, [panelOpen]);

    const normalizedProjects = useMemo(
        () =>
            (projects ?? []).map((p) => {
                const safeTags = getSafeTags(p.data.tags);
                return {
                    ...p,
                    safeTags,
                    haystack: normalize(
                        [p.data.title, p.data.description, ...safeTags].join(
                            " ",
                        ),
                    ),
                };
            }),
        [projects],
    );

    // Technologies ranked by how many projects use them.
    const rankedTags = useMemo(() => {
        const counts = new Map<string, number>();
        normalizedProjects.forEach((p) =>
            p.safeTags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1)),
        );
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([tag, count]) => ({ tag, count }));
    }, [normalizedProjects]);

    const topTags = rankedTags.slice(0, TOP_TAGS).map((t) => t.tag);
    const restTags = rankedTags
        .slice(TOP_TAGS)
        .sort((a, b) => a.tag.localeCompare(b.tag));
    // Selected technologies from the panel also show inline, so they can be removed.
    const inlineTags = [
        ...topTags,
        ...activeTags.filter((t) => !topTags.includes(t)),
    ];
    const hiddenActive = activeTags.filter((t) => !topTags.includes(t)).length;

    const filteredProjects = useMemo(() => {
        const q = normalize(query.trim());
        return normalizedProjects.filter(
            (p) =>
                activeTags.every((tag) => p.safeTags.includes(tag)) &&
                (!q || p.haystack.includes(q)),
        );
    }, [normalizedProjects, activeTags, query]);

    // Technologies that still match at least one visible project (AND filter).
    const availableTags = useMemo(() => {
        const set = new Set<string>();
        filteredProjects.forEach((p) => p.safeTags.forEach((t) => set.add(t)));
        return set;
    }, [filteredProjects]);

    const toggleTag = (tag: string) =>
        setActiveTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
        );

    const clearAll = () => {
        setActiveTags([]);
        setQuery("");
    };

    const hasFilters = activeTags.length > 0 || query.trim() !== "";

    const chipClass = (selected: boolean, available: boolean) =>
        `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 select-none ${
            selected
                ? "bg-moon text-gunmetal font-semibold shadow-[0_0_12px_color-mix(in_srgb,var(--color-moon)_35%,transparent)] cursor-pointer"
                : available
                  ? "bg-charcoal/60 text-gray-300 border border-white/10 hover:text-white hover:border-moon/40 cursor-pointer"
                  : "bg-charcoal/30 text-gray-600 border border-white/5 opacity-40 cursor-not-allowed"
        }`;

    const panelTags = restTags.filter((t) =>
        normalize(t.tag).includes(normalize(tagQuery.trim())),
    );

    return (
        <div className="space-y-8">
            {/* Toolbar */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                    <label className="relative flex-1 min-w-[14rem] max-w-md">
                        <span className="sr-only">{labels.search}</span>
                        <SearchIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={labels.search}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal/60 border border-white/10 text-sm text-light placeholder:text-gray-500 transition-colors focus:outline-none focus:border-moon/60 focus:bg-charcoal"
                        />
                    </label>

                    <div className="ml-auto flex items-center gap-4">
                        <span
                            className="text-sm text-gray-400 tabular-nums"
                            aria-live="polite"
                        >
                            {labels.count.replace(
                                "{n}",
                                String(filteredProjects.length),
                            )}
                        </span>
                        <div
                            role="radiogroup"
                            aria-label={`${labels.viewGrid} / ${labels.viewList}`}
                            className="relative flex p-1 rounded-xl bg-charcoal/60 border border-white/10"
                        >
                            <span
                                aria-hidden="true"
                                className={`absolute top-1 bottom-1 left-1 w-9 rounded-lg bg-moon motion-safe:transition-transform motion-safe:duration-300 ${
                                    view === "list" ? "translate-x-9" : ""
                                }`}
                            />
                            {(
                                [
                                    [
                                        "grid",
                                        labels.viewGrid,
                                        <GridIcon key="g" />,
                                    ],
                                    [
                                        "list",
                                        labels.viewList,
                                        <ListIcon key="l" />,
                                    ],
                                ] as const
                            ).map(([mode, label, icon]) => (
                                <button
                                    key={mode}
                                    type="button"
                                    role="radio"
                                    aria-checked={view === mode}
                                    aria-label={label}
                                    title={label}
                                    onClick={() => changeView(mode)}
                                    className={`relative z-10 grid place-items-center w-9 h-8 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-moon ${
                                        view === mode
                                            ? "text-gunmetal"
                                            : "text-gray-400 hover:text-light cursor-pointer"
                                    }`}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technologies */}
                <div className="flex items-center gap-2 overflow-x-auto md:flex-wrap md:overflow-visible pb-1 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none]">
                    <button
                        type="button"
                        onClick={() => setActiveTags([])}
                        aria-pressed={activeTags.length === 0}
                        className={chipClass(activeTags.length === 0, true)}
                    >
                        {labels.all}
                    </button>
                    {inlineTags.map((tag) => {
                        const selected = activeTags.includes(tag);
                        const available = selected || availableTags.has(tag);
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => available && toggleTag(tag)}
                                disabled={!available}
                                aria-pressed={selected}
                                className={chipClass(selected, available)}
                            >
                                {tag}
                                {selected && (
                                    <span
                                        aria-hidden="true"
                                        className="text-xs opacity-70"
                                    >
                                        ✕
                                    </span>
                                )}
                            </button>
                        );
                    })}

                    {restTags.length > 0 && (
                        <div ref={panelRef} className="md:relative">
                            <button
                                type="button"
                                onClick={() => setPanelOpen((o) => !o)}
                                aria-expanded={panelOpen}
                                aria-haspopup="dialog"
                                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border border-dashed transition-colors cursor-pointer ${
                                    panelOpen || hiddenActive > 0
                                        ? "border-moon/60 text-moon"
                                        : "border-white/20 text-gray-400 hover:text-light hover:border-moon/40"
                                }`}
                            >
                                +{restTags.length} {labels.more}
                                <svg
                                    aria-hidden="true"
                                    className={`w-3.5 h-3.5 motion-safe:transition-transform ${panelOpen ? "rotate-180" : ""}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {panelOpen && (
                                <div
                                    role="dialog"
                                    aria-label={labels.tech}
                                    className="absolute z-50 left-4 right-4 md:left-0 md:right-auto mt-2 md:w-80 p-3 rounded-2xl bg-gunmetal/95 backdrop-blur-xl border border-white/10 shadow-2xl"
                                >
                                    <label className="relative block mb-3">
                                        <span className="sr-only">
                                            {labels.searchTech}
                                        </span>
                                        <SearchIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="search"
                                            autoFocus
                                            value={tagQuery}
                                            onChange={(e) =>
                                                setTagQuery(e.target.value)
                                            }
                                            placeholder={labels.searchTech}
                                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-charcoal/70 border border-white/10 text-sm text-light placeholder:text-gray-500 focus:outline-none focus:border-moon/60"
                                        />
                                    </label>
                                    <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
                                        {panelTags.map(({ tag, count }) => {
                                            const selected =
                                                activeTags.includes(tag);
                                            const available =
                                                selected ||
                                                availableTags.has(tag);
                                            return (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() =>
                                                        available &&
                                                        toggleTag(tag)
                                                    }
                                                    disabled={!available}
                                                    aria-pressed={selected}
                                                    className={`${chipClass(selected, available)} !px-3 !py-1 !text-xs`}
                                                >
                                                    {tag}
                                                    <span className="opacity-50 tabular-nums">
                                                        {count}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="ml-1 text-sm text-gray-400 hover:text-moon underline-offset-4 hover:underline whitespace-nowrap cursor-pointer"
                        >
                            {labels.clearFilters}
                        </button>
                    )}
                </div>
            </div>

            {/* Results */}
            {view === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            title={project.data.title}
                            description={project.data.description}
                            tags={project.safeTags}
                            link={project.data.link}
                            demo={project.data.demo}
                            image={project.data.image}
                            featured={project.data.featured}
                            inProgress={project.data.inProgress}
                            priority={index < 3}
                            labels={labels.card}
                        />
                    ))}
                </div>
            ) : filteredProjects.length > 0 ? (
                <div className="rounded-2xl glass-card border border-white/5 p-2 divide-y divide-white/5">
                    {filteredProjects.map((project) => (
                        <ProjectRow
                            key={project.id}
                            title={project.data.title}
                            description={project.data.description}
                            tags={project.safeTags}
                            link={project.data.link}
                            demo={project.data.demo}
                            image={project.data.image}
                            year={project.data.year}
                            inProgress={project.data.inProgress}
                            labels={labels.card}
                        />
                    ))}
                </div>
            ) : null}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-4">
                    <p>{labels.noProjects}</p>
                    <button
                        type="button"
                        onClick={clearAll}
                        className="text-moon hover:underline cursor-pointer"
                    >
                        {labels.clearFilters}
                    </button>
                </div>
            )}
        </div>
    );
};
