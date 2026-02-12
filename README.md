# 🐺 Melodev Portfolio

![Build Status](https://img.shields.io/github/actions/workflow/status/MeloDev2111/portfolio/master-pipeline.yml?label=Deploy&style=flat-square)
![License](https://img.shields.io/github/license/MeloDev2111/portfolio?style=flat-square)
![Version](https://img.shields.io/badge/version-0.5.0-blue?style=flat-square)

A high-performance, accessible, and internationalized personal portfolio website built for a Backend Developer & Data Science enthusiast. Designed with a "Dark Industrial Gold" aesthetic and focused on showcasing technical depth.

## 🚀 Tech Stack

- **Framework:** [Astro 5](https://astro.build/) - High-performance static site generation.
- **UI Library:** [React 19](https://react.dev/) - For interactive components.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework.
- **Testing:** [Vitest](https://vitest.dev/) - Blazing fast unit testing.
- **i18n:** Native Astro Internationalization (English & Spanish).
- **Deployment:** GitHub Pages via GitHub Actions.

## ✨ Features

- **⚡ Blazing Fast:** Statically generated for optimal performance (Lighthouse 95+).
- **🌍 Internationalization (i18n):** Full support for English (`/en`) and Spanish (`/es`).
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
| `npm run release` | Create a new release (tag + changelog)      |

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: add some amazing feature'`).
4.  **Run Tests:** Ensure all tests pass (`npm run test`).
5.  **Lint Check:** Verify code quality (`npm run lint`).
6.  Push to the branch (`git push origin feature/amazing-feature`).
7.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> Built with ❤️ by [MeloDev2111](https://github.com/MeloDev2111)
