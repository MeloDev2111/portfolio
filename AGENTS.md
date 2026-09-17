# 🤖 AGENT.md: Project Context & Guidelines

> **Note to AI Agents:** This file is the source of truth for the project's architecture, philosophy and development standards. Consult it before making architectural decisions.
>
> **Visual decisions belong in [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md), not here.** Do not invent colors, spacing or component patterns — take them from that document. Future features and their design requirements are in [`docs/ROADMAP.md`](./docs/ROADMAP.md).
>
> A redesign is currently in progress. If you are implementing it, read [`docs/REDESIGN_PLAN.md`](./docs/REDESIGN_PLAN.md) — it carries the phase breakdown, the verified findings and the acceptance criteria. **Implement one phase at a time.**

## 1. 🎯 Project Philosophy & Goals

- **Objective:** A high-performance personal portfolio consolidating the professional brand of a Systems Engineer specializing in Backend (Java/Spring), Cloud (AWS/GCP) and Data Science.
- **Target audience:** Technical recruiters (EdTech, digital transformation, banking), HR managers, and academic institutions.
- **Key vibe:** "Warm minimalism" — professional but approachable. **"Gunmetal & Copper"** aesthetic.
- **Core value:** The portfolio demonstrates technical depth *by being* the artifact: clean code, modern stack, excellent Lighthouse scores.

## 2. 🛠️ Tech Stack & Architecture

### Core

- **Framework:** Astro 7 — SSG, islands architecture.
- **UI library:** React 19, for interactive islands only.
- **Styling:** Tailwind CSS v4 via the `@tailwindcss/vite` plugin.
  - Tokens are defined in **CSS** (`src/styles/tokens.css`), not in a JS config. See §4.
- **Bundler:** Vite (via Astro).
- **Package manager:** pnpm 12. Native build-script permissions (e.g. `esbuild`) are granted in `pnpm-workspace.yaml` via `allowBuilds`.

### Key libraries & tooling

- **i18n:** native Astro i18n. Locales `en` (default), `es`, `ja`, with `prefixDefaultLocale: true` — every route is `/[lang]/…`.
- **Deployment base path:** the site builds under a `base` of `/portfolio` (overridable via `BASE_PATH`). **Always construct URLs with the i18n helpers or `import.meta.env.BASE_URL`; never hardcode an absolute path.**
- **Testing:** Vitest with happy-dom.
- **Linting/formatting:** ESLint 9 + Prettier, with Astro plugins.
- **Releases:** `release-it` + `auto-changelog`, semantic versioning.

### DevOps

- **Platform:** GitHub Pages, deployed by GitHub Actions on push to `master`.
- **Versioning:** SemVer via `pnpm release`.

## 3. 📂 Project Structure

```text
/
├── .github/workflows/       # CI/CD pipelines
├── docs/
│   ├── DESIGN_SYSTEM.md     # Visual source of truth
│   └── ROADMAP.md           # Future features + their design requirements
├── public/                  # Static assets (logos, cv/, media/, certifications/)
├── src/
│   ├── assets/              # Optimized assets (processed by Astro)
│   ├── components/
│   │   ├── astro/           # Static components (Hero, Header, Footer, …)
│   │   ├── react/           # Interactive islands (ProjectGrid, CertificationList)
│   │   └── ui/              # Design-system primitives (Section, Card, Button, …)
│   ├── content/             # Content collections
│   │   ├── certifications/  # One JSON file per certification
│   │   └── projects/        # Markdown, split by locale: en/, es/
│   ├── i18n/
│   │   ├── ui.ts            # UI strings per locale
│   │   └── utils.ts         # Locale + path helpers
│   ├── layouts/             # Layout.astro, ThemeScript.astro
│   ├── pages/
│   │   ├── [lang]/          # Localized routes
│   │   ├── 404.astro
│   │   └── index.astro      # Root redirect (does NOT use Layout)
│   ├── styles/
│   │   ├── tokens.css       # Design tokens + themes + @utility effects
│   │   └── global.css       # Tailwind import + base layer
│   ├── tests/               # Vitest
│   ├── utils/               # cv, experience, files, projects, skills, social, theme
│   ├── content.config.ts    # Collection schemas
│   └── site.config.ts       # Site metadata, nav, contact providers
├── astro.config.mjs
└── pnpm-workspace.yaml
```

## 4. 🎨 Design System

**The full specification is [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md).** The essentials an agent must not get wrong:

- **Identity:** "Gunmetal & Copper" — deep gunmetal `#0c111c` backgrounds, antique copper `#c08b5a` brand accent, platinum `#e1e1e0` text. Light theme is warm paper `#faf7f2` with a darkened copper `#8a5c2e`. Iconography is moon/wolf.
- **Two accents, with rules.** `copper` = identity (borders, glows, hover, accented words). `amber` = action and liveness (primary CTA, "current" indicator, "new" badge). They are not interchangeable.
- **Typography:** Space Grotesk for headings (`font-heading`), Inter for body (`font-sans`), a monospace stack for metadata and code.
- **Theming:** dark (default) + light, switched by **remapping CSS variables**, not by `dark:` variants. `dark:` is reserved for non-color differences (blur strength, glow presence, image filters).
- **UI patterns:** bento grid in the hero, glassmorphism on cards and navigation, warm copper glows on featured elements — glows auto-neutralize in light theme via `--glow-strength`.

### Non-negotiables

1. **No raw hex values in `src/`** outside `styles/tokens.css` and the brand colors in `utils/skills.ts`. Use semantic utilities: `bg-surface`, `text-fg-muted`, `border-border-accent`.
2. **No `dark:` variant for a color.** If a color must differ per theme, add or fix a token.
3. **No new bespoke card or button markup.** Extend a primitive in `src/components/ui/`.
4. **No gradient text**, no `min-h-[Nvh]` on sections, no `scroll-snap`.
5. **Contrast ≥4.5:1 in both themes**, enforced by `src/tests/tokens.test.ts`. A new color pair must be added to that test.

## 5. ✅ Development Constraints & Rules

1. **Performance first:** Lighthouse ≥95 across Performance, Accessibility, Best Practices and SEO.
2. **Strict TypeScript:** no `any`. Interfaces for all props and data models.
3. **Component modularity:**
   - `.astro` for static content — this is the default.
   - `.tsx` (React) **only** for interactive state (filters, sorting). An island that holds no state should be an `.astro` component.
   - Prefer `client:visible` over `client:only` so islands render server-side and work without JS.
4. **Accessibility is a contract, not a polish pass.** See §9 of the design system. Specifically: no hover-only information, ≥44×44 touch targets, focus visible in both themes, everything keyboard-operable, and all content readable with JS disabled.
5. **Internationalization:**
   - All user-facing text is localized. No hardcoded English in components.
   - UI strings live in `src/i18n/ui.ts`; content lives in `src/content/`.
   - English files are the **strict source of truth** for project configuration; localized files override only `title` and `description`, and inherit tags, date and image.
   - **Adding a language:**
     1. Add the code to `i18n.locales` in `astro.config.mjs`.
     2. In `src/i18n/ui.ts`, add it to `languages` and add its dictionary (including `nav.langName`).
     3. Add localized project files and experience descriptions.
     4. Run `pnpm test` — `i18n.test.ts` reports missing keys.

     `LanguagePicker` picks the new language up automatically.
6. **Formatting:** `pnpm format` fixes styling across the project.
7. **Clean commits:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) — automated releases depend on them.

## 6. 📝 Current Status

- **Version:** 0.9.2.
- **Active initiative:** the design-system and page-architecture redesign. Phases, acceptance criteria and verification steps are tracked in [`docs/ROADMAP.md`](./docs/ROADMAP.md).

### Shipped

- **i18n:** three locales, glassmorphism language dropdown, i18n helpers covered by unit tests.
- **Experience:** full timeline at `/experience` with a CV CTA; experience card in the hero bento; server-side logo validation (`fs.existsSync`) with a CSS placeholder fallback.
- **Projects:** featured grid on the home page; multi-tag filtering with AND logic and smart sorting (featured > date); `inProgress` and `draft` states.
- **Certifications:** Credly "Verified Credentials" integration; latest-achievement card in the hero.
- **UX:** `ScrollToTop` with a circular progress indicator; SEO audit (meta, Open Graph, Twitter cards); image loading tuned for LCP.
- **Tooling:** pnpm standardization, automated releases, CI deployment.

### Known defects

Tracked in the roadmap's maintenance backlog. The two that matter most: the **Open Graph image is an SVG**, which X and LinkedIn refuse to render (social previews are broken), and the **sitemap `<link>` 404s** because no sitemap integration is installed.
