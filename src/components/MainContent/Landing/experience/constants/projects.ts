export interface ProjectData {
    num: number;
    title: string;
    fullTitle: string;
    category: string;
    img: string;
    imgPrefix: string;
    imgExt: string;
    challenge: string;
    architecture: string;
    impact: string;
    technologies: string[];
}

export const PROJECTS: ProjectData[] = [
    {
        num: 1,
        title: "OpenLabs",
        fullTitle: "OpenLab Latam",
        category: "Software Factory",
        img: '/ad_experience/open-mov.png',
        imgPrefix: "olab",
        imgExt: "jpg",
        challenge: "El mercado inmobiliario en Latinoamérica arrastra una deuda tecnológica inmensa. El reto fue digitalizar el flujo de cobros de rentas, eliminando la fricción de los pagos en efectivo y centralizando la gestión en un núcleo Fintech seguro.",
        architecture: "Implementamos una integración profunda con Mercado Pago, permitiendo pagos recurrentes y gestión de mora automatizada. La arquitectura se basa en microservicios para garantizar la disponibilidad 24/7.",
        impact: "Transformación digital completa: +500 propiedades gestionadas y una reducción del 40% en tiempos de cobro manual.",
        technologies: ["NestJS", "Next.js", "Mercado Pago", "PostgreSQL"],
    },
    {
        num: 2,
        title: "Lucio Aquino",
        fullTitle: "Lucio Aquino",
        category: "E-Commerce",
        img: '/ad_experience/luqi-mov.png',
        imgPrefix: "luqio",
        imgExt: "webp",
        challenge: "Lucio Aquino no es solo un programador; es un artista de los videojuegos. El desafío fue crear una plataforma que no se sintiera como un portfolio estático, sino como una extensión de su propio trabajo creativo, llena de vida e interacción.",
        architecture: "Desarrollamos un sistema de estados dinámico con GSAP que orquesta sonidos y animaciones RGB. Cada sección es un 'nivel' diferente donde el usuario interactúa con la trayectoria del cliente.",
        impact: "Un portfolio que se volvió viral en comunidades de desarrollo, elevando la marca personal de Lucio a niveles internacionales.",
        technologies: ["GSAP", "React", "Tailwind", "Audio Engine"],
    },
    {
        num: 3,
        title: "Plataforma CEM",
        fullTitle: "Plataforma CEM",
        category: "E-Learning",
        img: '/ad_experience/cem-mov.png',
        imgPrefix: "cem",
        imgExt: "webp",
        challenge: "CEM enfrentaba un cuello de botella crítico: una plataforma lenta (Lighthouse 54) que no escalaba. El objetivo fue una reestructuración total para soportar miles de estudiantes concurrentes con una performance de clase mundial.",
        architecture: "Migramos la lógica pesada a NestJS y optimizamos el frontend con Next.js. Implementamos almacenamiento en Bunny.net para un streaming de video educativo sin latencia y con protección de contenido.",
        impact: "De un sitio lento a una máquina de aprendizaje: Lighthouse 98 y cero caídas de servidor durante lanzamientos masivos.",
        technologies: ["NestJS", "Next.js", "Bunny.net", "Lighthouse Tech"],
    },
    {
        num: 4,
        title: "ECE",
        fullTitle: "Elías Velázquez",
        category: "Corporativo",
        img: '/ad_experience/ece-mov.png',
        imgPrefix: "eve",
        imgExt: "webp",
        challenge: "Para Elías Velázquez, el tiempo de carga y el SEO eran innegociables. El reto consistió en construir una identidad visual masiva utilizando tecnologías modernas que permitieran una entrega de contenido casi instantánea.",
        architecture: "Utilizamos Astro Content Collections para un manejo de datos tipado y eficiente. La interfaz se diseñó bajo una estética brutalista pero refinada, priorizando la legibilidad y el impacto visual.",
        impact: "Carga en menos de 1 segundo y un posicionamiento orgánico que duplicó las consultas de clientes potenciales en el primer mes.",
        technologies: ["Astro", "GSAP", "Tailwind", "Content Collections"],
    },
];
