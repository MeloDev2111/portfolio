# 🐺 Melodev Portfolio

![Build Status](https://img.shields.io/github/actions/workflow/status/MeloDev2111/portfolio/master-pipeline.yml?label=Deploy&style=flat-square)
![License](https://img.shields.io/github/license/MeloDev2111/portfolio?style=flat-square)
![Version](https://img.shields.io/github/package-json/v/MeloDev2111/portfolio?color=blue&style=flat-square)

A high-performance, accessible, and internationalized personal portfolio website built for a Backend Developer & Data Science enthusiast. Designed with a "Dark Industrial Gold" aesthetic (moon yellow and wolf slate, derived from the logo) and focused on showcasing technical depth.

## 🚀 Tech Stack

- **Framework:** [Astro 7](https://astro.build/) - High-performance static site generation.
- **UI Library:** [React 19](https://react.dev/) - For interactive components.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
- **Testing:** [Vitest](https://vitest.dev/) - Blazing fast unit testing.
- **i18n:** Native Astro Internationalization (English, Spanish & Japanese).
- **Deployment:** GitHub Pages via GitHub Actions, served at [meliodiaz.com](https://meliodiaz.com).

## ✨ Features

- **⚡ Blazing Fast:** Statically generated for optimal performance (Lighthouse 95+).
- **🌍 Internationalization (i18n):** Full support for English (`/en`), Spanish (`/es`), and Japanese (`/ja`).
- **🎨 Custom Design System:** "Dark Industrial Gold" theme (moon + wolf palette) with Bento Grid layouts.
- **🔎 SEO:** Canonical URLs, hreflang, JSON-LD, sitemap, robots.txt and localized Open Graph tags.
- **📱 Responsive:** Mobile-first design approach.
- **🤖 Automated Releases:** Every merge to `master` publishes a release: version bump from Conventional Commits with `release-it`, changelog with `auto-changelog`. See [CHANGELOG.md](CHANGELOG.md).

## 🛠️ Project Structure

Folder layout, conventions and design rules live in [AGENTS.md](AGENTS.md). What is planned next is in [docs/ROADMAP.md](docs/ROADMAP.md).

## 📝 Content Management

### Adding a New Project

1.  **Add Master File (English):**
    Create a `.md` file in `src/content/projects/en/my-project.md`:
    ```markdown
    ---
    title: "Project Name"
    description: "Brief description in English."
    tags: ["React", "TypeScript"]
    date: 2024-01-01
    featured: true # Shows in Home & Top of Projects
    inProgress: false # Adds 'In Construction' badge
    link: "https://github.com/..."
    image: "../../../assets/projects/my-image.png" # OR project-placeholder.svg
    ---
    ```
2.  **Add Translation (Spanish - Optional):**
    Create a file in `src/content/projects/es/my-project.md` with **ONLY** the fields to override:
    ```markdown
    ---
    title: "Nombre del Proyecto"
    description: "Descripción breve en Español."
    ---
    ```
    _Note: Metadata like tags, date, and image are inherited from the English file._

### Adding a Certification

1. Create a new `.json` file in `src/content/certifications/<cert-id>.json` (e.g., `aws-cloud-practitioner.json`):
    ```json
    {
        "name": "Certification Name",
        "issuer": "Provider (e.g., Amazon Web Services)",
        "date": "YYYY-MM-DD",
        "url": "https://credly.com/...",
        "badge": "https://images.credly.com/...",
        "starred": true
    }
    ```
    _Note: `url`, `badge`, and `starred` are optional. Setting `starred: true` highlights the certification in the Hero Bento grid and Featured sections._

### Adding Work Experience

Experience is grouped by company in `src/utils/experience.ts` (newest first, both companies and roles).

1.  **New role in an existing company** (for example a promotion, or a new client at a consultancy): set an `end` date on the current role and add the new one on top of that company's `roles`.
2.  **New company:** add an entry at the top of the `EXPERIENCE` array:

    ```typescript
    {
        company: "Company Name",
        logo: "/logos/company.png", // Optional symbol in public/logos
        kind: { en: "Technology consultancy", es: "Consultora tecnológica" },
        location: { en: "Lima, Peru", es: "Lima, Perú" },
        roles: [
            {
                title: "Job Title",
                start: "YYYY-MM",
                end: "Present", // or "YYYY-MM"
                assignment: {
                    kind: "client", // or "project"
                    value: { en: "Client or project", es: "Cliente o proyecto" },
                },
                summary: { en: "One line headline.", es: "Frase resumen." },
                highlights: {
                    en: ["Achievement with a **key figure**."],
                    es: ["Logro con una **cifra clave**."],
                },
                technologies: ["React", "TypeScript"],
            },
        ],
    }
    ```

    _Notes: `ja` texts are optional and fall back to English. Wrap key figures in `**bold**`. Durations are computed like LinkedIn does (start and end month both count) and the "years of experience" line is calculated from the first role._

    **Note regarding Logos:**
    - Use the company symbol (square), not the full wordmark. It is shown on a light tile.
    - If the file is missing or undefined, a placeholder with the company's initial is shown automatically.

### Adding a New Language

1.  **Configure Locale:** In `astro.config.mjs`, add the language code to `i18n.locales`.
2.  **Add UI Labels:** In `src/i18n/ui.ts`:
    - Add the code and display name to the `languages` object.
    - Add a new dictionary entry in the `ui` object (be sure to include `nav.langName`).
3.  **Localize Content:**
    - Create localized project files in `src/content/projects/[lang]/`.
    - Add the optional `ja`/new language texts in `src/utils/experience.ts` (it falls back to English).
4.  **Verify:** Run `pnpm test` to verify routing logic.

## 🧞 Commands

All commands are run from the root of the project:

> **Note:** This project uses `pnpm` (v12+) as its package manager. Native build script permissions (e.g. `esbuild`) are managed via `pnpm-workspace.yaml` (`allowBuilds`).

| Command        | Action                                      |
| :------------- | :------------------------------------------ |
| `pnpm install` | Installs dependencies                       |
| `pnpm dev`     | Starts local dev server at `localhost:4321` |
| `pnpm build`   | Build your production site to `./dist/`     |
| `pnpm preview` | Preview your build locally                  |
| `pnpm test`    | Run unit tests with Vitest                  |
| `pnpm check`   | Validate types with Astro Check             |
| `pnpm lint`    | Check for linting and formatting errors     |
| `pnpm format`  | Fix formatting issues with Prettier         |
| `pnpm release` | Create a new release (tag + changelog)      |

Before opening a PR, run `pnpm lint`, `pnpm test` and `pnpm format`.

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome! Check [docs/ROADMAP.md](docs/ROADMAP.md) for open items and read [AGENTS.md](AGENTS.md) for the architecture and rules.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) (`git commit -m 'feat: add some amazing feature'`).
4.  **Run Tests:** Ensure all tests pass (`pnpm test`).
5.  **Lint Check:** Verify code quality (`pnpm lint`).
6.  **Format Code:** Fix styling issues automatically (`pnpm format`).
7.  Push to the branch (`git push origin feature/amazing-feature`).
8.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ by [MeloDev2111](https://github.com/MeloDev2111)
