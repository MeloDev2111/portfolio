// DEMO data for the experience redesign proposals. Not used by the live page.
type L10n = { en: string; es: string };
type L10nList = { en: string[]; es: string[] };

export interface DemoRole {
    title: string;
    start: string; // YYYY-MM
    end: string; // YYYY-MM | "Present"
    highlights: L10nList;
    technologies: string[];
}

export interface DemoMetric {
    value: string;
    label: L10n;
}

export interface DemoCompany {
    company: string;
    logo: string;
    context: L10n;
    location: string;
    roles: DemoRole[]; // newest first
    metrics: DemoMetric[];
}

export const DEMO_EXPERIENCE: DemoCompany[] = [
    {
        company: "Globant",
        logo: "/logos/globant.png",
        location: "Lima, Peru",
        context: {
            en: "Payments / Fintech · Leading national payments technology ecosystem",
            es: "Pagos / Fintech · Ecosistema tecnológico nacional líder en pagos",
        },
        metrics: [
            {
                value: "Real-time",
                label: {
                    en: "merchant settlement, moved from daily batch",
                    es: "liquidación de comercios, antes por lotes diarios",
                },
            },
        ],
        roles: [
            {
                title: "Java Developer Ssr Advanced",
                start: "2026-03",
                end: "Present",
                technologies: [
                    "Java 21",
                    "Spring WebFlux",
                    "Hexagonal Architecture",
                    "Apache Kafka",
                    "New Relic",
                ],
                highlights: {
                    en: [
                        "Migrated legacy services to Java 21, Spring WebFlux and Hexagonal Architecture, structured under the PBC (Packaged Business Capabilities) approach.",
                        "Integrated an online settlement service alongside the legacy system, moving selected merchants from daily batch settlement to real-time processing.",
                        "Stabilized and refined asynchronous banking integrations and backoffice services, ensuring proper use of reactive programming.",
                        "Implemented observability with New Relic to improve monitoring and traceability of flows.",
                    ],
                    es: [
                        "Migré servicios legacy a Java 21, Spring WebFlux y Arquitectura Hexagonal, estructurados bajo el enfoque PBC (Packaged Business Capabilities).",
                        "Integré un servicio de liquidación en línea que convive con el sistema legacy, llevando a comercios seleccionados de la liquidación diaria por lotes al procesamiento en tiempo real.",
                        "Estabilicé y refiné integraciones bancarias asíncronas y servicios backoffice, garantizando el uso adecuado de la programación reactiva.",
                        "Implementé observabilidad con New Relic para mejorar el monitoreo y la trazabilidad de los flujos.",
                    ],
                },
            },
        ],
    },
    {
        company: "UTP",
        logo: "/logos/utp.png",
        location: "Lima, Peru",
        context: {
            en: "Technology & Digital Transformation · UTP+Class: Learning Management System",
            es: "Tecnología y Transformación Digital · UTP+Class: Learning Management System",
        },
        metrics: [
            {
                value: "200k",
                label: {
                    en: "users on the university-wide LMS",
                    es: "usuarios en el LMS de toda la universidad",
                },
            },
            {
                value: "10k+",
                label: {
                    en: "users onboarded to the Graduate School LMS",
                    es: "usuarios incorporados al LMS de Postgrado",
                },
            },
            {
                value: "20k → 1M",
                label: {
                    en: "enrollment records absorbed",
                    es: "registros de matrícula absorbidos",
                },
            },
            {
                value: "Hours → min",
                label: {
                    en: "enrollment run time",
                    es: "tiempo de ejecución de matrícula",
                },
            },
        ],
        roles: [
            {
                title: "Backend Developer Ssr",
                start: "2023-10",
                end: "2026-03",
                technologies: [
                    "Java",
                    "Spring Boot",
                    "AWS",
                    "Microservices",
                    "Active Directory",
                ],
                highlights: {
                    en: [
                        "Led the planning, backend development and launch of the Graduate School LMS, onboarding 10,000+ new users.",
                        "Contributed to the launch and stability of the university-wide LMS supporting 200,000 users, ensuring optimal response times.",
                        "Reengineered the enrollment process, cutting execution time from hours to minutes while absorbing a load increase from 20k to 1M records.",
                        "Improved applicant registration on the EPG admission exam platform with a secure Active Directory integration.",
                        "Mentored new team members on DevOps practices and backend development standards.",
                    ],
                    es: [
                        "Lideré la planificación, el desarrollo backend y el lanzamiento del LMS de la Escuela de Postgrado, incorporando a más de 10 000 usuarios nuevos.",
                        "Contribuí al lanzamiento y la estabilidad del LMS de toda la universidad, que soporta 200 000 usuarios, asegurando tiempos de respuesta óptimos.",
                        "Rediseñé el proceso de matrícula, reduciendo el tiempo de ejecución de horas a minutos y absorbiendo un incremento de carga de 20 mil a 1 millón de registros.",
                        "Mejoré el registro de postulantes en la plataforma del examen de admisión de EPG con una integración segura con Active Directory.",
                        "Mentoría a nuevos integrantes en prácticas de DevOps y estándares de desarrollo backend.",
                    ],
                },
            },
            {
                title: "Full Stack Developer",
                start: "2023-05",
                end: "2023-10",
                technologies: [
                    "TypeScript",
                    "React",
                    "AWS X-Ray",
                    "PostgreSQL",
                ],
                highlights: {
                    en: [
                        "Integrated Java microservices with AWS X-Ray to enhance monitoring and error diagnosis.",
                        "Tuned complex PostgreSQL queries with pganalyze to improve database performance.",
                        "Developed interfaces with TypeScript and React following Clean Architecture, Design System and SOLID principles.",
                        "Provided active production support for incident resolution, ensuring service continuity.",
                    ],
                    es: [
                        "Integré microservicios Java con AWS X-Ray para mejorar el monitoreo y el diagnóstico de errores.",
                        "Afiné consultas complejas en PostgreSQL con pganalyze para mejorar el rendimiento de la base de datos.",
                        "Desarrollé interfaces con TypeScript y React siguiendo Clean Architecture, Design System y principios SOLID.",
                        "Brindé soporte activo en producción para resolver incidencias y asegurar la continuidad del servicio.",
                    ],
                },
            },
            {
                title: "Backend Developer",
                start: "2022-05",
                end: "2023-05",
                technologies: [
                    "Java",
                    "Spring Boot",
                    "AWS Lambda",
                    "Node.js",
                    "DDD",
                    "CQRS",
                ],
                highlights: {
                    en: [
                        "Designed and developed RESTful APIs with Java/Spring Boot using Hexagonal Architecture, DDD and CQRS.",
                        "Implemented AWS serverless web services with JavaScript and Node.js under the Serverless framework.",
                        "Integrated the LMS with external ecosystems (Zoom API) and internal components (CRMs and mobile app).",
                        "Introduced the Object Mother pattern in unit tests, standardizing and speeding up test writing for the whole team.",
                    ],
                    es: [
                        "Diseñé y desarrollé APIs RESTful con Java/Spring Boot usando Arquitectura Hexagonal, DDD y CQRS.",
                        "Implementé web services serverless en AWS con JavaScript y Node.js bajo el framework Serverless.",
                        "Integré el LMS con ecosistemas externos (Zoom API) y componentes internos (CRMs y app móvil).",
                        "Introduje el patrón Object Mother en las pruebas unitarias, estandarizando y agilizando la escritura de tests de todo el equipo.",
                    ],
                },
            },
        ],
    },
];

const MONTHS_FMT: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
};

export function formatMonth(value: string, lang: string): string {
    return new Date(`${value}-15`).toLocaleDateString(
        lang === "es" ? "es" : "en",
        MONTHS_FMT,
    );
}

export function tenure(start: string, end: string, lang: string): string {
    const s = new Date(`${start}-15`);
    const e = end === "Present" ? new Date() : new Date(`${end}-15`);
    const months =
        (e.getFullYear() - s.getFullYear()) * 12 +
        (e.getMonth() - s.getMonth());
    const y = Math.floor(months / 12);
    const m = months % 12;
    const es = lang === "es";
    const parts: string[] = [];
    if (y)
        parts.push(
            es
                ? `${y} ${y > 1 ? "años" : "año"}`
                : `${y} yr${y > 1 ? "s" : ""}`,
        );
    if (m) parts.push(es ? `${m} ${m > 1 ? "meses" : "mes"}` : `${m} mo`);
    return parts.join(" ") || (es ? "1 mes" : "1 mo");
}
