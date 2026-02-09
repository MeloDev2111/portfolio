export interface SocialLink {
    name: string;
    url: string;
    icon: string;
    label?: string; // Short label for hero card (e.g. "Check Code")
    colorClass?: string;
    isPrimary?: boolean; // True for GitHub/LinkedIn (Large cards)
    disabled?: boolean;
}

/**
 * Central configuration for all user social profiles and links.
 * Use this to add, remove, or modify social links across the site.
 */
export const USER_SOCIALS: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/MeloDev2111",
        icon: "🐙",
        label: "Check Code",
        colorClass: "hover:text-white",
        isPrimary: true,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/melio-diaz-diaz/",
        icon: "💼",
        label: "Connect",
        colorClass: "hover:text-blue-400",
        isPrimary: true,
    },
    {
        name: "Credly",
        url: "https://www.credly.com/users/melio-josue-diaz-diaz",
        icon: "🏅",
        label: "Verify",
        colorClass: "hover:text-orange-400",
    },
    {
        name: "Codewars",
        url: "https://www.codewars.com/users/MeloDev",
        icon: "⚔️",
        label: "Challenges",
        colorClass: "hover:text-red-500",
    },
    {
        name: "Google Dev",
        url: "https://g.dev/MeloDev",
        icon: "G",
        label: "Profile",
        colorClass: "hover:text-green-500",
    },
    {
        name: "Microsoft Learn",
        url: "https://learn.microsoft.com/es-es/users/melodev/",
        icon: "M",
        label: "Profile",
        colorClass: "hover:text-blue-500",
        disabled: true,
    },
    {
        name: "LeetCode",
        url: "#",
        icon: "⚡",
        label: "DSA",
        colorClass: "hover:text-yellow-500",
        disabled: true,
    },
    {
        name: "X (Twitter)",
        url: "#",
        icon: "🐦",
        label: "Follow",
        colorClass: "hover:text-blue-400",
        disabled: true,
    },
];

// Helper to separate primary from secondary links
export const getPrimarySocials = () =>
    USER_SOCIALS.filter((s) => s.isPrimary && !s.disabled);
export const getSecondarySocials = () =>
    USER_SOCIALS.filter((s) => !s.isPrimary && !s.disabled);
export const getAllActiveSocials = () =>
    USER_SOCIALS.filter((s) => !s.disabled);
