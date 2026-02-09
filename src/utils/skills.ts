export interface Skill {
    name: string;
    category: "Backend" | "Frontend" | "Cloud" | "DevOps" | "Database" | "Data Science" | "Other";
    icon: string; // Devicon URL (SVG)
    emoji: string;
    // Optional configuration for the Hero Bento "Core Stats" or other featured sections
    featured?: {
        inBento: boolean;
        colorClass: string; // Tailwind bg hover class
        borderClass: string; // Tailwind border hover class
    };
}

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

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
            borderClass: "group-hover:border-[#f89820]/40"
        }
    },
    {
        name: "Spring",
        category: "Backend",
        icon: `${DEVICON_BASE}/spring/spring-original.svg`,
        emoji: "🍃",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#6db33f]/20",
            borderClass: "group-hover:border-[#6db33f]/40"
        }
    },
    {
        name: "Node.js",
        category: "Backend",
        icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
        emoji: "🟢"
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
            borderClass: "group-hover:border-[#FF9900]/40"
        }
    },
    {
        name: "GCP",
        category: "Cloud",
        icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg`,
        emoji: "☁️",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#FF9900]/20",
            borderClass: "group-hover:border-[#FF9900]/40"
        }
    },

    // Frontend
    {
        name: "React",
        category: "Frontend",
        icon: `${DEVICON_BASE}/react/react-original.svg`,
        emoji: "⚛️"
    },
    {
        name: "Astro",
        category: "Frontend",
        icon: `${DEVICON_BASE}/astro/astro-original.svg`,
        emoji: "🚀"
    },
    {
        name: "Tailwind",
        category: "Frontend",
        icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`,
        emoji: "🎨"
    },

    // Data Science
    {
        name: "Python",
        category: "Data Science",
        icon: `${DEVICON_BASE}/python/python-original.svg`,
        emoji: "🐍",
        featured: {
            inBento: true,
            colorClass: "group-hover:bg-[#3776AB]/20",
            borderClass: "group-hover:border-[#3776AB]/40"
        }
    },
    {
        name: "Pandas",
        category: "Data Science",
        icon: `${DEVICON_BASE}/pandas/pandas-original.svg`,
        emoji: "🐼"
    },
    {
        name: "TensorFlow",
        category: "Data Science",
        icon: `${DEVICON_BASE}/tensorflow/tensorflow-original.svg`,
        emoji: "🧠"
    },

    // DevOps
    {
        name: "Docker",
        category: "DevOps",
        icon: `${DEVICON_BASE}/docker/docker-original.svg`,
        emoji: "🐳"
    },
    {
        name: "Kubernetes",
        category: "DevOps",
        icon: `${DEVICON_BASE}/kubernetes/kubernetes-original.svg`,
        emoji: "☸️"
    },

    // Database
    {
        name: "PostgreSQL",
        category: "Database",
        icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
        emoji: "🐘"
    },
    {
        name: "SQL",
        category: "Database",
        // Generic SQL icon or MySQL/etc if specific. Using generic or a placeholder if Devicon doesn't have "SQL".
        // Devicon has mysql, postgresql, etc. Let's use a generic database icon or just Azure SQL/Microsoft SQL logic if intended.
        // Detailed check: Devicon usually has "azuresqldatabase" or similar. For now, I'll use a generic SVG or reusing PostgreSQL for demo if SQL is generic.
        // Actually, let's use mysql as a proxy or just the emoji for now if SVG is problematic.
        // I will use a generic database SVG from a reliable source or just map it to something common.
        // Let's assume standard SQL via a generic icon or a placeholder.
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
        emoji: "🗃️"
    }
];

// Helpers
export const getBentoSkills = () => SKILLS.filter(s => s.featured?.inBento);
export const getSkillsByCategory = (category: string) => SKILLS.filter(s => s.category === category);
export const getAllCategories = () => Array.from(new Set(SKILLS.map(s => s.category)));
