/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                gunmetal: "#111827",
                charcoal: "#1F2937",
                gold: "#F4D03F",
                light: "#F9FAFB",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Space Grotesk", "sans-serif"],
            },
        },
    },
    plugins: [],
};
