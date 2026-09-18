import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

async function generateOgImage() {
    const width = 1200;
    const height = 630;

    const logoPath = path.join(process.cwd(), "public", "media", "logo.svg");
    const logoSvg = fs.readFileSync(logoPath, "utf-8");

    // Extract inner SVG elements of logo
    const innerLogoMatch = logoSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i);
    const innerLogo = innerLogoMatch ? innerLogoMatch[1] : "";

    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="glow" cx="80%" cy="20%" r="60%">
                <stop offset="0%" stop-color="#c08b5a" stop-opacity="0.25" />
                <stop offset="60%" stop-color="#c08b5a" stop-opacity="0.03" />
                <stop offset="100%" stop-color="#0c111c" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="subtleGlow" cx="20%" cy="80%" r="50%">
                <stop offset="0%" stop-color="#5a5866" stop-opacity="0.2" />
                <stop offset="100%" stop-color="#0c111c" stop-opacity="0" />
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#818d90" stroke-width="0.75" stroke-opacity="0.08" />
            </pattern>
        </defs>

        <!-- Base Background -->
        <rect width="${width}" height="${height}" fill="#0c111c" />

        <!-- Radial Glows -->
        <rect width="${width}" height="${height}" fill="url(#glow)" />
        <rect width="${width}" height="${height}" fill="url(#subtleGlow)" />

        <!-- Grid Pattern -->
        <rect width="${width}" height="${height}" fill="url(#grid)" />

        <!-- Outer Frame -->
        <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="#c08b5a" stroke-width="1.5" stroke-opacity="0.2" />

        <!-- Logo Container on Left -->
        <g transform="translate(90, 165)">
            <!-- Glass effect card for logo -->
            <rect x="-20" y="-20" width="340" height="340" rx="28" fill="#1F2937" fill-opacity="0.4" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1.5" />
            <g transform="translate(0, 0) scale(0.63)">
                ${innerLogo}
            </g>
        </g>

        <!-- Content on Right -->
        <g transform="translate(460, 160)">
            <!-- Pill badge -->
            <rect x="0" y="0" width="220" height="36" rx="18" fill="#c08b5a" fill-opacity="0.12" stroke="#c08b5a" stroke-width="1" stroke-opacity="0.4" />
            <text x="110" y="23" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700" fill="#c08b5a" text-anchor="middle" letter-spacing="1.5">PORTFOLIO &amp; ARCHIVE</text>

            <!-- Main Name -->
            <text x="0" y="95" font-family="'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="700" fill="#e1e1e0" letter-spacing="-0.5">
                Melio Diaz <tspan fill="#c08b5a">.</tspan>
            </text>

            <!-- Role -->
            <text x="0" y="145" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="600" fill="#c08b5a">
                Software Engineer &amp; Architect
            </text>

            <!-- Bio / Specialty -->
            <text x="0" y="200" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" letter-spacing="0.2">
                High-Scalability Platforms • Cloud Computing • Data Science
            </text>

            <!-- Tech Badges -->
            <g transform="translate(0, 240)">
                <!-- Tag 1 -->
                <rect x="0" y="0" width="130" height="32" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
                <text x="65" y="21" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#e1e1e0" text-anchor="middle">Java &amp; Spring</text>

                <!-- Tag 2 -->
                <rect x="142" y="0" width="120" height="32" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
                <text x="202" y="21" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#e1e1e0" text-anchor="middle">AWS Cloud</text>

                <!-- Tag 3 -->
                <rect x="274" y="0" width="120" height="32" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
                <text x="334" y="21" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#e1e1e0" text-anchor="middle">TypeScript</text>

                <!-- Tag 4 -->
                <rect x="406" y="0" width="110" height="32" rx="8" fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
                <text x="461" y="21" font-family="'Inter', sans-serif" font-size="13" font-weight="500" fill="#e1e1e0" text-anchor="middle">Python</text>
            </g>

            <!-- Bottom URL -->
            <text x="0" y="315" font-family="'Inter', sans-serif" font-size="14" font-weight="500" fill="#5a5866" letter-spacing="1">
                MELODEV2111.GITHUB.IO/PORTFOLIO
            </text>
        </g>
    </svg>
    `;

    const outPath = path.join(process.cwd(), "public", "media", "og-image.png");
    await sharp(Buffer.from(svg)).png({ quality: 95 }).toFile(outPath);

    console.log(`Generated OG Image at ${outPath}`);
}

generateOgImage().catch(console.error);
