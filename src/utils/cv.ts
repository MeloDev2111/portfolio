import fs from "node:fs";
import path from "node:path";

export interface CVDetails {
    url: string;
    filename: string;
    lang: string;
}

/**
 * Resolves the path and URL for the CV based on the requested language.
 * Falls back to English if the localized version is not found.
 *
 * @param lang The requested language code (e.g., 'en', 'es')
 * @returns Object containing the CV URL, download filename, and the resolved language
 */
export function getCVDetails(lang: string): CVDetails {
    // Check if localized CV exists, fallback to English if not
    const cvPath = path.join(process.cwd(), "public", "cv", `cv-${lang}.pdf`);
    const cvExists = fs.existsSync(cvPath);
    const cvLang = cvExists ? lang : "en";

    const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
    const cvUrl = `${baseUrl}/cv/cv-${cvLang}.pdf`;
    const cvFilename = `Cv_Melio_Diaz_${cvLang.toLowerCase()}.pdf`;

    return {
        url: cvUrl,
        filename: cvFilename,
        lang: cvLang,
    };
}
