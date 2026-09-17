/**
 * Pure prop -> class-string helpers for the ui/ primitives.
 * Kept dependency-free so they are unit-testable and shareable with the
 * React islands (ProjectCard, ProjectGrid, CertificationList).
 */

function cx(...parts: Array<string | false | undefined>): string {
    return parts.filter(Boolean).join(" ");
}

export type SectionTone = "base" | "subtle" | "surface";
export type SectionWidth = "prose" | "content" | "wide" | "full";
export type SectionSpace = "none" | "sm" | "md" | "lg";
export type SectionBackdrop = "none" | "grid" | "bloom";

const sectionToneClasses: Record<SectionTone, string> = {
    base: "bg-bg",
    subtle: "bg-bg-subtle",
    surface: "bg-surface",
};

const sectionWidthClasses: Record<SectionWidth, string> = {
    prose: "max-w-[68ch]",
    content: "max-w-4xl",
    wide: "max-w-6xl",
    full: "max-w-7xl",
};

const sectionSpaceClasses: Record<SectionSpace, string> = {
    none: "py-0",
    sm: "py-12",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32",
};

export function sectionClasses({
    tone = "base",
    space = "md",
    class: className,
}: {
    tone?: SectionTone;
    space?: SectionSpace;
    class?: string;
}): string {
    return cx(
        "relative",
        sectionToneClasses[tone],
        sectionSpaceClasses[space],
        className,
    );
}

export function sectionContainerClasses({
    width = "wide",
}: {
    width?: SectionWidth;
}): string {
    return cx(
        "relative mx-auto px-4 sm:px-6 lg:px-8",
        sectionWidthClasses[width],
    );
}

export type CardVariant = "glass" | "solid" | "outline" | "ghost" | "chip";
export type CardPad = "none" | "xs" | "sm" | "md" | "lg";
export type CardRadius = "sm" | "card" | "bento" | "panel" | "full";
export type CardLift = "none" | "y" | "x";

const cardVariantClasses: Record<CardVariant, string> = {
    glass: "glass",
    solid: "bg-surface border border-border",
    outline: "bg-transparent border border-border",
    ghost: "bg-transparent border border-transparent",
    chip: "bg-surface border border-border",
};

const cardPadClasses: Record<CardPad, string> = {
    none: "",
    xs: "p-3",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
};

const cardRadiusClasses: Record<CardRadius, string> = {
    sm: "rounded-lg",
    card: "rounded-card",
    bento: "rounded-bento",
    panel: "rounded-panel",
    full: "rounded-full",
};

const cardLiftClasses: Record<CardLift, string> = {
    none: "",
    y: "hover:-translate-y-1",
    x: "hover:translate-x-1",
};

export function cardClasses({
    variant = "glass",
    pad = "md",
    radius = "card",
    interactive = false,
    lift = "none",
    glow = false,
    noise = false,
    dashed = false,
    span,
    class: className,
}: {
    variant?: CardVariant;
    pad?: CardPad;
    radius?: CardRadius;
    interactive?: boolean;
    lift?: CardLift;
    glow?: boolean;
    noise?: boolean;
    dashed?: boolean;
    span?: string;
    class?: string;
}): string {
    return cx(
        "relative",
        cardVariantClasses[variant],
        cardPadClasses[pad],
        cardRadiusClasses[radius],
        interactive &&
            (variant === "glass"
                ? "glass-interactive cursor-pointer"
                : "cursor-pointer transition-colors hover:border-border-accent"),
        lift !== "none" && "transition-transform duration-300",
        cardLiftClasses[lift],
        glow && "glow-accent",
        noise && "noise",
        dashed && "border-dashed",
        span,
        className,
    );
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

const buttonVariantClasses: Record<ButtonVariant, string> = {
    primary: "bg-action text-action-fg hover:bg-action-hover",
    secondary:
        "bg-transparent border border-border-strong text-fg hover:border-border-accent hover:bg-surface",
    ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-surface",
    link: "bg-transparent text-accent hover:text-accent-hover underline-offset-4 hover:underline",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-3.5 text-base gap-2",
};

export function buttonClasses({
    variant = "primary",
    size = "md",
    full = false,
    class: className,
}: {
    variant?: ButtonVariant;
    size?: ButtonSize;
    full?: boolean;
    class?: string;
}): string {
    if (variant === "link") {
        return cx(
            "inline-flex items-center font-medium",
            buttonVariantClasses.link,
            full && "w-full justify-center",
            className,
        );
    }

    return cx(
        "inline-flex items-center justify-center rounded-card font-medium transition-colors duration-200 pointer-coarse:min-h-11 pointer-coarse:min-w-11",
        buttonVariantClasses[variant],
        buttonSizeClasses[size],
        full && "w-full",
        className,
    );
}

export type TagVariant = "neutral" | "accent" | "action" | "outline";
export type TagSize = "xs" | "sm";

const tagVariantClasses: Record<TagVariant, string> = {
    neutral: "bg-surface border border-border text-fg-muted",
    accent: "bg-accent-surface border border-transparent text-accent",
    action: "bg-action-surface border border-transparent text-action-text",
    outline: "bg-transparent border border-border text-fg-muted",
};

const tagSizeClasses: Record<TagSize, string> = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-3 py-1 text-sm",
};

export function tagClasses({
    variant = "neutral",
    size = "sm",
    class: className,
}: {
    variant?: TagVariant;
    size?: TagSize;
    class?: string;
}): string {
    return cx(
        "inline-flex items-center gap-1 rounded-full font-medium",
        tagVariantClasses[variant],
        tagSizeClasses[size],
        className,
    );
}
