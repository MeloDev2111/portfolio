export interface SocialLink {
    name: string;
    url: string;
    icon: string; // SVG path or full SVG string
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
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.08.38-1.98 1.02-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.68 0 3.84-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>',
        label: "Check Code",
        colorClass: "hover:text-white",
        isPrimary: true,
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/melio-diaz-diaz/",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.22-.44-1.86-1.48-1.86-1.09 0-1.62.74-1.9 1.5V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.92 0 3.3.69 3.65 2.87z"/></svg>',
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
        colorClass: "hover:text-yellow-500",
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
        icon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-full h-full"><title>LeetCode</title><path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.345 1.492 3.87 1.492 1.527 0 2.875-.519 3.868-1.492l2.609-2.607c.514-.516.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038zM14.6 22.06c1.1-1.1 1.7-2.62 1.7-4.14a5.9 5.9 0 0 0-1.7-4.22L12.5 11.6c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l2 2.1c.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0L8.2 15.8c-1.1-1.1-1.7-2.61-1.7-4.13s.6-2.99 1.7-4.1a5.8 5.8 0 0 1 4.2-1.7h.1l3.5.01c.6 0 1.1-.4 1.1-1s-.5-1-1.1-1l-3.5-.01a7.8 7.8 0 0 0-5.6 2.3 8 8 0 0 0-2.3 5.6c0 2.08.8 4 2.3 5.6l2.1 2.1c1.2 1.2 2.7 1.8 4.3 1.8s3.1-.6 4.3-1.8l2.1-2.1c1.2-1.2 3.1-4.7 3.1-7.8 0-3.3-1.6-6-4.3-7.5-.5-.3-.6-1-.4-1.5s1-.6 1.5-.4c3.4 1.8 5.2 5.1 5.2 8.7 0 3.8-2.3 7.6-3.8 9.1l-2.1 2.1c-1.2 1.2-2.7 1.8-4.3 1.8s-3.1-.6-4.3-1.8z"/></svg>',
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
