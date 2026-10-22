# 🤖 AGENTS.md: Project Context & Guidelines

> **Note to AI Agents:** This file serves as the primary source of truth for the project's architecture, philosophy, and development standards. Always consult this file before making major architectural decisions.

## 1. 🎯 Project Philosophy & Goals

- **Objective:** Create a high-performance personal portfolio to consolidate professional branding for a Systems Engineer specializing in Backend (Java/Spring), Cloud (AWS), and Data Science.
- **Target Audience:** Technical recruiters (EdTech, Digital Transformation, Banking), HR managers, and academic institutions.
- **Key Vibe:** "Warm Minimalism". Professional but approachable. "Dark Industrial Gold" aesthetic.
- **Core Value:** Showcase technical depth through the portfolio itself (clean code, modern stack, perfect lighthouse scores).
- **Brand identity:** the wolf-inside-the-moon logo is the single visual anchor; the palette is derived from it (moon yellow + wolf slate).

## 2. 🛠️ Tech Stack & Architecture

### Core Frameworks

- **Framework:** Astro 7 (Latest) - Chosen for SSG capabilities, speed, and islands architecture.
- **Rendering:** Static HTML first, minimal client-side JS.
- **UI Library:** React 19 (for interactive islands like the Tech Stack grid).
- **Styling:** Tailwind CSS v4 (using `@tailwindcss/vite` plugin).
    - _Theme:_ Custom `Gunmetal, Moon & Wolf` palette defined once in `@theme` (`src/styles/global.css`).
- **Bundler:** Vite (bundled with Astro; not a direct dependency).

### Key Libraries & Tools

- **Internationalization (i18n):** Native Astro i18n features.
    - Locales: `en` (default), `es`, `ja`.
    - Routing: `/[lang]/...` strategy with `prefixDefaultLocale: true`.
- **Testing:** `vitest` for unit testing logic and components.
- **Linting/Formatting:** ESLint 9 + Prettier (with Astro and TypeScript plugins).
- **Type Checking:** `astro check` via `@astrojs/check` and `typescript`.
- **Release Automation:** `release-it` (version bump from Conventional Commits, tag, push) + `auto-changelog` (CHANGELOG, run by `scripts/sync-changelog.mjs` after the tag). Every push to `master` triggers a release, so merge order matters.

### DevOps & CI/CD

- **Platform:** GitHub Pages, served at `https://meliodiaz.com` (`public/CNAME`; `site` comes from `SITE_URL`, default in `astro.config.mjs`).
- **Workflow:** Automated deployment via GitHub Actions on push to `master`.
- **Versioning:** Semantic Versioning (SemVer) enforced via `pnpm release`.

## 3. 📂 Project Structure

```text
/
├── .github/workflows/   # CI/CD pipelines
├── docs/                # Public roadmap (ROADMAP.md)
├── public/              # Static assets (images, fonts, CV, robots.txt, CNAME)
├── src/
│   ├── assets/          # Optimized assets (processed by Astro)
│   ├── components/      # UI components
│   │   ├── astro/       # Static components (Hero, Header, Footer, Experience)
│   │   └── react/       # Interactive components (ProjectGrid, CertificationList)
│   ├── content/         # Content collections (projects, certifications)
│   │   ├── certifications/ # Individual JSON files per certification
│   │   └── projects/    # Markdown files for projects (en/es)
│   ├── i18n/            # Internationalization dictionaries and utilities
│   │   ├── ui.ts        # UI labels and translations
│   │   └── utils.ts     # Locale routing and translation helpers
│   ├── layouts/         # Page layouts (Layout.astro)
│   ├── pages/           # File-based routing
│   │   ├── [lang]/      # Localized pages wrapper (en, es, ja)
│   │   ├── 404.astro    # Custom 404 error page
│   │   └── index.astro  # Root redirect with language detection
│   ├── styles/          # Global styles (Tailwind v4 imports)
│   ├── utils/           # Helper functions (cv, experience, skills, social, files)
│   ├── content.config.ts # Content Collections schema definitions
│   └── site.config.ts   # Central site configuration and metadata
├── scripts/             # Asset and release tooling (brand assets, OG image, changelog sync)
├── tests/               # Unit tests (Vitest)
├── .gitattributes       # Git normalization (LF line endings)
├── astro.config.mjs     # Astro configuration (i18n, integrations)
├── .release-it.json     # Release automation (hooks, plugins)
├── eslint.config.js     # ESLint 9 configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration (allowBuilds)
├── tailwind.config.mjs  # Fonts and animations (loaded via @config; colors live in @theme)
└── tsconfig.json        # TypeScript configuration with strict paths
```

## 4. 🎨 Design System Guidelines ("Dark Industrial Gold": the name is historical, the palette is moon + wolf)

- **Visual Identity:** Sophisticated Dark Mode with "Moon/Wolf" iconography.
- **Color Palette** (tokens live in `@theme`, `src/styles/global.css`; never hardcode hex values in components):
    - **Backgrounds:** Deep Gunmetal `gunmetal` (`#0c111c`) / Charcoal `charcoal` (`#1F2937`).
    - **Primary Accent:** Moon `moon` (`#F1DE76`, from the logo). Text placed on a moon background MUST be `gunmetal`.
    - **Secondary:** Wolf `wolf` (`#47505C`, from the logo). Use for surfaces/borders/scrollbar, not for text on gunmetal (2.3:1). For muted text on gunmetal use `#a3a3ad` (7.5:1).
    - **Text:** Platinum `light` (`#e1e1e0`) / Light Grey (`#F9FAFB`).
    - **Retired colors:** the `gold` and `copper` aliases are gone (use `moon`); the old copper `#c08b5a` and slate `#5a5866` are retired too.
- **Logo & brand assets** (regenerate derived files with `node scripts/generate-brand-assets.mjs`; the master logo is never redrawn):
    - Master: `public/media/logo.svg` (optimized, has `<title>`).
    - Variants (transparent bg): `public/media/brand/logo-dark-bg.svg` (default), `logo-light-bg.svg`, `logo-mono-dark.svg`, `logo-mono-light.svg`.
    - Favicons (simplified symbol, no fur tufts): `public/favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`. Linked in `src/layouts/Layout.astro`.
    - OG image: `public/media/og-image.png` (1200x630), generated by `node scripts/generate-og-image.mjs` (downloads Space Grotesk/Inter to a git-ignored `scripts/.fonts/`).
- **Typography:**
    - **Headings:** Modern Sans-Serif ('Space Grotesk' or 'Outfit').
    - **Body:** Readable Sans-Serif ('Inter' or 'Public Sans').
- **UI Patterns:**
    - **Bento Grid:** For displaying projects and skills.
    - **Glassmorphism:** Subtle transparency on navigation.
    - **Glow Effects:** Warm moon-yellow glows for "featured" elements.

## 5. ✅ Development Constraints & Rules

1.  **Performance First:** Maintain Lighthouse scores of 95+ (Performance, Accessibility, Best Practices, SEO).
2.  **Strict TypeScript:** No `any`. Define interfaces for all props and data models.
3.  **Component Modularity:**
    - Use `.astro` components for static content.
    - Use `.tsx` (React) ONLY for interactive state management (e.g., filters, sliders).
4.  **Internationalization:**
    - All text must be abstractable or localized.
    - Content lives in `src/pages/[lang]/` or `src/content/`.
    - Use helper functions/dictionaries (`src/i18n/ui.ts`) for UI labels.
    - **Adding a New Language:**
        1.  Update `astro.config.mjs`: Add the locale code to `locales: ["en", "es", "ja", ...]`.
        2.  Update `src/i18n/ui.ts`:
            - Add the language code and its display name to the `languages` object.
            - Add a new dictionary entry for the language in the `ui` object.
            - Add `nav.langName` for the language selector.
        3.  The `LanguagePicker` component will automatically detect and display the new language.
5.  **Content model:** English content files are the single source of truth; `es`/`ja` files only override the fields that change (the rest is inherited). Step-by-step guides for adding projects, certifications and experience are in `README.md`.
6.  **SEO:** Every page gets canonical, hreflang, localized meta tags and JSON-LD from `Layout.astro`. Keep that logic in the layout, not in pages.
7.  **Formatting & Quality:** Before pushing run `pnpm lint`, `pnpm test` and `pnpm format`.
8.  **Clean Commits:** Follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) to support automated releases. Every merge to `master` publishes a release.

## 6. 📝 Status & Roadmap

- **Current version:** read it from `package.json`. Release history: `CHANGELOG.md` (generated, never edit by hand).
- **Roadmap:** `docs/ROADMAP.md` lists what is planned and what is open for contribution. Update it when a roadmap item ships or a new one is agreed.
- Do not log change history or "recent focus" here; it goes stale. This file only holds what an agent needs to write correct code today.
