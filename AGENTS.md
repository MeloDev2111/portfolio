# 🤖 AGENT.md: Project Context & Guidelines

> **Note to AI Agents:** This file serves as the primary source of truth for the project's architecture, philosophy, and development standards. Always consult this file before making major architectural decisions.

## 1. 🎯 Project Philosophy & Goals

- **Objective:** Create a high-performance personal portfolio to consolidate professional branding for a Systems Engineer specializing in Backend (Java/Spring), Cloud (AWS), and Data Science.
- **Target Audience:** Technical recruiters (EdTech, Digital Transformation, Banking), HR managers, and academic institutions.
- **Key Vibe:** "Warm Minimalism". Professional but approachable. "Dark Industrial Gold" aesthetic.
- **Core Value:** Showcase technical depth through the portfolio itself (clean code, modern stack, perfect lighthouse scores).

## 2. 🛠️ Tech Stack & Architecture

### Core Frameworks

- **Framework:** Astro 5 (Latest) - Chosen for SSG capabilities, speed, and islands architecture.
- **Authentication/Logic:** Minimal client-side JS, mostly static HTML.
- **UI Library:** React 19 (for interactive islands like the Tech Stack grid).
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin).
    - _Theme:_ Custom `industrial-gold` palette defined in CSS variables/Tailwind config.
- **Bundler:** Vite 6 (via Astro).

### Key Libraries & Tools

- **Internationalization (i18n):** Native Astro i18n features.
    - Locales: `en` (default), `es`.
    - Routing: `/[lang]/...` strategy with `prefixDefaultLocale: true`.
- **Testing:** `vitest` for unit testing logic and components.
- **Linting/Formatting:** ESLint 9 + Prettier (with Astro plugins).
- **Release Automation:** `release-it` + `auto-changelog` for semantic versioning and CHANGELOG generation.

### DevOps & CI/CD

- **Platform:** GitHub Pages.
- **Workflow:** Automated deployment via GitHub Actions on push to `master`.
- **Versioning:** Semantic Versioning (SemVer) enforced via `npm run release`.

## 3. 📂 Project Structure

```text
/
├── .github/workflows/   # CI/CD pipelines
├── public/              # Static assets (images, fonts, resume.pdf)
├── src/
│   ├── assets/          # Optimized assets (processed by Astro)
│   ├── components/      # Reusable UI components (Astro & React)
│   │   ├── common/      # Shared components (Header, Footer, Button)
│   │   └── sections/    # Page sections (Hero, About, Projects)
│   ├── layouts/         # Page layouts (Layout.astro)
│   ├── pages/           # File-based routing
│   │   ├── [lang]/      # Localized pages wrapper
│   │   ├── 404.astro    # Custom 404 error page
│   │   └── index.astro  # Root redirect to default locale
│   └── utils/           # Helper functions (i18n, formatting)
├── astro.config.mjs     # Astro configuration (i18n, integrations)
└── tailwind.config.mjs  # Tailwind configuration (theme extension)
```

## 4. 🎨 Design System Guidelines ("Dark Industrial Gold")

- **Visual Identity:** Sophisticated Dark Mode with "Moon/Wolf" iconography.
- **Color Palette:**
    - **Backgrounds:** Deep Gunmetal / Charcoal (`#111827`, `#0B0C10`).
    - **Primary Accent:** Mustard/Golden Yellow (`#F4D03F`, `#FFC107`) for CTAs and highlights.
    - **Text:** Crisp White/Light Grey (`#F9FAFB`) for readability.
- **Typography:**
    - **Headings:** Modern Sans-Serif ('Space Grotesk' or 'Outfit').
    - **Body:** Readable Sans-Serif ('Inter' or 'Public Sans').
- **UI Patterns:**
    - **Bento Grid:** For displaying projects and skills.
    - **Glassmorphism:** Subtle transparency on navigation.
    - **Glow Effects:** Warm golden glows for "featured" elements.

## 5. ✅ Development Constraints & Rules

1.  **Performance First:** Maintain Lighthouse scores of 95+ (Performance, Accessibility, Best Practices, SEO).
2.  **Strict TypeScript:** No `any`. Define interfaces for all props and data models.
3.  **Component Modularity:**
    - Use `.astro` components for static content.
    - Use `.tsx` (React) ONLY for interactive state management (e.g., filters, sliders).
4.  **Internationalization:**
    - All text must be abstractable or localized.
    - Content lives in `src/pages/[lang]/` or `src/content/`.
    - Use helper functions/dictionaries for UI labels.
5.  **Clean Commits:** Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) to support automated releases.

## 6. 📝 Current Status & Roadmap

- **Status:** v0.7.0 (Beta - Experience Section Complete).
- **Recent Focus:**
    - **Final Polish & SEO:**
        - Conducted comprehensive SEO audit (meta tags, descriptions, Open Graph, Twitter Cards).
        - Verified layout integrity and LCP strategies via visual tests and Lighthouse.
        - Optimized image loading (eager vs lazy) for better LCP.
    - **UX Enhancements:**
        - Implemented `ScrollToTop` component with circular progress indicator.
        - Fixed scroll snapping inconsistency in Experience section.
        - Cleaned up Header visual artifacts on scroll.
    - **Experience Section:**
        - Implemented full timeline view at `/experience` with "Download CV" CTA.
        - Integrated "Experience" card into Hero Bento grid (showing top 2 roles) with perfect vertical alignment.
        - Unified logo logic: Server-side validation (`fs.existsSync`) + Premium CSS placeholder fallback for missing images.
        - Standardized styling for buttons and layout consistency.
    - **Projects Section:** 
        - Implemented static featured grid (Top 2 + "View All") for optimal home layout.
        - Added `inProgress` and `draft` states with visual badges and disabling logic.
        - Enhanced `ProjectGrid` with multi-tag filtering (AND logic) and smart sorting (Featured > Date).
        - Integrated new case studies: IBM Data Engineering, Data Science, and API Colores.
        - Refactored localization strategy: English files are the strict Single Source of Truth for configuration.
    - **Hero Section:** Dynamic "Latest Achievement" bento card.
    - **Certifications:** Added "Verified Credentials" banner with Credly integration.

- **Immediate Next Steps:**
    - **Content & Features Expansion:**
        - **Technical Blog:** Design MDX architecture for sharing engineering insights.
        - **Interactive API Showcase:** (New) Add a section to demo live backend endpoints or Swagger documentation.
        - **Contact Integration:** Implement a functional contact form (e.g., Formspree) or 'Book a Meeting' Calendly embed widget.
    - **Quality Assurance:**
        - **E2E Testing:** Setup Playwright to automate critical path verification (Navigation, i18n, Forms).
