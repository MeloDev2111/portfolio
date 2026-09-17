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
        brand: string; // Raw brand hex — exempt from the no-raw-hex rule (see AGENTS.md)
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
            brand: "#E71D36",
        },
    },
    {
        name: "Spring",
        category: "Backend",
        icon: `${DEVICON_BASE}/spring/spring-original.svg`,
        emoji: "🍃",
        featured: {
            inBento: true,
            brand: "#6db33f",
        },
    },
    {
        name: "Python",
        category: "Backend",
        icon: `${DEVICON_BASE}/python/python-original.svg`,
        emoji: "🐍",
        featured: {
            inBento: true,
            brand: "#3776AB",
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
            brand: "#777BB4",
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
            brand: "#f89820",
        },
    },
    {
        name: "GCP",
        category: "Cloud",
        icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
        emoji: "☁️",
        featured: {
            inBento: true,
            brand: "#4285F4",
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
            brand: "#3178C6",
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
            brand: "#FF4B4B",
        },
    },
    {
        name: "Jupyter Notebook",
        category: "Data Science",
        icon: `${DEVICON_BASE}/jupyter/jupyter-original.svg`,
        emoji: "📓",
        featured: {
            inBento: true,
            brand: "#F37626",
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
            brand: "#0078D7",
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
            brand: "#F05032",
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
            brand: "#336791",
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
            brand: "#47A248",
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
