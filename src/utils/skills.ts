export interface Skill {
    name: string;
    category:
        | "Backend"
        | "Frontend"
        | "Cloud"
        | "DevOps"
        | "Database"
        | "Data Science"
        | "Other";
    icon: string; // Devicon URL (SVG)
    emoji: string;
    // Optional configuration for the Hero Bento "Core Stats" or other featured sections
    featured?: {
        inBento: boolean;
        colorClass: string; // Tailwind bg hover class
        borderClass: string; // Tailwind border hover class
    };
}

const DEVICON_BASE =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const SKILLS: Skill[] = [
    // Backend
    {
        name: "Java",
        category: "Backend",
        icon: `${DEVICON_BASE}/java/java-original.svg`,
        emoji: "☕",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#f89820]/20",
            borderClass: "group-hover:border-[#f89820]/40",
        },
    },
    {
        name: "Spring",
        category: "Backend",
        icon: `${DEVICON_BASE}/spring/spring-original.svg`,
        emoji: "🍃",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#6db33f]/20",
            borderClass: "group-hover:border-[#6db33f]/40",
        },
    },
    {
        name: "Python",
        category: "Backend",
        icon: `${DEVICON_BASE}/python/python-original.svg`,
        emoji: "🐍",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#3776AB]/20",
            borderClass: "group-hover:border-[#3776AB]/40",
        },
    },
    {
        name: "Node.js",
        category: "Backend",
        icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
        emoji: "🟢",
    },
    {
        name: "PHP",
        category: "Backend",
        icon: `${DEVICON_BASE}/php/php-original.svg`,
        emoji: "🟪",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#3776AB]/20",
            borderClass: "group-hover:border-[#3776AB]/40",
        },
    },

    // Cloud
    {
        name: "AWS",
        category: "Cloud",
        icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
        emoji: "🌩️",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },
    {
        name: "GCP",
        category: "Cloud",
        icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
        emoji: "☁️",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },

    // Frontend
    {
        name: "React",
        category: "Frontend",
        icon: `${DEVICON_BASE}/react/react-original.svg`,
        emoji: "⚛️",
    },
    {
        name: "Astro",
        category: "Frontend",
        icon: `${DEVICON_BASE}/astro/astro-original.svg`,
        emoji: "🚀",
    },
    {
        name: "Tailwind",
        category: "Frontend",
        icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
        emoji: "🎨",
    },
    {
        name: "TypeScript",
        category: "Frontend",
        icon: `${DEVICON_BASE}/typescript/typescript-original.svg`,
        emoji: "🔵",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },

    // Data Science
    {
        name: "Pandas",
        category: "Data Science",
        icon: `${DEVICON_BASE}/pandas/pandas-original.svg`,
        emoji: "🐼",
    },
    {
        name: "TensorFlow",
        category: "Data Science",
        icon: `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,
        emoji: "🧠",
    },
    {
        name: "Streamlit",
        category: "Data Science",
        icon: `${DEVICON_BASE}/streamlit/streamlit-original.svg`,
        emoji: "🌊",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },
    {
        name: "Jupyter Notebook",
        category: "Data Science",
        icon: `${DEVICON_BASE}/jupyter/jupyter-original.svg`,
        emoji: "📓",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },

    // DevOps
    {
        name: "Docker",
        category: "DevOps",
        icon: `${DEVICON_BASE}/docker/docker-original.svg`,
        emoji: "🐳",
    },
    {
        name: "Azure DevOps",
        category: "DevOps",
        icon: `${DEVICON_BASE}/azuredevops/azuredevops-original.svg`,
        emoji: "🔵",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },
    {
        name: "CI/CD",
        category: "DevOps",
        icon: `${DEVICON_BASE}/azuredevops/azuredevops-original.svg`,
        emoji: "🔄",
    },
    {
        name: "Git & GitHub",
        category: "DevOps",
        icon: `${DEVICON_BASE}/git/git-original.svg`,
        emoji: "🗄️",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },

    // Database
    {
        name: "PostgreSQL",
        category: "Database",
        icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
        emoji: "🐘",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40",
        },
    },
    {
        name: "SQL Server",
        category: "Database",
        icon: `${DEVICON_BASE}/sqlserver/sqlserver-original.svg`,
        emoji: "🗄️",
    },
    {
        name: "SQL",
        category: "Database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        emoji: "🗃️",
    },
];

// Helpers
export const getBentoSkills = () => SKILLS.filter((s) => s.featured?.inBento);
export const getSkillsByCategory = (category: string) =>
    SKILLS.filter((s) => s.category === category);
export const getAllCategories = () =>
    Array.from(new Set(SKILLS.map((s) => s.category)));

// Configuration Constants
export const ALL_CATEGORIES = [
    { name: "Backend", featured: true },
    { name: "Frontend", featured: false },
    { name: "Cloud", featured: true },
    { name: "Data Science", featured: true },
    { name: "DevOps", featured: false },
    { name: "Database", featured: false },
] as const;

export const HOME_CATEGORIES = ALL_CATEGORIES.filter((c) => c.featured).map(
    (c) => c.name,
);

export const ALL_CATEGORY_NAMES = ALL_CATEGORIES.map((c) => c.name);
