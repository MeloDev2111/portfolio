/**
 * Regenerates CHANGELOG.md after release-it has created the release commit and
 * tag, then commits and pushes it (message ends with [skip ci] so CI does not
 * loop). Running this after the tag exists is what gives the new version its
 * date; before it, auto-changelog treats the version as unreleased.
 *
 * Wired as the `after:release` hook in .release-it.json.
 * Usage: node scripts/sync-changelog.mjs <version>
 */
import { execFileSync } from "node:child_process";

const version = process.argv[2];
if (!version) {
    console.error("Usage: node scripts/sync-changelog.mjs <version>");
    process.exit(1);
}

const run = (cmd, args, options = {}) =>
    execFileSync(cmd, args, { stdio: "inherit", ...options });

// pnpm is a .cmd shim on Windows and needs a shell; git must not use one, or
// the commit message would be passed with literal quotes.
run("pnpm", ["changelog"], { shell: process.platform === "win32" });

try {
    execFileSync("git", ["diff", "--quiet", "--", "CHANGELOG.md"]);
    console.log("CHANGELOG.md already up to date.");
} catch {
    run("git", ["add", "CHANGELOG.md"]);
    run("git", ["commit", "-m", `docs(changelog): sync v${version} [skip ci]`]);
    run("git", ["push"]);
}
