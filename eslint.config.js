import eslintPluginAstro from "eslint-plugin-astro";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
    {
        ignores: [
            "dist/**/*",
            ".astro/**/*",
            "node_modules/**/*",
            "CHANGELOG.md",
        ],
    },
    ...eslintPluginAstro.configs.recommended,
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: "module",
                ecmaVersion: "latest",
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "error",
        },
    },
];
