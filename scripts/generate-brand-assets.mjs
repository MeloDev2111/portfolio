/**
 * Generates every derived brand asset from the master logo (public/media/logo.svg):
 *   - public/media/brand/logo-{dark-bg,light-bg,mono-dark,mono-light}.svg
 *   - public/favicon.svg, favicon.ico (16/32/48), apple-touch-icon.png, icon-192.png, icon-512.png
 *
 * Usage: node scripts/generate-brand-assets.mjs
 * The master logo is never modified. Colors come from the brand palette (see AGENTS.md).
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const brandDir = path.join(publicDir, "media", "brand");

const COLORS = {
    moon: "#F1DE76",
    wolf: "#47505C",
    gunmetal: "#0c111c",
    platinum: "#e1e1e0",
    // Light-background variant: darker moon (3.25:1 on white) and charcoal wolf
    moonOnLight: "#B8860B",
    wolfOnLight: "#1F2937",
};

const TITLE = "MeloDev logo: a wolf inside the moon";

// --- Master logo parsing -------------------------------------------------
const master = fs.readFileSync(
    path.join(publicDir, "media", "logo.svg"),
    "utf-8",
);
const svgTag = master.match(/<svg[^>]*>/)[0];
const viewBox = svgTag.match(/viewBox="([^"]+)"/)[1];
const paths = [...master.matchAll(/<path fill="([^"]+)" d="([^"]+)"\/>/g)].map(
    ([, fill, d]) => ({ fill, d }),
);

function logoSvg(mapFill) {
    const body = paths
        .map(({ fill, d }) => {
            const next = mapFill(fill);
            return next ? `<path fill="${next}" d="${d}"/>` : "";
        })
        .join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="473" height="459" fill="none" viewBox="${viewBox}"><title>${TITLE}</title>${body}</svg>\n`;
}

function writeBrandVariants() {
    fs.mkdirSync(brandDir, { recursive: true });
    const out = {
        "logo-dark-bg.svg": logoSvg((f) => f),
        "logo-light-bg.svg": logoSvg((f) =>
            f === COLORS.moon ? COLORS.moonOnLight : COLORS.wolfOnLight,
        ),
        // Monochrome: the moon is the silhouette, the wolf is negative space.
        "logo-mono-dark.svg": logoSvg((f) =>
            f === COLORS.moon ? COLORS.gunmetal : null,
        ),
        "logo-mono-light.svg": logoSvg((f) =>
            f === COLORS.moon ? COLORS.platinum : null,
        ),
    };
    for (const [name, svg] of Object.entries(out)) {
        fs.writeFileSync(path.join(brandDir, name), svg);
    }
}

// --- Simplified symbol (favicon) -----------------------------------------
// Hand-simplified wolf-in-moon: no fur tufts, circular moon, one solid wolf
// silhouette. Coordinates are in a 1000x1000 space.
const SYMBOL = {
    moon: { cx: 500, cy: 500, r: 490 },
    wolf: "M500 114 L505 187 L548 157 L528 252 C568 267 628 302 663 377 L833 480 C788 532 748 567 708 577 C648 587 568 562 488 547 C438 542 398 562 345 622 C388 652 438 682 463 702 C478 732 478 767 533 812 L518 922 L535 1000 L180 1000 L68 692 L53 492 L148 322 L318 212 Z",
    eye: "M500 352 C520 340 562 346 580 366 C598 384 598 392 580 390 C556 388 520 366 500 352 Z",
};

function symbolSvg({ background = null, scale = 1 } = {}) {
    const { cx, cy, r } = SYMBOL.moon;
    const size = 1000;
    const s = scale;
    const offset = (size - size * s) / 2;
    const bg = background
        ? `<rect width="${size}" height="${size}" fill="${background}"/>`
        : "";
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">` +
        bg +
        `<g transform="translate(${offset} ${offset}) scale(${s})">` +
        `<defs><clipPath id="m"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>` +
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${COLORS.moon}"/>` +
        `<g clip-path="url(#m)"><path fill="${COLORS.wolf}" d="${SYMBOL.wolf}"/></g>` +
        `<path fill="${COLORS.moon}" d="${SYMBOL.eye}"/>` +
        `</g></svg>\n`
    );
}

const png = (svg, size) =>
    sharp(Buffer.from(svg), { density: 384 })
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer();

// ICO container holding PNG-compressed entries.
function buildIco(entries) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(entries.length, 4);
    let offset = 6 + entries.length * 16;
    const dirs = entries.map(({ size, data }) => {
        const dir = Buffer.alloc(16);
        dir.writeUInt8(size >= 256 ? 0 : size, 0);
        dir.writeUInt8(size >= 256 ? 0 : size, 1);
        dir.writeUInt16LE(1, 4);
        dir.writeUInt16LE(32, 6);
        dir.writeUInt32LE(data.length, 8);
        dir.writeUInt32LE(offset, 12);
        offset += data.length;
        return dir;
    });
    return Buffer.concat([header, ...dirs, ...entries.map((e) => e.data)]);
}

async function writeFavicons() {
    const transparent = symbolSvg();
    fs.writeFileSync(path.join(publicDir, "favicon.svg"), transparent);

    const ico = await Promise.all(
        [16, 32, 48].map(async (size) => ({
            size,
            data: await png(transparent, size),
        })),
    );
    fs.writeFileSync(path.join(publicDir, "favicon.ico"), buildIco(ico));

    // Opaque icons: iOS paints transparency black, and 0.8 scale keeps the
    // symbol inside the maskable safe zone for the PWA sizes.
    const opaque = symbolSvg({ background: COLORS.gunmetal, scale: 0.8 });
    fs.writeFileSync(
        path.join(publicDir, "apple-touch-icon.png"),
        await png(opaque, 180),
    );
    fs.writeFileSync(
        path.join(publicDir, "icon-192.png"),
        await png(opaque, 192),
    );
    fs.writeFileSync(
        path.join(publicDir, "icon-512.png"),
        await png(opaque, 512),
    );
}

if (
    process.argv[1] &&
    import.meta.url.endsWith(path.basename(process.argv[1]))
) {
    const only = process.argv[2];
    if (only !== "favicons") writeBrandVariants();
    if (only !== "variants") await writeFavicons();
    console.log("Brand assets generated.");
}
