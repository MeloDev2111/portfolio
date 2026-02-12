import fs from "node:fs";
import path from "node:path";

/**
 * Checks if a file exists in the public directory
 * @param filePath Relative path from public directory (e.g., "/images/logo.png")
 * @returns boolean
 */
export const publicFileExists = (filePath: string | undefined): boolean => {
    if (!filePath) return false;
    try {
        // Remove leading slash if present to avoid path.join issues on some OS/configs
        const cleanPath = filePath.startsWith("/")
            ? filePath.slice(1)
            : filePath;
        const publicPath = path.join(process.cwd(), "public", cleanPath);
        return fs.existsSync(publicPath);
    } catch (e) {
        return false;
    }
};
