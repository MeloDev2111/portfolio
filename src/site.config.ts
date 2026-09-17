import { LINKEDIN_URL } from "./utils/social";

export interface NavItem {
    key: string;
    path: string;
    enabled?: boolean;
    cta?: boolean;
}

// Home no longer has #about/#experience/#certifications/#tech-stack anchors,
// so this is a list of real pages, not hash links.
export const nav: NavItem[] = [
    { key: "nav.experience", path: "/experience" },
    { key: "nav.projects", path: "/projects" },
    { key: "nav.certifications", path: "/certifications" },
    { key: "nav.tech", path: "/tech-stack" },
    { key: "nav.blog", path: "/blog", enabled: false },
    { key: "nav.contact", path: "/contact", enabled: false, cta: true },
];

export const siteConfig = {
    name: "Melio Diaz",
    alias: "MeloDev",
    role: "Software Engineer",
    title: "Software Engineer & Data Enthusiast",
    description:
        "Personal portfolio of Melio Diaz (MeloDev), a Systems Engineer specializing in High-Scalability Platforms, Cloud Computing, and Software Architecture.",
    // Proper noun, not translated.
    location: "Lima, Perú",
    // Contact providers for CTASection. `calendly`/`email` are unset until
    // those channels exist; the section renders only what is present.
    contact: {
        calendly: null as string | null,
        email: null as string | null,
        linkedin: LINKEDIN_URL,
    },
    // Default OG Image (1200x630 PNG, relative to public/)
    ogImage: "/media/og-image.png",
};
