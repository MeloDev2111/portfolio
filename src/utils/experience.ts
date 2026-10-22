/**
 * Work experience, grouped by company.
 *
 * - `EXPERIENCE` and each company's `roles` go newest first.
 * - A consultancy assignment is a role: when you move to a new client, set an
 *   `end` date on the current role and add a new one on top (same company).
 * - Texts are `{ en, es }`; `ja` is optional and falls back to English.
 * - `highlights` accept **bold** markup to stress the key figures.
 */
export type Localized = { en: string; es: string; ja?: string };
export type LocalizedList = { en: string[]; es: string[]; ja?: string[] };

export interface ExperienceRole {
    title: string;
    start: string; // YYYY-MM
    end: string; // YYYY-MM or "Present"
    /** Client (consultancy) or project (in-house). */
    assignment: { kind: "client" | "project"; value: Localized };
    summary: Localized;
    highlights: LocalizedList;
    technologies: string[];
}

export interface ExperienceCompany {
    company: string;
    /** Symbol in /public/logos; a placeholder with the initial is shown if missing. */
    logo?: string;
    kind: Localized;
    location: Localized;
    roles: ExperienceRole[];
}

export const EXPERIENCE: ExperienceCompany[] = [
    {
        company: "Globant",
        logo: "/logos/globant.png",
        kind: { en: "Technology consultancy", es: "Consultora tecnológica" },
        location: { en: "Lima, Peru", es: "Lima, Perú" },
        roles: [
            {
                title: "Java Developer Ssr Advanced",
                start: "2026-03",
                end: "Present",
                assignment: {
                    kind: "client",
                    value: {
                        en: "Payments · Leading national payments ecosystem (fintech)",
                        es: "Pagos · Ecosistema nacional líder en pagos (fintech)",
                    },
                },
                summary: {
                    en: "Modernizing legacy payment services to a reactive stack and moving merchant settlement to real time.",
                    es: "Modernizando servicios de pagos legacy hacia un stack reactivo y llevando la liquidación de comercios a tiempo real.",
                },
                highlights: {
                    en: [
                        "Migrated legacy services to **Java 21, Spring WebFlux and Hexagonal Architecture**, structured under the PBC (Packaged Business Capabilities) approach.",
                        "Integrated an online settlement service alongside the legacy system, moving selected merchants from **daily batch settlement to real-time processing**.",
                        "Stabilized and refined asynchronous banking integrations and backoffice services, ensuring proper use of **reactive programming**.",
                        "Implemented **observability with New Relic** to improve monitoring and traceability of flows.",
                    ],
                    es: [
                        "Migré servicios legacy a **Java 21, Spring WebFlux y Arquitectura Hexagonal**, estructurados bajo el enfoque PBC (Packaged Business Capabilities).",
                        "Integré un servicio de liquidación en línea que convive con el sistema legacy, llevando a comercios seleccionados de la **liquidación diaria por lotes al procesamiento en tiempo real**.",
                        "Estabilicé y refiné integraciones bancarias asíncronas y servicios backoffice, garantizando el uso adecuado de la **programación reactiva**.",
                        "Implementé **observabilidad con New Relic** para mejorar el monitoreo y la trazabilidad de los flujos.",
                    ],
                },
                technologies: [
                    "Java 21",
                    "Spring WebFlux",
                    "Hexagonal Architecture",
                    "Apache Kafka",
                    "New Relic",
                ],
            },
        ],
    },
    {
        company: "UTP",
        logo: "/logos/utp.png",
        kind: { en: "University", es: "Universidad" },
        location: { en: "Lima, Peru", es: "Lima, Perú" },
        roles: [
            {
                title: "Backend Developer Ssr",
                start: "2023-10",
                end: "2026-03",
                assignment: {
                    kind: "project",
                    value: {
                        en: "UTP+Class · Learning Management System",
                        es: "UTP+Class · Learning Management System",
                    },
                },
                summary: {
                    en: "Led the Graduate School LMS backend and kept the university-wide platform stable at 200k users.",
                    es: "Lideré el backend del LMS de Postgrado y mantuve estable la plataforma de toda la universidad con 200 mil usuarios.",
                },
                highlights: {
                    en: [
                        "Led the planning, backend development and launch of the Graduate School LMS, onboarding **10,000+ new users**.",
                        "Contributed to the launch and stability of the university-wide LMS supporting **200,000 users**, ensuring optimal response times.",
                        "Reengineered the enrollment process, cutting execution time **from hours to minutes** while absorbing a load increase **from 20k to 1M records**.",
                        "Improved applicant registration on the EPG admission exam platform with a secure **Active Directory** integration.",
                        "Mentored new team members on **DevOps** practices and backend development standards.",
                    ],
                    es: [
                        "Lideré la planificación, el desarrollo backend y el lanzamiento del LMS de la Escuela de Postgrado, incorporando a más de **10 000 usuarios nuevos**.",
                        "Contribuí al lanzamiento y la estabilidad del LMS de toda la universidad, que soporta **200 000 usuarios**, asegurando tiempos de respuesta óptimos.",
                        "Rediseñé el proceso de matrícula, reduciendo el tiempo de ejecución **de horas a minutos** y absorbiendo un incremento de carga **de 20 mil a 1 millón de registros**.",
                        "Mejoré el registro de postulantes en la plataforma del examen de admisión de EPG con una integración segura con **Active Directory**.",
                        "Mentoría a nuevos integrantes en prácticas de **DevOps** y estándares de desarrollo backend.",
                    ],
                },
                technologies: [
                    "Java",
                    "Spring Boot",
                    "AWS",
                    "Microservices",
                    "Active Directory",
                ],
            },
            {
                title: "Full Stack Developer",
                start: "2023-05",
                end: "2023-10",
                assignment: {
                    kind: "project",
                    value: {
                        en: "UTP+Class · Learning Management System",
                        es: "UTP+Class · Learning Management System",
                    },
                },
                summary: {
                    en: "Built React interfaces and strengthened observability and database performance.",
                    es: "Construí interfaces en React y fortalecí la observabilidad y el rendimiento de la base de datos.",
                },
                highlights: {
                    en: [
                        "Integrated Java microservices with **AWS X-Ray** to enhance monitoring and error diagnosis.",
                        "Tuned complex **PostgreSQL** queries with pganalyze to improve database performance.",
                        "Developed interfaces with **TypeScript and React** following Clean Architecture, Design System and SOLID principles.",
                        "Provided active production support for incident resolution, ensuring service continuity.",
                    ],
                    es: [
                        "Integré microservicios Java con **AWS X-Ray** para mejorar el monitoreo y el diagnóstico de errores.",
                        "Afiné consultas complejas en **PostgreSQL** con pganalyze para mejorar el rendimiento de la base de datos.",
                        "Desarrollé interfaces con **TypeScript y React** siguiendo Clean Architecture, Design System y principios SOLID.",
                        "Brindé soporte activo en producción para resolver incidencias y asegurar la continuidad del servicio.",
                    ],
                },
                technologies: [
                    "TypeScript",
                    "React",
                    "AWS X-Ray",
                    "PostgreSQL",
                ],
            },
            {
                title: "Backend Developer",
                start: "2022-05",
                end: "2023-05",
                assignment: {
                    kind: "project",
                    value: {
                        en: "UTP+Class · Learning Management System",
                        es: "UTP+Class · Learning Management System",
                    },
                },
                summary: {
                    en: "Designed the LMS APIs with hexagonal architecture and integrated them with external and internal systems.",
                    es: "Diseñé las APIs del LMS con arquitectura hexagonal y las integré con sistemas externos e internos.",
                },
                highlights: {
                    en: [
                        "Designed and developed RESTful APIs with Java/Spring Boot using **Hexagonal Architecture, DDD and CQRS**.",
                        "Implemented **AWS serverless** web services with JavaScript and Node.js under the Serverless framework.",
                        "Integrated the LMS with external ecosystems (**Zoom API**) and internal components (CRMs and mobile app).",
                        "Introduced the **Object Mother** pattern in unit tests, standardizing and speeding up test writing for the whole team.",
                    ],
                    es: [
                        "Diseñé y desarrollé APIs RESTful con Java/Spring Boot usando **Arquitectura Hexagonal, DDD y CQRS**.",
                        "Implementé web services **serverless en AWS** con JavaScript y Node.js bajo el framework Serverless.",
                        "Integré el LMS con ecosistemas externos (**Zoom API**) y componentes internos (CRMs y app móvil).",
                        "Introduje el patrón **Object Mother** en las pruebas unitarias, estandarizando y agilizando la escritura de tests de todo el equipo.",
                    ],
                },
                technologies: [
                    "Java",
                    "Spring Boot",
                    "AWS Lambda",
                    "Node.js",
                    "DDD",
                    "CQRS",
                ],
            },
        ],
    },
];

/** Returns the text for `lang`, falling back to English (e.g. for `ja`). */
export function localize(value: Localized, lang: string): string {
    return (value as Record<string, string | undefined>)[lang] ?? value.en;
}

export function localizeList(value: LocalizedList, lang: string): string[] {
    return (value as Record<string, string[] | undefined>)[lang] ?? value.en;
}

/** Roles of every company, newest first, with their company attached. */
export function getTimeline(experience: ExperienceCompany[] = EXPERIENCE) {
    return experience
        .flatMap((company) =>
            company.roles.map((role) => ({
                ...role,
                company: company.company,
                logo: company.logo,
                current: role.end === "Present",
            })),
        )
        .sort((a, b) => b.start.localeCompare(a.start));
}

/**
 * Months between two YYYY-MM values counting both the start and the end month,
 * the way LinkedIn does: Mar 2026 to Oct 2026 is 8 months, not 7.
 */
export function monthsBetween(
    start: string,
    end: string,
    now: Date = new Date(),
): number {
    const [sy, sm] = start.split("-").map(Number);
    const [ey, em] =
        end === "Present"
            ? [now.getFullYear(), now.getMonth() + 1]
            : end.split("-").map(Number);
    return (ey - sy) * 12 + (em - sm) + 1;
}

/** LinkedIn style duration: "8 mos", "1 yr 1 mo", "3 yrs 11 mos". */
export function formatTenure(months: number, lang: string): string {
    const y = Math.floor(months / 12);
    const m = months % 12;
    const parts: string[] = [];
    if (lang === "ja") {
        if (y) parts.push(`${y}年`);
        if (m) parts.push(`${m}か月`);
    } else if (lang === "es") {
        if (y) parts.push(`${y} ${y > 1 ? "años" : "año"}`);
        if (m) parts.push(`${m} ${m > 1 ? "meses" : "mes"}`);
    } else {
        if (y) parts.push(`${y} ${y > 1 ? "yrs" : "yr"}`);
        if (m) parts.push(`${m} ${m > 1 ? "mos" : "mo"}`);
    }
    return parts.join(lang === "ja" ? "" : " ");
}

/** "Mar 2026", "Mar 2026" (es, capitalized), "2026年3月" (ja). */
export function formatMonth(value: string, lang: string): string {
    const text = new Date(`${value}-15`).toLocaleDateString(lang, {
        year: "numeric",
        month: "short",
    });
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Whole years since the first role, e.g. 4 for 4 yrs 6 mos. */
export function totalYears(
    experience: ExperienceCompany[] = EXPERIENCE,
    now: Date = new Date(),
): number {
    const earliest = experience
        .flatMap((c) => c.roles)
        .map((r) => r.start)
        .sort()[0];
    return Math.floor(monthsBetween(earliest, "Present", now) / 12);
}

/** Turns **bold** markers into <strong>. Input is trusted, static data. */
export function boldMarkup(text: string): string {
    return text.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="font-semibold text-light">$1</strong>',
    );
}
