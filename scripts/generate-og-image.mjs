/**
 * Generates public/media/og-image.png (1200x630) from the master logo.
 *
 * Usage: node scripts/generate-og-image.mjs
 *
 * Text is rendered with Space Grotesk (name) and Inter (role/tagline). SVG text
 * needs the fonts installed, so the script registers them with fontconfig:
 * it uses scripts/.fonts/ (re-running itself with FONTCONFIG_FILE set) and downloads the TTFs there on first run
 * (git-ignored, SIL OFL licensed). If you cannot download them, drop the
 * files listed in FONTS into scripts/.fonts/ manually, or capture
 * scripts/og-template.html with a browser instead.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const fontsDir = path.join(root, "scripts", ".fonts");

const FONTS = {
    "Inter-500.ttf":
        "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf",
    "Inter-600.ttf":
        "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
    "SpaceGrotesk-700.ttf":
        "https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf",
};

const COLORS = {
    gunmetal: "#0c111c",
    charcoal: "#1f2937",
    platinum: "#e1e1e0",
    moon: "#f1de76",
    wolf: "#47505c",
    muted: "#a3a3ad", // 7.5:1 on gunmetal (AA for text)
};

const TEXT = {
    name: "Melio Diaz",
    role: "Software Engineer",
    tagline: "Cloud · Data · Architecture",
};

async function ensureFonts() {
    fs.mkdirSync(fontsDir, { recursive: true });
    for (const [file, url] of Object.entries(FONTS)) {
        const dest = path.join(fontsDir, file);
        if (fs.existsSync(dest)) continue;
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`Could not download ${file} (${res.status})`);
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    }
    const conf = path.join(fontsDir, "fonts.conf");
    const dir = fontsDir.replace(/\\/g, "/");
    fs.writeFileSync(
        conf,
        `<?xml version="1.0"?><!DOCTYPE fontconfig SYSTEM "fonts.dtd"><fontconfig><dir>${dir}</dir><cachedir>${dir}/cache</cachedir></fontconfig>\n`,
    );
    return conf;
}

async function generateOgImage() {
    // fontconfig reads FONTCONFIG_FILE from the real process environment, so on
    // the first pass we re-run ourselves with it set instead of assigning to
    // process.env (which is not visible to native code on every platform).
    if (!process.env.FONTCONFIG_FILE) {
        const conf = await ensureFonts();
        const result = spawnSync(
            process.execPath,
            [fileURLToPath(import.meta.url)],
            {
                stdio: "inherit",
                env: { ...process.env, FONTCONFIG_FILE: conf },
            },
        );
        process.exit(result.status ?? 1);
    }
    const { default: sharp } = await import("sharp");

    const width = 1200;
    const height = 630;

    const logoSvg = fs.readFileSync(
        path.join(root, "public", "media", "logo.svg"),
        "utf-8",
    );
    const innerLogo = (
        logoSvg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)?.[1] ?? ""
    ).replace(/<title>[\s\S]*?<\/title>/, "");

    const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="glow" cx="80%" cy="20%" r="60%">
                <stop offset="0%" stop-color="${COLORS.moon}" stop-opacity="0.18" />
                <stop offset="60%" stop-color="${COLORS.moon}" stop-opacity="0.02" />
                <stop offset="100%" stop-color="${COLORS.gunmetal}" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="subtleGlow" cx="20%" cy="80%" r="50%">
                <stop offset="0%" stop-color="${COLORS.wolf}" stop-opacity="0.3" />
                <stop offset="100%" stop-color="${COLORS.gunmetal}" stop-opacity="0" />
            </radialGradient>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${COLORS.wolf}" stroke-width="0.75" stroke-opacity="0.25" />
            </pattern>
        </defs>

        <rect width="${width}" height="${height}" fill="${COLORS.gunmetal}" />
        <rect width="${width}" height="${height}" fill="url(#glow)" />
        <rect width="${width}" height="${height}" fill="url(#subtleGlow)" />
        <rect width="${width}" height="${height}" fill="url(#grid)" />

        <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="24" fill="none" stroke="${COLORS.moon}" stroke-width="1.5" stroke-opacity="0.2" />

        <!-- Logo on the left -->
        <g transform="translate(90, 165)">
            <rect x="-20" y="-20" width="340" height="340" rx="28" fill="${COLORS.charcoal}" fill-opacity="0.4" stroke="${COLORS.platinum}" stroke-opacity="0.1" stroke-width="1.5" />
            <g transform="scale(0.63)">
                ${innerLogo}
            </g>
        </g>

        <!-- Text on the right -->
        <g transform="translate(460, 0)">
            <text x="0" y="285" font-family="Space Grotesk" font-size="80" font-weight="700" fill="${COLORS.platinum}" letter-spacing="-1">${TEXT.name}</text>
            <rect x="0" y="315" width="64" height="4" rx="2" fill="${COLORS.moon}" />
            <text x="0" y="372" font-family="Inter" font-size="34" font-weight="600" fill="${COLORS.moon}">${TEXT.role}</text>
            <text x="0" y="420" font-family="Inter" font-size="24" font-weight="500" fill="${COLORS.muted}" letter-spacing="0.5">${TEXT.tagline}</text>
        </g>
    </svg>
    `;

    const outPath = path.join(root, "public", "media", "og-image.png");
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outPath);

    console.log(`Generated OG Image at ${outPath}`);
}

generateOgImage().catch((err) => {
    console.error(err);
    process.exit(1);
});
