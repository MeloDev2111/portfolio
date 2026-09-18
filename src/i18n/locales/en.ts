export const en = {
    "nav.projects": "Projects",
    "nav.tech": "Tech Stack",
    "nav.certifications": "Certifications",
    "nav.experience": "Experience",
    "nav.experienceKey": "Work History & Impact",
    "nav.language": "Language",
    "nav.langName": "English",
    "nav.contact": "Contact",
    "nav.blog": "Blog",
    "nav.menu": "Menu",
    "hero.cta": "Download CV",
    "hero.greeting": "Hi, I'm",
    "hero.currentRole": "Currently At",
    "hero.description":
        "Specializing in high-scalability platforms, Cloud solutions, and robust software architectures.",
    "hero.viewProjects": "View Projects",
    "section.viewAllCerts": "View all certifications ->",
    "section.viewAllProjects": "View all projects archive",
    "section.viewFullTech": "View full tech stack ->",
    "section.viewFullExperience": "View Full Experience",
    "section.downloadResume": "Download PDF Resume",
    "ui.professional": "Professional",
    "ui.current": "Present",
    "ui.all": "All",
    "ui.filterBy": "Filter by",
    "ui.more": "More",
    "ui.noProjects": "No projects found for this filter.",
    "ui.sortBy": "Sort by Date",
    "ui.sortDesc": "Newest",
    "ui.sortAsc": "Oldest",
    "page.techStackTitle": "Full Technology Stack",
    "page.techStackDescription":
        "A comprehensive overview of the tools, languages, and frameworks I use to build robust digital solutions.",
    "page.projectsDescription":
        "A showcase of my technical projects, featuring scalable backend architectures and full-stack applications.",
    "page.certificationsDescription":
        "Professional certifications and achievements validating my technical expertise.",
    "404.title": "Page Not Found",
    "404.description":
        "The page you are looking for doesn't exist or has been moved.",
    "404.button": "Back to Home",
    "404.unsupportedLang":
        "The requested language is not supported. Redirecting to English version...",
    "footer.copyright": "© 2026 MeloDev. All rights reserved.",
    "aria.page": "page",
    "aria.toggleTheme": "Toggle theme",
    "aria.backToTop": "Back to top",
    "hero.latestAchievement": "Latest Achievement",
    "credly.verified": "Verified Credentials",
    "credly.description":
        "Verify all my digital badges and certifications directly on Credly.",
    "credly.viewProfile": "View Profile",
    "toast.title": "Language Not Supported",
    "toast.prefix": "Content is not available in",
    "toast.suffix": "yet. Showing English version.",
    "proof.remote": "Remote-friendly",
    "cta.title": "Let's build something great",
    "cta.description":
        "Open to new backend, cloud and data opportunities. Reach out or grab a copy of my resume.",
    "cta.schedule": "Schedule a call",
} as const;

export type UIStrings = typeof en;
export type UIKey = keyof UIStrings;
