/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                gunmetal: "#0c111c", // Deep Gunmetal
                charcoal: "#1F2937", // Keep as secondary surface
                gold: "#c08b5a", // Antique Copper (aliased as 'gold' to maintain compatibility)
                light: "#e1e1e0", // Platinum
                copper: "#c08b5a", // Explicit alias
                slate: "#5a5866", // Secondary accent
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                heading: ["Space Grotesk", "sans-serif"],
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
        },
    },
    plugins: [],
};
