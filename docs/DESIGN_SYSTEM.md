# 🎨 Design System — "Gunmetal & Copper"

> **Status:** This document is the **target** specification, adopted as the source of truth ahead of implementation. Each section is marked with the phase that delivers it. Until a phase ships, the code may still differ — this file describes where it is going, and nothing new should be written against the old patterns.
>
> **Scope:** This is the single source of truth for the visual system. If a value is not in this document, it does not belong in a component.

---

## 1. Principles

1. **Semantic over literal.** Components never name a color. They name a role: `bg-surface`, `text-fg-muted`, `border-border-accent`. The theme decides what those resolve to. A raw hex in a component is a bug.
2. **One markup, two themes.** Theme switching happens by remapping CSS variables, not by duplicating classes with `dark:`. If you find yourself writing `dark:` for a color, the token is missing — add the token instead.
3. **Contrast is a build invariant.** Every foreground/background pair in this document meets WCAG AA (≥4.5:1) in _both_ themes, and a unit test enforces it. Ratios are recorded next to each token.
4. **Motion is optional by default.** Nothing may depend on animation to be legible or reachable. Every animated element has a correct resting state.
5. **Nothing may require JavaScript to be readable.** Content, navigation and theme all work with JS disabled.

---

## 2. Theme architecture

**Phase 1–2.** Three tiers, defined in `src/styles/tokens.css`:

| Tier           | Where                            | What                                                                                |
| -------------- | -------------------------------- | ----------------------------------------------------------------------------------- |
| **Primitives** | `@theme { }`                     | Static color ramps, fonts, radii, easings. Never referenced directly by components. |
| **Semantics**  | `:root` / `[data-theme="light"]` | Plain custom properties (`--bg`, `--fg-muted`, `--accent`…) remapped per theme.     |
| **Bridge**     | `@theme inline { }`              | Exposes semantics to Tailwind's `--color-*` namespace so utilities generate.        |

### Why `@theme inline` is mandatory

`@theme` variables are emitted once into `@layer theme` on `:root, :host` and are **static** — you cannot put `[data-theme="light"]` inside `@theme`. Without `inline`, Tailwind emits `--color-bg: var(--bg)` on `:root` and utilities reference `var(--color-bg)`. That happens to work while `data-theme` lives on `<html>` (because `<html>` _is_ `:root`), but it breaks the moment a theme is scoped to a subtree — a component preview, an embedded demo, a light callout on a dark page. With `inline`, the utility emits `background-color: var(--bg)` directly and resolves per element.

### Why not a JS config

A Tailwind JS config (`tailwind.config.mjs` + `@config`) **works** in v4, but it emits literal hex values rather than CSS variables — `--color-copper` never appears in the generated `@layer theme`. Runtime theming is therefore impossible. This is the entire reason the JS config is being retired (phase 6), not any incompatibility.

### When `dark:` is still correct

A `dark:` variant is defined and attribute-driven:

```css
@custom-variant dark  (&:where([data-theme="dark"],  [data-theme="dark"]  *));
@custom-variant light (&:where([data-theme="light"], [data-theme="light"] *));
```

Use it **only** for things that are not a color swap:

- `backdrop-blur` strength
- whether an effect exists at all
- `filter: invert()` on monochrome logos
- image `brightness` correction

Everything else uses a token.

---

## 3. Color

### 3.1 Primitives

Contrast columns are measured against `#0c111c` (dark bg) / `#faf7f2` (light bg).

#### Copper — brand

| Token                    | Hex           | vs dark  | vs light | Role                      |
| ------------------------ | ------------- | -------- | -------- | ------------------------- |
| `--color-copper-50`      | `#fbf5ef`     | 17.45    | 1.01     |                           |
| `--color-copper-100`     | `#f4e6d6`     | 15.40    | 1.15     |                           |
| `--color-copper-200`     | `#e8cdae`     | 12.38    | 1.43     |                           |
| `--color-copper-300`     | `#daae82`     | 9.31     | 1.90     | Accent hover, dark theme  |
| **`--color-copper-400`** | **`#c08b5a`** | **6.37** | 2.77     | **Original brand copper** |
| `--color-copper-500`     | `#ab7546`     | 4.82     | 3.66     |                           |
| `--color-copper-600`     | `#96602f`     | 3.61     | 4.90     |                           |
| **`--color-copper-700`** | **`#8a5c2e`** | 3.28     | **5.38** | **Copper-as-text, light** |
| `--color-copper-800`     | `#5e3d1f`     | 1.94     | 9.08     | Accent hover, light theme |
| `--color-copper-900`     | `#3a2614`     | 1.32     | 13.39    |                           |

#### Amber — action & live signal

| Token                   | Hex           | vs dark  | vs light | Role                      |
| ----------------------- | ------------- | -------- | -------- | ------------------------- |
| `--color-amber-300`     | `#fcd34d`     | —        | —        |                           |
| `--color-amber-400`     | `#fbbf24`     | —        | —        | CTA hover, dark theme     |
| **`--color-amber-500`** | **`#f59e0b`** | **8.79** | 2.01     | **CTA fill, both themes** |
| `--color-amber-600`     | `#d97706`     | 5.92     | 2.98     | CTA hover, light theme    |
| **`--color-amber-700`** | **`#b45309`** | 3.76     | **4.70** | **Amber-as-text, light**  |
| `--color-amber-800`     | `#92400e`     | 2.66     | 6.63     |                           |

#### Gunmetal — dark neutrals

`950 #070b12` · **`900 #0c111c`** (canonical bg) · `800 #141b2a` · `700 #1c2536` · `600 #2a3547` · `500 #414d61` · `400 #6b7789` · `300 #a2acbd` (8.24 ✓) · `200 #c9d0da` · `100 #e1e1e0` (platinum)

#### Paper — light neutrals (warm)

`50 #fffdfa` · **`100 #faf7f2`** (canonical bg) · `200 #f2ece2` · `300 #e6ddcf` · `400 #cfc4b3` · `500 #9c9385` · `600 #6b7078` · `700 #55595f` (6.59 ✓) · `800 #33363b` · `900 #0c111c`

### 3.2 Semantic tokens

These are what components use. Utility form is in the third column.

| Token              | Role                                | Utility                 |
| ------------------ | ----------------------------------- | ----------------------- |
| `--bg`             | Page background                     | `bg-bg`                 |
| `--bg-subtle`      | Alternating section background      | `bg-bg-subtle`          |
| `--surface`        | Card / panel background             | `bg-surface`            |
| `--surface-raised` | Elevated surface above `surface`    | `bg-surface-raised`     |
| `--surface-sunken` | Inset: code blocks, wells           | `bg-surface-sunken`     |
| `--border`         | Default hairline                    | `border-border`         |
| `--border-strong`  | Emphasised / hover border           | `border-border-strong`  |
| `--border-accent`  | Brand border on hover/active        | `border-border-accent`  |
| `--fg`             | Body text                           | `text-fg`               |
| `--fg-strong`      | Headings, maximum emphasis          | `text-fg-strong`        |
| `--fg-muted`       | Secondary text, descriptions        | `text-fg-muted`         |
| `--fg-subtle`      | Tertiary: dates, metadata, labels   | `text-fg-subtle`        |
| `--accent`         | Brand copper                        | `text-accent`           |
| `--accent-hover`   | Brand hover state                   | `text-accent-hover`     |
| `--accent-fg`      | Ink **on** an accent surface        | `text-accent-fg`        |
| `--accent-surface` | Large accent fill (tinted)          | `bg-accent-surface`     |
| `--action`         | Amber CTA fill                      | `bg-action`             |
| `--action-hover`   | CTA hover fill                      | `hover:bg-action-hover` |
| `--action-fg`      | Ink **on** the amber fill           | `text-action-fg`        |
| `--action-surface` | Tinted amber background for badges  | `bg-action-surface`     |
| `--action-text`    | Amber **as text** (theme-corrected) | `text-action-text`      |

**Measured guarantees, both themes:** `fg`/`bg` ≥ 14.4:1 · `fg-muted`/`bg` ≥ 6.5:1 · `fg-subtle`/`bg` ≥ 4.6:1 · `accent`/`bg` ≥ 5.3:1 · `action-fg`/`action` = 8.31:1 · `accent-fg`/`accent` ≥ 5.7:1.

### 3.3 Accent usage rules

This is the rule that stops the two accents from mixing arbitrarily, as they do today.

|             | **Copper** (`--accent`)                                                                       | **Amber** (`--action`)                                               |
| ----------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Means**   | Identity. "This is the brand."                                                                | Action & liveness. "Do this" / "this is happening now."              |
| **Use for** | Card borders on hover, glows, accented words in headings, links, icon accents, the focus ring | Primary CTA fill, the "current role" dot, "new"/"in progress" badges |
| **Never**   | As a solid CTA fill                                                                           | As decoration, as a border, as a heading color                       |

**Hard rule:** amber as _text_ must use `--action-text`, never `--action`. Raw amber-500 on paper is **2.01:1** — an accessibility failure. `--action-text` resolves to amber-700 in light (4.70 ✓) and amber-500 in dark (8.79 ✓), so `text-action-text` is unconditionally correct.

**Second rule:** gradient text (`bg-clip-text from-copper to-white`) is **banned**. `to-white` is invisible on paper. Use `SectionHeading`'s `accent` prop, which renders the accented word in a flat `--accent`.

---

## 4. Typography

| Role                | Family           | Size                   | Weight | Tracking           |
| ------------------- | ---------------- | ---------------------- | ------ | ------------------ |
| Display (hero `h1`) | `--font-heading` | `3rem` → `4.5rem`      | 700    | `-0.02em`          |
| Page `h1`           | `--font-heading` | `2.25rem` → `3rem`     | 700    | `-0.02em`          |
| Section `h2`        | `--font-heading` | `1.875rem` → `2.25rem` | 700    | `-0.01em`          |
| Card `h3`           | `--font-heading` | `1.125rem` → `1.25rem` | 600    | normal             |
| Body                | `--font-sans`    | `1rem`                 | 400    | normal             |
| Body large (lead)   | `--font-sans`    | `1.125rem` → `1.25rem` | 300    | normal             |
| Small               | `--font-sans`    | `0.875rem`             | 400    | normal             |
| Micro (metadata)    | `--font-sans`    | `0.75rem`              | 500    | normal             |
| Eyebrow             | `--font-mono`    | `0.75rem`              | 700    | `0.2em`, uppercase |
| Code / dates        | `--font-mono`    | `0.875em`              | 400    | normal             |

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-heading: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, "JetBrains Mono", SFMono-Regular, monospace;
```

**Every heading uses `font-heading`.** The hero `h1` currently does not — it silently falls back to Inter. That is a bug, not a style.

Prose measure is capped at `68ch`.

---

## 5. Space, radius, elevation

### Container widths

| Name      | Value       | Used by                      |
| --------- | ----------- | ---------------------------- |
| `prose`   | `68ch`      | Long-form text, MDX          |
| `content` | `max-w-4xl` | Focused single-column pages  |
| `wide`    | `max-w-6xl` | Hero, most sections          |
| `full`    | `max-w-7xl` | Grids, dedicated index pages |

All containers carry `mx-auto px-4 sm:px-6 lg:px-8`.

### Section rhythm (`Section` `space` prop)

`none` = `py-0` · `sm` = `py-12` · `md` = `py-16 md:py-24` (default) · `lg` = `py-24 md:py-32`

Sections have **no `min-height`** and **no vertical centering**. Content height is the correct height; forcing viewport-fraction heights is what produced the mobile scroll problems.

### Radii

```css
--radius-card: 1rem; /* project/cert cards, buttons at lg */
--radius-bento: 1.25rem; /* bento cells, interactive cards */
--radius-panel: 1.5rem; /* large panels */
```

Plus Tailwind's `rounded-md` (tags, icon tiles) and `rounded-full` (pills, nav, dots).

### Elevation

Elevation is expressed by `--glass-shadow`, which is theme-dependent and deliberately different in kind:

- **Dark:** `0 4px 30px rgb(0 0 0 / 0.20)` — depth by darkness.
- **Light:** `0 1px 2px rgb(12 17 28 / 0.04), 0 8px 24px rgb(12 17 28 / 0.06)` — a real, soft, two-part shadow. On paper a card must read as _elevation_, not as transparency.

### Grid gaps

`gap-4` (bento, icon grids) · `gap-6` (card grids) · `gap-8`/`gap-12` (multi-column layouts)

---

## 6. Effects

**Phase 1.** All effects are `@utility` declarations, not classes in `@layer base`. This matters: a class in `@layer base` loses to _every_ utility, which is exactly why cards today re-declare `border border-white/5` on top of `.glass-card`. As utilities they compose correctly and support variants (`md:glass`, `hover:glass`).

| Utility             | What it does                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `glass`             | Themed frosted surface. Dark = translucent dark, `blur(10px)`. Light = frosted white at 70%, `blur(16px)`, with a real shadow. |
| `glass-interactive` | Hover: raise background, accent border, add glow, `translateY(-2px)`.                                                          |
| `glow-accent`       | Copper bloom, multiplied by `--glow-strength`.                                                                                 |
| `bloom`             | The large blurred radial blob (replaces the hand-built `-top-20 -right-20 blur-3xl` div).                                      |
| `noise`             | Per-card film grain via `::after`. Blend mode flips: `overlay` on dark, `multiply` on paper.                                   |
| `grid-backdrop`     | The 40px grid lines with a radial mask, un-scoped so any section can use it.                                                   |
| `prose`             | Token-driven long-form typography.                                                                                             |

### The glow trick

`--glow-strength` is **`1` in dark and `0` in light**. Copper bloom on paper reads as dirt, so it multiplies to nothing — the same markup is correct in both themes with zero `dark:` variants:

```css
@utility glow-accent {
    box-shadow: 0 0 calc(30px * var(--glow-strength))
        color-mix(
            in oklab,
            var(--accent) calc(15% * var(--glow-strength)),
            transparent
        );
}
```

### Prose

`prose` is **hand-rolled on tokens**. `@tailwindcss/typography` is not installed and will not be, and `prose-invert` does not exist — the point of the semantic layer is that prose is correct in both themes with one class. It already styles `h2`–`h4`, `p`, `a`, `strong`, lists, `code`, `pre`, `blockquote`, `img` and `hr`, so it is MDX-ready on day one.

---

## 7. Component primitives

**Phase 3.** All live in `src/components/ui/` and are `.astro` (zero JS). React islands consume the same `@utility` classes, so nothing is duplicated. Variant→class logic is extracted to `src/components/ui/_variants.ts` as pure functions, which makes it unit-testable and shareable with the React components.

### `Section.astro`

`id?` · `as?: "section" | "div"` · `tone?: "base" | "subtle" | "surface"` · `width?: "prose" | "content" | "wide" | "full"` · `space?: "none" | "sm" | "md" | "lg"` · `backdrop?: "none" | "grid" | "bloom"` · `class?`

### `Card.astro`

The workhorse. One component covers bento cells, project cards, cert cards, timeline cards and skill chips.

`as?: "div" | "a" | "article" | "li" | "button"` · `href?` · `external?` (auto `target`/`rel`) · `variant?: "glass" | "solid" | "outline" | "ghost" | "chip"` · `pad?: "none" | "xs" | "sm" | "md" | "lg"` · `radius?: "sm" | "card" | "bento" | "panel" | "full"` · `interactive?` · `lift?: "none" | "y" | "x"` · `glow?` · `noise?` · `span?` (raw grid passthrough) · `dashed?` · `class?` · named slot `media`

| Use           | Props                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Bento cell    | `variant="glass" radius="bento" pad="sm" noise interactive span="md:col-span-2 md:row-span-2"` |
| Project card  | `variant="glass" radius="bento" pad="none" interactive glow`                                   |
| Cert card     | `variant="glass" radius="bento" pad="sm" interactive glow noise`                               |
| Timeline card | `variant="glass" radius="bento" pad="sm" interactive lift="x"`                                 |
| Skill chip    | `variant="chip"`                                                                               |

### `Button.astro`

`variant?: "primary" | "secondary" | "ghost" | "link"` · `size?: "sm" | "md" | "lg"` · `href?` · `download?` · `external?` · `type?` · `iconPosition?: "start" | "end"` (named slot `icon`) · `full?` · `class?`

`primary` is the amber fill — AA in **both** themes at 8.31:1. Minimum hit area is enforced at `min-h-11 min-w-11` under `@media (pointer: coarse)`.

### `Tag.astro`

`variant?: "neutral" | "accent" | "action" | "outline"` · `size?: "xs" | "sm"` · `as?: "span" | "li" | "button"`

`action` is the "current"/"new" badge and uses `--action-text`, never raw amber.

### `SectionHeading.astro`

`eyebrow?` · `title` · `accent?` (word rendered in `--accent`) · `level?: 2 | 3` · `description?` · `align?: "start" | "center"` · `rule?` · `action?: { href, label }`

### `PageHeader.astro`

`eyebrow?` · `title` · `accent?` · `description?` · slot `actions`. Used by every dedicated page, and the drop-in point for blog index and post pages.

### Others

`Prose.astro` (the MDX seam) · `Reveal.astro` · `ThemeToggle.astro` · `CertCard.astro` · `ProofBar.astro` · `CTASection.astro`

---

## 8. Motion

**Phase 5.**

### Reveal on scroll

**IntersectionObserver, not CSS scroll-driven animations.** `animation-timeline: view()` is still behind a flag in Firefox; authored naively that leaves ~3–5% of visitors looking at sections stuck at `opacity: 0`. For a recruiter-facing site a silently blank section is a catastrophic failure mode. IO is ~25 lines, universal, one-shot (`unobserve` after reveal), and needs no scroll handler.

Non-negotiable guard — without it, JS-disabled visitors see an empty page:

```css
html:not(.js) [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
}
```

The `js` class is added by the blocking theme script, so this costs no extra request and no flash.

### Durations & easing

`--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)`. Hover feedback `200–300ms`; reveals `600ms`; stagger `80ms` per index, capped at ~5 steps.

### Reduced motion — three layers

1. **Global kill switch** in `@layer base` clamping all durations. Safety net, not the strategy.
2. **Explicit opt-outs** via `motion-safe:` for things that must not merely be fast but must not _exist_ — `animate-ping`, `animate-pulse`. Each keeps a correct resting state: the "current role" dot stays amber and solid, it just stops pinging. **The signal must survive.**
3. **JS short-circuits** — the IO script, scroll-to-top behaviour, the mobile menu transition.

**Never animate body text.** Pulsing text is a WCAG 2.2.2 (blinking content) issue regardless of motion preference.

**Never transition page-level background color on theme change.** A 300ms full-screen crossfade is a known vestibular trigger. The theme flip is instant.

---

## 9. Accessibility contract

Non-negotiables. A change that breaks one of these does not ship.

- **Contrast:** every token pair ≥4.5:1 in both themes, enforced by `tokens.test.ts`.
- **Focus:** `outline: 2px solid var(--accent); outline-offset: 2px` — an outline, not `ring` + `ring-offset`. Ring offset needs a matching background color and breaks the instant the theme flips; `outline-offset` is theme-agnostic.
- **Touch targets:** ≥44×44 under `@media (pointer: coarse)`.
- **No hover-only information.** Anything revealed on hover must also be reachable by keyboard (`focus-within`) or shown outright on touch. Tooltips are never the only carrier of content.
- **Keyboard:** every interactive element reachable and operable. Dialogs and menus trap focus and restore it on close.
- **Semantics over ARIA theatre.** `role="menu"` without arrow-key navigation is an accessibility lie — either implement the pattern fully or use plain links.
- **Toggles:** binary controls use `role="switch"` + `aria-checked`, with a **static** `aria-label`. Never flip the label text — that makes screen readers announce a changed name mid-interaction.
- **Current page:** `aria-current="page"`, computed server-side from `Astro.url.pathname`.
- **No JS:** all content visible, navigation functional, theme defaults to dark.

---

## 10. Rules for contributors

1. **No raw hex in `src/`** outside `tokens.css` and the brand colors in `utils/skills.ts`. A guard test enforces this.
2. **No `dark:` for color.** If a color needs to differ per theme, add or fix a token.
3. **No new one-off card/button markup.** Extend a primitive's variants instead. If a variant does not fit, that is a design-system conversation, not a local override.
4. **No `min-h-[Nvh]` on sections**, no `scroll-snap`.
5. **No gradient text.**
6. **Any new color pair must be added to `tokens.test.ts`.**
7. When something here is wrong, **fix this document in the same PR.** A stale design system is how the previous one eroded.

---

## 11. References

- Future features and the design requirements each imposes: [ROADMAP.md](./ROADMAP.md)
- Project architecture and conventions: [../AGENTS.md](../AGENTS.md)
- Setup and content authoring: [../README.md](../README.md)
