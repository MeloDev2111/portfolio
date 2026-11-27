/**
 * Closed vocabulary for project tags. Tags are technologies a recruiter would
 * filter by, not topics: the description already covers the domain. Keep each
 * project to the 2-5 that matter most, and add a new tag here only when a real
 * project needs it (tests/project-tags.test.ts enforces this list).
 */
export const PROJECT_TAGS = [
    // Languages and runtimes
    "Java",
    "Python",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "PHP",
    "SQL",
    // Frameworks
    "Spring Boot",
    "Laravel",
    "React",
    "Astro",
    "Tailwind CSS",
    // Data, cloud and AI
    "PostgreSQL",
    "Pandas",
    "Machine Learning",
    "AWS",
    "AI Agents",
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];

export const MAX_PROJECT_TAGS = 5;
