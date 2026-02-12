import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Retrieves projects with localized fallback logic.
 *
 * Strategy:
 * 1. Fetch all projects.
 * 2. Use 'en' (English) projects as the Source of Truth (Master List).
 * 3. For each project in 'en', check if a localized version exists for the requested 'lang'.
 * 4. If localized version exists, use it. Otherwise, fallback to the English version.
 * 5. Filter out drafts.
 * 6. Sort by date (descending).
 */
export async function getLocalizedProjects(
    lang: string,
): Promise<CollectionEntry<"projects">[]> {
    const allProjects = await getCollection("projects");

    // Helper to extract ID from slug (e.g., "en/my-project" -> "my-project")
    const getProjectId = (slug: string) => slug.split("/").slice(1).join("/");

    // 1. Identify English projects (Source of Truth)
    const enProjects = allProjects.filter((p) => p.slug.startsWith("en/"));

    // 2. Map all projects by slug for quick lookup
    const projectsMap = new Map(allProjects.map((p) => [p.slug, p]));

    // 3. Build the localized list with Strict Config Separation
    const localizedProjects = enProjects.map((enProject) => {
        const projectId = getProjectId(enProject.slug);
        const localizedSlug = `${lang}/${projectId}`;
        const localizedVersion = projectsMap.get(localizedSlug);

        // BASE DATA (Config) - Always from English Master
        // Use 'en' for date, tags, link, image, featured, inProgress, draft
        const configData = enProject.data;

        // CONTENT DATA (Text) - From Localized if available, else English
        const contentData = localizedVersion
            ? {
                  title: localizedVersion.data.title,
                  description: localizedVersion.data.description,
              }
            : {
                  title: enProject.data.title,
                  description: enProject.data.description,
              };

        return {
            ...enProject, // Keep original ID/slug structure base? Or localized?
            // Actually we want the localized slug for linking if needed, but the config from EN.
            // Let's return a hybrid object.
            slug: localizedVersion ? localizedVersion.slug : enProject.slug,
            body: localizedVersion ? localizedVersion.body : enProject.body,
            collection: enProject.collection,
            data: {
                ...configData, // 1. Config from Master (Single Source of Truth)
                ...contentData, // 2. Text from Localized
            },
        };
    });

    // 4. Global Filter (Drafts) & Sort
    return localizedProjects
        .filter((p) => !p.data.draft)
        .sort((a, b) => b.data.date!.valueOf() - a.data.date!.valueOf());
}
