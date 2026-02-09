// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: process.env.SITE_URL || "https://melodev2111.github.io",
    base: process.env.BASE_PATH || "/portfolio",
    integrations: [react()],

    // Internationalization strategy
    i18n: {
        defaultLocale: "en",
        locales: ["en", "es"],
        routing: {
            prefixDefaultLocale: true, // /en/ and /es/ for consistency, or false for root
        },
    },

    // Image optimization
    image: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.credly.com",
            },
            {
                protocol: "https",
                hostname: "cdn.jsdelivr.net",
            },
        ],
        service: {
            entrypoint: "astro/assets/services/sharp",
        },
    },

    vite: {
        plugins: [tailwindcss()],
        resolve: {
            // Resolve alias for cleaner imports
            alias: {
                "@": "/src",
            },
        },
    },
});
