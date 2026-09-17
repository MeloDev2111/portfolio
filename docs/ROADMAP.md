# 🗺️ Roadmap

> **Purpose:** This file records what the portfolio is going to grow into, and — more importantly — **what each future feature demands from the design system today**. The redesign builds those hooks up front so each feature drops in without rework.
>
> Design decisions live in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). This file is about sequence and readiness.

---

## Now — Redesign (in progress)

Consolidating the design system and restructuring the page architecture, in six shippable phases. The full working plan — verified findings, per-phase detail, acceptance criteria and verification steps — is in [REDESIGN_PLAN.md](./REDESIGN_PLAN.md).

| Phase | Delivers                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------- |
| **0** | Groundwork: fix broken effects, contrast failures, header overlap, mobile scroll. Correct the docs. _(No visual change.)_ |
| **1** | Token layer — `tokens.css`, effects as `@utility`. _Acceptance criterion: zero visual diff._                              |
| **2** | Light/dark theming with a persisted toggle, FOUC-free.                                                                    |
| **3** | Component primitives in `src/components/ui/`, migrated across all components.                                             |
| **4** | Page restructure — short conversion-focused home, depth in dedicated pages.                                               |
| **5** | Motion, accessibility, view transitions.                                                                                  |
| **6** | Cleanup — retire the JS Tailwind config, legacy aliases, split `i18n/ui.ts`.                                              |

---

## Readiness hooks built during the redesign

These are built **now**, while empty, so later features are additive rather than structural.

### 1. Navigation from config

`navItems` moves out of `Header.astro` into `site.config.ts`:

```ts
export const nav: NavItem[] = [
    { key: "nav.experience", path: "/experience" },
    { key: "nav.projects", path: "/projects" },
    { key: "nav.certifications", path: "/certifications" },
    { key: "nav.tech", path: "/tech-stack" },
    { key: "nav.blog", path: "/blog", enabled: false },
    { key: "nav.contact", path: "/contact", enabled: false, cta: true },
];
```

`Header` and `Footer` both map over `nav.filter(i => i.enabled !== false)`. `key` is a `ui.ts` key, so it translates automatically. **Shipping the blog becomes a one-line flag flip.**

### 2. `posts` content collection

Declared in `content.config.ts` from day one with the full MDX schema, even with zero entries.

### 3. Normalized `projects` schema

`slug`, `repo`, `demo`, `status: "shipped" | "wip" | "archived"` (replacing the `inProgress` boolean), and `highlights: string[]`. `demo`/`repo` are the live-demo hook; `highlights` is what a project detail page will need.

### 4. `PageHeader` + `Prose` primitives

The MDX seam. A future post page is literally:

```astro
<Layout><PageHeader … /><Prose><Content /></Prose></Layout>
```

### 5. `CTASection` with a provider list

Driven by `siteConfig.contact = { calendly: null, email, linkedin }`. Today it renders CV + LinkedIn; set a Calendly URL and a third button appears. No layout rework.

### 6. `Card` `media` slot

So an `<iframe>` or `<video>` demo drops into the same card shell as today's `<img>`.

### 7. Theme tokens are open-ended

A future high-contrast or sepia mode is one more `[data-theme="x"]` block. No component changes.

---

## Next — Technical blog (MDX)

**Why:** The strongest signal of engineering depth a portfolio can carry, and the main reason anyone returns to it.

**Ships as:** `/[lang]/blog` index + `/[lang]/blog/[slug]`.

**Design-system requirements — all met by the redesign:**

- `prose` utility, already token-driven and correct in both themes. ✅ _(phase 1)_
- `PageHeader` + `Prose` primitives. ✅ _(phase 3)_
- `posts` collection schema. ✅
- Nav flag. ✅

**Still to do when it ships:**

- Install `@astrojs/mdx`.
- Syntax highlighting: prefer Astro's built-in Shiki with **two themes bound to CSS variables**, so code blocks follow the theme toggle. A single-theme highlighter will look wrong in one of the two modes — this is the one genuinely new design problem the blog introduces.
- Reading time and post metadata line.
- Per-post OG images (see _Social preview_ below — the current SVG OG image is already broken).
- RSS feed (`@astrojs/rss`) and a sitemap entry.
- Decide the localization policy: does every post exist in every locale, or does a post declare its own `lang` and appear only there? The schema supports both; **pick one before the first post**, because retrofitting is painful.

---

## Next — Live demos

**Why:** For a backend/cloud profile, a running endpoint is worth more than a screenshot.

**Ships as:** an embedded demo inside the project detail card or on a project page.

**Requirements met:** `Card` `media` slot, `demo` field in the project schema.

**Still to do:**

- Decide the embed strategy per project: Swagger UI iframe, a small live API console, or a recorded interaction. Each has a different failure mode when the backing service is down.
- **A demo must degrade.** A dead iframe is worse than no iframe — define a placeholder state driven by the `status` field so an archived project never shows a broken embed.
- Iframes need explicit `title`, `loading="lazy"` and a sandbox policy.
- Third-party embeds will not follow the theme toggle. Either accept the mismatch inside the frame or pass a theme parameter where the provider supports one.

---

## Next — Contact & scheduling

**Why:** Currently the only contact path is a LinkedIn link in the hero. That is a leak in the conversion funnel.

**Ships as:** a `/contact` route and/or a Calendly embed in `CTASection`.

**Requirements met:** `CTASection` with a provider list, `siteConfig.contact`.

**Still to do:**

- Choose: Formspree (a form, works statically) vs Calendly (scheduling, heavier embed). They are not mutually exclusive — a form for general contact, scheduling for recruiters.
- A form needs validation, error and success states, and honeypot spam protection — none of which exist in the primitives yet. `Input`/`Field` primitives would be the first genuine addition to the component layer since the redesign.
- Calendly's embed is ~90KB of third-party JS: load it lazily on interaction, never on page load, or the Lighthouse budget breaks.
- Privacy note if any third party receives visitor data.

---

## Later — Project detail pages

**Why:** Projects currently only link outward. A case study (problem → approach → impact → stack) is what a recruiter actually reads.

**Requirements met:** `highlights`, `slug`, `repo`, `demo` in the schema; `PageHeader`; `Prose`; the project Markdown bodies already exist and are currently unused.

**Still to do:** the `/[lang]/projects/[slug]` route, a `transition:name` pairing between the grid card and the detail page, and per-project OG images.

---

## Later — More languages

**Requirements met:** `getAllLanguageUrls` derived from `Object.keys(ui)` rather than a hardcoded array; `ui.ts` split into `src/i18n/locales/{en,es,ja}.ts` with `en.ts` as the `satisfies` source of truth, so a missing key in another locale is a **type error** rather than a silent English fallback.

**Open item — Japanese.** `ja` is declared in `astro.config.mjs` and has a `ui.ts` dictionary, but there is **no `src/content/projects/ja/`**. The decision is to keep it enabled with a guaranteed English fallback; `i18n.test.ts` lists the missing keys without failing the build. Translate the content when there is a reason to.

**Note on scale:** beyond ~5 locales, shipping every language's strings to every page starts to matter. At that point, load the dictionary per route rather than importing the whole object.

---

## Maintenance backlog

Small, unglamorous, and each one is a real defect.

- [ ] **OG image is an SVG** (`/media/logo.svg`). X and LinkedIn do not render SVG — **social previews are broken right now**. Needs a real 1200×630 PNG. _(Phase 6.)_
- [ ] `<link rel="sitemap">` is hardcoded and ignores `base`, and no sitemap integration is installed — the link 404s. Install `@astrojs/sitemap` or remove the tag.
- [ ] E2E tests (Playwright) for the critical paths: navigation, language switching, theme persistence.
- [ ] Self-host fonts. Google Fonts is currently a blocking third-party stylesheet in `<head>`.
- [ ] Visual regression testing, which would make phase 1's "zero visual diff" criterion provable rather than eyeballed.

---

## Explicitly not planned

Recorded so they are not re-litigated:

- **A CMS.** Content collections + Git are the right weight for one author.
- **SSR / a backend.** The site is static and should stay static; live demos belong in their own services.
- **Analytics with cookies.** If measurement is ever needed, use a cookieless provider.
- **A third accent color.** Two accents with clear rules is the system. A third means the rules failed.
