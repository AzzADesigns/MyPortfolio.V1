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
    challengeImg?: string;
    architectureImg?: string;
    impactImg?: string;
    detailImgs?: string[];
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
        challengeImg: "/ad_experience/olab.header.webp",
        architectureImg: "/ad_experience/olab.about.webp",
        impactImg: "/ad_experience/olab.services.webp",
        detailImgs: ["/ad_experience/olab.staffing.webp", "/ad_experience/olab.contact.webp"],
        challenge: "El reto principal consistió en diseñar una interfaz de alto impacto rompiendo con los esquemas tradicionales, bajo la restricción de utilizar prácticamente ninguna imagen en toda la plataforma.\n\nEl objetivo de negocio requería comunicar de forma inmediata el valor de su servicio principal de staffing técnico, sin diluir ni restar protagonismo a su segunda especialización: el desarrollo de software a medida.\n\nPara lograr este equilibrio, se ejecutó un profundo análisis del perfil del cliente objetivo de la empresa.\n\nLa solución demandó una arquitectura puramente tipográfica e interactiva, capaz de segmentar la navegación, captar la atención de perfiles corporativos específicos y guiar al usuario hacia la conversión mediante una experiencia digital sumamente estructurada.",
        architecture: "Se aplicó el patrón Screaming Architecture para que la estructura del código refleje directamente el propósito del negocio.\n\nVisualmente, el sitio emula una presentación ejecutiva de alta gama; un reporte interactivo de diapositivas dinámicas con un fondo sutil que sigue al mouse para aportar fluidez sin distraer la lectura.\n\nEsta arquitectura visual se diseñó para CEOs y líderes tecnológicos con tiempo limitado. Al combinar un código modular con pantallas limpias de escaneo rápido, se logra que los perfiles técnicos validen la solidez del sistema mientras los directivos asimilan el valor del negocio de forma inmediata y familiar.",
        impact: "Se transformó una plataforma genérica en una herramienta digital a medida, escalable y de fácil mantenimiento.\n\nAl integrar un sistema de reservas nativo, la web dejó de ser una presentación estática y desordenada para convertirse en un sistema que busca captar clientes, automatizando las reuniones ejecutivas y potenciando el crecimiento real de la empresa.",
        technologies: ["React", "Next.js", "Figma", "PostgreSQL", "NestJS"],
    },
    {
        num: 2,
        title: "Lucio Aquino",
        fullTitle: "Lucio Aquino",
        category: "E-Commerce",
        img: '/ad_experience/luqi-mov.png',
        imgPrefix: "luqio",
        imgExt: "png",
        challengeImg: "/ad_experience/luqio.header.png",
        architectureImg: "/ad_experience/luqio.info.png",
        impactImg: "/ad_experience/luqio.projects.png",
        detailImgs: ["/ad_experience/luqio.social.png", "/ad_experience/luqio.website.PNG"],
        challenge: "Lucio Aquino no es solo un programador; es un artista de los videojuegos. El desafío fue crear una plataforma que no se sintiera como un portfolio estático, sino como una extensión de su propio trabajo creativo, llena de vida e interacción.",
        architecture: "Desarrollamos un sistema de estados dinámico con GSAP que orquesta sonidos y animaciones RGB. Cada sección es un 'nivel' diferente donde el usuario interactúa con la trayectoria del cliente.",
        impact: "Se consolidó la presencia digital de un profesional con más de una década de experiencia, permitiendo la exposición estratégica de sus proyectos bajo una plataforma optimizada en SEO.\n\nEl portafolio dejó de ser un simple repositorio para convertirse en un activo comercial de alto impacto que ya ha generado entrevistas laborales activas en el mercado.",
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
        challengeImg: "/ad_experience/cem.header.PNG",
        architectureImg: "/ad_experience/cem.about.PNG",
        impactImg: "/ad_experience/cem-dashboard.PNG",
        detailImgs: ["/ad_experience/cem-categories.PNG", "/ad_experience/cem.admin.PNG"],
        challenge: "El proyecto requería transformar una estructura genérica prefabricada de e-learning en una plataforma de marca robusta y escalable. El reto principal demandó el despliegue de funcionalidades avanzadas de cara al usuario final y el desarrollo a medida de un panel de control contable de alta precisión para la administración interna.\n\nLa ejecución afrontó un entorno de alta exigencia, con plazos reducidos y constantes cambios de requerimientos en tiempo récord. Ante este escenario, la estrecha colaboración con el equipo de diseño abrió paso a una gran flexibilidad creativa y técnica.\n\nEsto permitió proponer y estructurar de forma proactiva tanto el rediseño visual de la interfaz como la lógica operativa de las nuevas características, garantizando una respuesta ágil y un despliegue impecable en producción.",
        architecture: "Bajo el patrón Screaming Architecture, se estructuró un backend modular en NestJS y un frontend optimizado en Next.js. El ecosistema técnico integra pasarelas de pago (PayPal e Izipay) para facturación automática en doble moneda, un sistema de clases sincrónicas en vivo y almacenamiento en Bunny.net para un streaming de video protegido y sin latencia.\n\nLa plataforma incluye un motor inteligente que genera diplomas automatizados según el progreso en tiempo real del estudiante. Este módulo lee las bases de datos para personalizar el certificado de forma condicional, adaptando automáticamente las firmas de los colaboradores, el temario impartido y la modalidad del curso sin intervención humana.",
        impact: "Se consolidó un ecosistema automatizado donde los instructores solo se enfocan en cargar contenidos y gestionar sus clases sincrónicas, mientras la administración mantiene el control total de la facturación y los permisos operativos.\n\nEl sistema agilizó la emisión de certificados condicionales para ambos roles y ofreció a los estudiantes una plataforma estable, con un flujo de usabilidad ergonómico y de alto rendimiento.",
        technologies: ["NestJS", "Next.js", "Bunny.net", "PayPal", "Izipay", "PostgreSQL", "Docker", "Figma"],
    },
    {
        num: 4,
        title: "ECE",
        fullTitle: "Elías Velázquez",
        category: "Corporativo",
        img: '/ad_experience/ece-mov.png',
        imgPrefix: "eve",
        imgExt: "webp",
        challengeImg: "/ad_experience/evelazques.header.png",
        architectureImg: "/ad_experience/evelazques.experience.png",
        impactImg: "/ad_experience/evelazquez.prujects.png",
        detailImgs: ["/ad_experience/evelazquez.study.png", "/ad_experience/evelazquez.certificates.png"],
        challenge: "Para Elías Velázquez, el tiempo de carga y el SEO eran innegociables. El reto consistió en construir una identidad visual masiva utilizando tecnologías modernas que permitieran una entrega de contenido casi instantánea.",
        architecture: "Utilizamos Astro Content Collections para un manejo de datos tipado y eficiente. La interfaz se diseñó bajo una estética brutalista pero refinada, priorizando la legibilidad y el impacto visual.",
        impact: "Se entregó una plataforma dinámica que permite la actualización rápida y autónoma de la totalidad de sus contenidos.\n\nEl desarrollo logró alinear con precisión la web personal hacia la identidad de marca exigida por el cliente, transformando el sitio en un activo digital estable y fiel a su posicionamiento corporativo.",
        technologies: ["Astro", "GSAP", "Tailwind", "Content Collections"],
    },
];
