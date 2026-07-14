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
            colorClass: "group-hover/icon:bg-[#E71D36]/20",
            borderClass: "group-hover/icon:border-[#E71D36]/40",
        },
    },
    {
        name: "Spring",
        category: "Backend",
        icon: `${DEVICON_BASE}/spring/spring-original.svg`,
        emoji: "🍃",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#6db33f]/20",
            borderClass: "group-hover/icon:border-[#6db33f]/40",
        },
    },
    {
        name: "Python",
        category: "Backend",
        icon: `${DEVICON_BASE}/python/python-original.svg`,
        emoji: "🐍",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#3776AB]/20",
            borderClass: "group-hover/icon:border-[#3776AB]/40",
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
            colorClass: "group-hover/icon:bg-[#777BB4]/20",
            borderClass: "group-hover/icon:border-[#777BB4]/40",
        },
    },
    {
        name: "Apache Kafka",
        category: "Backend",
        icon: `${DEVICON_BASE}/apachekafka/apachekafka-original.svg`,
        emoji: "📡",
    },

    // Cloud
    {
        name: "AWS",
        category: "Cloud",
        icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
        emoji: "🌩️",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#f89820]/20",
            borderClass: "group-hover/icon:border-[#f89820]/40",
        },
    },
    {
        name: "GCP",
        category: "Cloud",
        icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
        emoji: "☁️",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#4285F4]/20",
            borderClass: "group-hover/icon:border-[#4285F4]/40",
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
            colorClass: "group-hover/icon:bg-[#3178C6]/20",
            borderClass: "group-hover/icon:border-[#3178C6]/40",
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
            colorClass: "group-hover/icon:bg-[#FF4B4B]/20",
            borderClass: "group-hover/icon:border-[#FF4B4B]/40",
        },
    },
    {
        name: "Jupyter Notebook",
        category: "Data Science",
        icon: `${DEVICON_BASE}/jupyter/jupyter-original.svg`,
        emoji: "📓",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#F37626]/20",
            borderClass: "group-hover/icon:border-[#F37626]/40",
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
            colorClass: "group-hover/icon:bg-[#0078D7]/20",
            borderClass: "group-hover/icon:border-[#0078D7]/40",
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
            colorClass: "group-hover/icon:bg-[#F05032]/20",
            borderClass: "group-hover/icon:border-[#F05032]/40",
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
            colorClass: "group-hover/icon:bg-[#336791]/20",
            borderClass: "group-hover/icon:border-[#336791]/40",
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
    {
        name: "Redis",
        category: "Database",
        icon: `${DEVICON_BASE}/redis/redis-original.svg`,
        emoji: "⚡",
    },
    {
        name: "MongoDB",
        category: "Database",
        icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
        emoji: "🍃",
        featured: {
            inBento: true,
            colorClass: "group-hover/icon:bg-[#47A248]/20",
            borderClass: "group-hover/icon:border-[#47A248]/40",
        },
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
