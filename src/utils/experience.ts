export interface ExperienceItem {
    company: string;
    role: string;
    startDate: string;
    endDate: string;
    description: {
        en: string;
        es: string;
        ja?: string;
    };
    technologies: string[];
    current: boolean;
    logo?: string;
}

export const EXPERIENCE: ExperienceItem[] = [
    {
        company: "Globant",
        role: "Java Developer Ssr Advanced",
        startDate: "2026-03",
        endDate: "Present",
        description: {
            en: "Java Developer Ssr Advanced at a leading national payments technology ecosystem in Peru. Migrated legacy services to Java 21, Spring WebFlux and Hexagonal Architecture under the PBC (Packaged Business Capabilities) approach, integrated an online settlement service that moves selected merchants from daily batch settlement to real-time processing, stabilized asynchronous banking integrations and added observability with New Relic.",
            es: "Java Developer Ssr Advanced en un ecosistema tecnológico nacional líder en pagos en Perú. Migré servicios legacy a Java 21, Spring WebFlux y Arquitectura Hexagonal bajo el enfoque PBC (Packaged Business Capabilities), integré un servicio de liquidación en línea que lleva a comercios seleccionados de la liquidación diaria por lotes al procesamiento en tiempo real, estabilicé integraciones bancarias asíncronas e implementé observabilidad con New Relic.",
        },
        technologies: [
            "Java",
            "Spring WebFlux",
            "Hexagonal Architecture",
            "Apache Kafka",
            "New Relic",
        ],
        current: true,
        logo: "/logos/globant.png",
    },
    {
        company: "UTP",
        role: "Backend Developer Ssr",
        startDate: "2023-10",
        endDate: "2026-03",
        description: {
            en: "Led the planning, backend development and launch of the Graduate School LMS (10k+ new users) and contributed to the launch and stability of the university-wide LMS (200k users). Reengineered enrollment from hours to minutes while absorbing a load increase from 20k to 1M records, integrated Active Directory for secure applicant registration and mentored new team members in DevOps and backend standards.",
            es: "Lideré la planificación, el desarrollo backend y el lanzamiento del LMS de la Escuela de Postgrado (10k+ nuevos usuarios) y contribuí al lanzamiento y la estabilidad del LMS de toda la universidad (200k usuarios). Rediseñé la matrícula de horas a minutos absorbiendo un incremento de carga de 20k a 1M de registros, integré Active Directory para un registro seguro de postulantes y mentoreé a nuevos integrantes en DevOps y estándares backend.",
        },
        technologies: [
            "Java",
            "Spring Boot",
            "AWS",
            "Microservices",
            "Active Directory",
        ],
        current: false,
        logo: "/logos/utp.png",
    },
    {
        company: "UTP",
        role: "Full Stack Developer",
        startDate: "2023-05",
        endDate: "2023-10",
        description: {
            en: "Developed interfaces with TypeScript and React following Clean Architecture, Design System and SOLID principles. Integrated Java microservices with AWS X-Ray for monitoring and error diagnosis, tuned complex PostgreSQL queries with pganalyze and provided active production support for incident resolution.",
            es: "Desarrollé interfaces con TypeScript y React siguiendo Clean Architecture, Design System y principios SOLID. Integré microservicios Java con AWS X-Ray para monitoreo y diagnóstico de errores, afiné consultas complejas en PostgreSQL con pganalyze y brindé soporte activo en producción para resolver incidencias.",
        },
        technologies: [
            "TypeScript",
            "React",
            "AWS X-Ray",
            "PostgreSQL",
            "Clean Architecture",
        ],
        current: false,
        logo: "/logos/utp.png",
    },
    {
        company: "UTP",
        role: "Backend Developer",
        startDate: "2022-05",
        endDate: "2023-05", // Overlaps slightly with start of next role, standard transition period
        description: {
            en: "Designed and developed RESTful APIs with Java/Spring Boot using Hexagonal Architecture, DDD and CQRS. Implemented AWS serverless web services with Node.js, integrated the LMS with external ecosystems (Zoom API) and internal components (CRMs and mobile app) and introduced the Object Mother pattern to standardize and speed up unit tests for the whole team.",
            es: "Diseñé y desarrollé APIs RESTful con Java/Spring Boot usando Arquitectura Hexagonal, DDD y CQRS. Implementé web services serverless en AWS con Node.js, integré el LMS con ecosistemas externos (Zoom API) y componentes internos (CRMs y app móvil) e introduje el patrón Object Mother para estandarizar y agilizar los tests unitarios de todo el equipo.",
        },
        technologies: [
            "Java",
            "Spring Boot",
            "AWS Lambda",
            "Node.js",
            "Hexagonal Architecture",
        ],
        current: false,
        logo: "/logos/utp.png",
    },
];
