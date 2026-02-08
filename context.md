# Project Context: Personal Professional Portfolio

## 1. Project Philosophy & Goals

- **Objective:** Create a high-performance personal portfolio to consolidate professional branding for a Systems Engineer specializing in Backend (Java/Spring), Cloud (AWS) and really interested in Data Science.
- **Target Audience:** Technical recruiters (EdTech, Digital Transformation, Bank), HR managers, and potential academic institutions.
- **Key Vibe:** "Warm Minimalism". Professional but approachable. Not cold corporate, not chaotic creative.
- **Primary Language:** English (default) with Spanish support (i18n architecture ready from day 1).

## 2. Tech Stack & Architecture

- **Framework:** Astro (latest version). Chosen for SSG capabilities, speed, and built-in i18n.
- **UI Library:** React (for interactive components only).
- **Styling:** Tailwind CSS (utility-first, easy to maintain design system).
- **Deployment:** GitHub Pages (Static Site Generation).
- **Package Manager:** pnpm (fast and efficient).
- **Content Management:** Markdown/MDX for blog posts and project descriptions (easy to migrate later).

## 3. Core Content Structure

1.  **Hero Section:** Strong value proposition + "Download CV" CTA.
2.  **About Me:** Brief professional summary (Systems Engineer, 24yo, Focus on Backend/Cloud/Data Science).
3.  **Certifications (Star Content):** Dedicated section with verifiable badges (AWS AI Practitioner, Java, etc.).
4.  **Projects:** Grid layout card system. Links to GitHub repos.
    - _Highlight:_ InmoFolio (Real Estate App).
5.  **Tech Stack:** Visual representation of skills (Java, Spring Boot, AWS, Docker, Python, etc.).
6.  **Footer:** Social links (LinkedIn, GitHub) + Copyright.

## 4. Design System Guidelines ("Dark Industrial Gold")

- **Visual Identity:** - A sophisticated Dark Mode aesthetic, mixed with a personal brand identity based on "Moon" or "Wolf" iconography and warm accents.
- **Color Palette:**
    - **Backgrounds:** Deep Gunmetal / Charcoal (e.g., `#111827` or `#0B0C10`). NOT pure black.
    - **Cards/Surfaces:** Slightly lighter grey with subtle borders (e.g., `#1F2937`).
    - **Primary Accent (Brand):** Mustard/Golden Yellow (derived from personal logo) for CTAs, buttons, and highlights (e.g., `#F4D03F` or `#FFC107`).
    - **Text:** Crisp White/Light Grey for readability (`#F9FAFB`) to contrast against the dark background.
- **Typography:**
    - **Headings:** Modern, bold Sans-Serif (e.g., 'Space Grotesk' or 'Outfit') to give a tech/engineering feel.
    - **Body:** Highly readable Sans-Serif (e.g., 'Inter' or 'Public Sans').
- **UI Patterns:**
    - **Bento Grid Layout:** Use a card-based grid system (like the 'Quantix' reference) to organize projects and skills cleanly.
    - **Glassmorphism (Subtle):** Very slight transparency on navigation bars or floating elements.
    - **Glow Effects:** Subtle yellow/gold glows behind key elements (like the "Wolf" logo or the Moon) to mimic the warmth of the reference art.

## 5. Development Constraints & Rules

- **Performance:** Lighthouse score must be 95+ in all categories.
- **Responsiveness:** Mobile-first approach.
- **Code Quality:** strict TypeScript. No `any`.
- **Images:** All assets must be optimized (WebP format).
- **Internationalization:** Use Astro's `i18n` routing. Content files must be split by locale (e.g., `src/content/blog/en/` and `src/content/blog/es/`).
