import React from 'react';
import { FiMap, FiEdit2, FiSettings } from 'react-icons/fi';

export interface ProcessPoint {
    label: string;
    text: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    questionPrefix: string;
    question: string;
    description: string;
    points: ProcessPoint[];
    icon: React.ReactNode;
}

export const PROCESS_STEPS: ProcessStep[] = [
    {
        id: '01',
        title: 'Planeación',
        questionPrefix: 'Todo comienza con .',
        question: '¿Cuál es el objetivo de la web?',
        description: 'Transformo una idea abstracta en una hoja de ruta técnica y comercial. Resuelvo preguntas estratégicas para definir con precisión la estructura, las funcionalidades y las características clave de tu producto digital.',
        points: [
            {
                label: 'Claridad',
                text: 'Cero decisiones improvisadas. Cada interacción, animación y línea de código se diseña con un único propósito: alcanzar tus objetivos de negocio.'
            },
            {
                label: 'Solidez',
                text: 'Reducción de errores desde el primer día. Analizo tu idea al detalle y evalúo cada escenario técnico para trazar la ruta de desarrollo más eficiente.'
            },
            {
                label: 'Propósito',
                text: 'Desarrollo a medida enfocado exclusivamente en lo que el mercado objetivo de tu producto necesita para interactuar y convertir.'
            }
        ],
        icon: <FiMap className="w-5 h-5" />
    },
    {
        id: '02',
        title: 'Diseño',
        questionPrefix: '',
        question: '¿Cómo se verá tu marca?',
        description: 'De la idea abstracta al prototipo real. La estrategia cobra vida en la pantalla. Centralizo el concepto de tu producto en Figma, articulando un sistema de diseño modular donde cada sección, botón y microinteracción se proyecta bajo un estándar estricto de usabilidad y consistencia de marca.',
        points: [
            {
                label: 'Identidad',
                text: 'Traduzco los valores de tu negocio en una línea estética única. Defino el branding, la paleta cromática y la tipografía para construir una marca memorable que destaque frente a tu competencia.'
            },
            {
                label: 'Sustancia',
                text: 'No hago plantillas genéricas. Creo un sistema basado en componentes reutilizables, garantizando un orden visual impecable que acelera la transición hacia la etapa de desarrollo.'
            },
            {
                label: 'Fidelidad',
                text: 'Proyecto la experiencia exacta antes de programar. Diseño maquetas interactivas donde puedes validar los flujos de navegación, la adaptabilidad móvil y el comportamiento de la interfaz en tiempo real.'
            }
        ],
        icon: <FiEdit2 className="w-5 h-5" />
    },
    {
        id: '03',
        title: 'Construcción',
        questionPrefix: '',
        question: '¿Qué tecnologías usaremos?',
        description: 'Del prototipo estático al código interactivo. Es el momento de materializar el diseño. Transformo los planos de Figma en una aplicación web real, limpia y ultraoptimizada, inyectando la lógica, el movimiento y la fluidez que un modelo estático no puede mostrar.',
        points: [
            {
                label: 'Rendimiento',
                text: 'Programo interfaces de carga instantánea enfocadas en la retención de usuarios. Hago hincapié en la optimización técnica pura para garantizar una navegación fluida, animaciones nativas estables y una estructura técnica optimizada para el posicionamiento SEO.'
            },
            {
                label: 'Estructura',
                text: 'Construyo bajo arquitecturas modulares listas para la escalabilidad del negocio. Escribo código limpio, ordenado y bajo estándares internacionales de ingeniería, lo que facilita el onboarding inmediato de futuros colaboradores si tu equipo crece.'
            },
            {
                label: 'Dinámica',
                text: 'Doy vida a la experiencia de usuario que no se ve en Figma. Programo un sistema de microinteracciones contextuales, físicas lógicas en tiempo real y transiciones dinámicas que enriquecen la navegación sin distraer al usuario.'
            }
        ],
        icon: <FiSettings className="w-5 h-5" />
    },
    {
        id: '04',
        title: 'Validación',
        questionPrefix: '',
        question: '¿Todo funciona perfecto?',
        description: 'Asegurando la excelencia técnica y visual. Se implementa un proceso de validación colaborativo y transparente, donde cada avance se evalúa con rigor para garantizar la máxima fidelidad respecto a la estrategia inicial.',
        points: [
            {
                label: 'Transparencia',
                text: 'Entregas periódicas de las fases del producto, acompañadas de informes detallados y llamadas de alineación para visualizar la evolución del sistema en tiempo real.'
            },
            {
                label: 'Perfeccionamiento',
                text: 'Cada mejora solicitada se analiza estratégicamente para potenciarla al máximo, asegurando que se integre de forma nativa a la estética y rendimiento del producto.'
            },
            {
                label: 'Consistencia',
                text: 'Verificación exhaustiva de la estabilidad arquitectónica, fluidez de animaciones y adaptabilidad en múltiples dispositivos y escenarios antes de ejecutar el despliegue final.'
            }
        ],
        icon: <svg viewBox="0 0 512 512" className="w-6 h-6"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 176 225.2 304 176 255.8"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"/></svg>
    },
    {
        id: '05',
        title: 'Producción',
        questionPrefix: '',
        question: '¿Listos para el despegue?',
        description: 'Despliegue definitivo y salida al mercado. El lanzamiento se ejecuta mediante protocolos estrictos que aseguran una transición hacia el entorno real de forma impecable, segura y bajo una supervisión técnica continua.',
        points: [
            {
                label: 'Despliegue',
                text: 'Configuración de servidores de alta disponibilidad, bases de datos y redes de distribución (CDN), garantizando el acceso global inmediato y pruebas post-producción para asegurar estabilidad total.'
            },
            {
                label: 'Garantía',
                text: 'Entrega del producto con un plan de soporte y mantenimiento gratuito a corto plazo, diseñado para respaldar el correcto funcionamiento de la plataforma tras el lanzamiento.'
            },
            {
                label: 'Continuidad',
                text: 'Disponibilidad de paquetes opcionales de mantenimiento a mediano y largo plazo, asegurando la escalabilidad operativa, actualizaciones lógicas y seguridad constante del sistema.'
            }
        ],
        icon: <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor"><path d="M 20 5 L 20 10.46875 L 17 12.25 L 17 9.21875 L 15.5 10.15625 L 12 12.25 L 12 9.21875 L 10.5 10.15625 L 5.5 13.15625 L 5 13.4375 L 5 27 L 27 27 L 27 5 Z M 22 7 L 25 7 L 25 25 L 7 25 L 7 14.53125 L 10 12.75 L 10 15.78125 L 11.5 14.84375 L 15 12.75 L 15 15.78125 L 16.5 14.84375 L 21.5 11.84375 L 22 11.5625 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z M 21 21 L 21 23 L 23 23 L 23 21 Z"/></svg>
    }
];
