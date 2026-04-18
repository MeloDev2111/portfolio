# 🐺 Melodev Portfolio

![Build Status](https://img.shields.io/github/actions/workflow/status/MeloDev2111/portfolio/master-pipeline.yml?label=Deploy&style=flat-square)
![License](https://img.shields.io/github/license/MeloDev2111/portfolio?style=flat-square)
![Version](https://img.shields.io/github/package-json/v/MeloDev2111/portfolio?color=blue&style=flat-square)

A high-performance, accessible, and internationalized personal portfolio website built for a Backend Developer & Data Science enthusiast. Designed with a "Dark Industrial Gold" aesthetic and focused on showcasing technical depth.

## 🚀 Tech Stack

- **Framework:** [Astro 5](https://astro.build/) - High-performance static site generation.
- **UI Library:** [React 19](https://react.dev/) - For interactive components.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
- **Testing:** [Vitest](https://vitest.dev/) - Blazing fast unit testing.
- **i18n:** Native Astro Internationalization (English, Spanish & Japanese).
- **Deployment:** GitHub Pages via GitHub Actions.

## ✨ Features

- **⚡ Blazing Fast:** Statically generated for optimal performance (Lighthouse 95+).
- **🌍 Internationalization (i18n):** Full support for English (`/en`), Spanish (`/es`), and Japanese (`/ja`).
- **🎨 Custom Design System:** "Dark Industrial Gold" theme with Bento Grid layouts.
- **📱 Responsive:** Mobile-first design approach.
- **🤖 Automated Releases:** Semantic versioning and changelog generation using `release-it`.

## 🛠️ Project Structure

```text
/
├── .github/workflows/   # CI/CD pipelines
├── public/              # Static assets (images, fonts, resume.pdf)
├── src/
│   ├── assets/          # Optimized assets (processed by Astro)
│   ├── components/      # UI Components
│   │   ├── astro/       # Static components (Hero, Header, Footer)
│   │   └── react/       # Interactive components (ProjectGrid, Filters)
│   ├── content/         # Content Collections (Data source)
│   │   ├── certifications/ # JSON data for certifications
│   │   └── projects/    # Markdown files for projects (en/es)
│   ├── i18n/            # Internationalization logic
│   │   ├── ui.ts        # UI labels and translations
│   │   └── utils.ts     # Path and locale helpers
│   ├── layouts/         # Page layouts (Layout.astro)
│   ├── pages/           # File-based routing
│   │   ├── [lang]/      # Localized pages wrapper (en/es)
│   │   ├── 404.astro    # Custom 404 error page
│   │   └── index.astro  # Root redirect
│   ├── styles/          # Global styles (Tailwind imports)
│   ├── tests/           # Unit tests (Vitest)
│   └── utils/           # Helper functions (cv, skills, social)
├── astro.config.mjs     # Astro configuration
└── tailwind.config.mjs  # Tailwind configuration
```

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

1.  Open `src/content/certifications/certs.json`.
2.  Add a new entry to the array:
    ```json
    {
        "name": "Certification Name",
        "issuer": "Provider (e.g., AWS)",
        "date": "2024-01-01",
        "link": "https://credly.com/...",
        "badge": "https://images.credly.com/...",
        "starred": true // Highlights in Hero section
    }
    ```

### Adding Work Experience

1.  Open `src/utils/experience.ts`.
2.  Add a new entry to the `EXPERIENCE` array:
    ```typescript
    {
        company: "Company Name",
        role: "Job Title",
        startDate: "YYYY-MM",
        endDate: "YYYY-MM", // or "Present",
        description: {
            en: "Description in English.",
            es: "Descripción en Español."
        },
        technologies: ["React", "TypeScript", "Node.js"],
        current: true, // or false
        logo: "/logos/company.png" // Optional
    }
    ```
    **Note regarding Logos:**
    - The system automatically checks if the file exists in `public/logos/`.
    - If the file exists, it will be displayed.
    - If it's missing or undefined, a premium placeholder with the company's initial will be shown automatically.

### Adding a New Language

1.  **Configure Locale:** In `astro.config.mjs`, add the language code to `i18n.locales`.
2.  **Add UI Labels:** In `src/i18n/ui.ts`:
    - Add the code and display name to the `languages` object.
    - Add a new dictionary entry in the `ui` object (be sure to include `nav.langName`).
3.  **Localize Content:**
    - Create localized project files in `src/content/projects/[lang]/`.
    - Add localized descriptions in `src/utils/experience.ts`.
4.  **Verify:** Run `npm run test` to verify routing logic.

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Installs dependencies                       |
| `npm run dev`     | Starts local dev server at `localhost:4321` |
| `npm run build`   | Build your production site to `./dist/`     |
| `npm run preview` | Preview your build locally                  |
| `npm run test`    | Run unit tests with Vitest                  |
| `npm run lint`    | Check for linting errors                    |
| `npm run format`  | Fix formatting issues with Prettier         |
| `npm run release` | Create a new release (tag + changelog)      |

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add some amazing feature'`).
4.  **Run Tests:** Ensure all tests pass (`npm run test`).
5.  **Lint Check:** Verify code quality (`npm run lint`).
6.  **Format Code:** Fix styling issues automatically (`npm run format`).
7.  Push to the branch (`git push origin feature/amazing-feature`).
8.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ by [MeloDev2111](https://github.com/MeloDev2111)
