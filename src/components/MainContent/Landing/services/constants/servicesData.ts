export interface ServiceCardData {
    titleBase: string;
    titleAccent: string;
    titleAccentColor: string;
    titleLineBreak?: boolean;
    description: string;
    ctaText: string;
    wrapperClassName?: string;
    cardBg?: string;
    hoverBg?: string;
    decorationType: 'design' | 'product' | 'code';
}

export const SERVICES_TEXTS = {
    title: {
        words: ['Tu', 'idea', 'hecha'],
        highlight: 'realidad',
    },
    subtitle: 'Te ayudamos a pasar de la imaginación a un producto ideal para tu mercado objetivo',
};

export const SERVICES_CARDS: ServiceCardData[] = [
    {
        titleBase: 'Diseño ',
        titleAccent: 'UX / UI',
        titleAccentColor: 'text-brand-green',
        description:
            'Diseño interfaces claras, modernas y alineadas a una identidad de marca sólida. Ideal para productos que necesitan mejorar su imagen o construir una experiencia desde cero.',
        ctaText: 'Crea mi diseño perfecto',
        decorationType: 'design',
    },
    {
        titleBase: 'Planeación de',
        titleAccent: 'producto',
        titleAccentColor: 'text-brand-cyan',
        titleLineBreak: true,
        description:
            'Analizo tu idea y la convierto en una estructura clara: funcionalidades, flujos, experiencia de usuario y enfoque del producto orientado a ventas.',
        ctaText: 'Quiero mi producto ideal',
        wrapperClassName: 'lg:translate-y-12',
        decorationType: 'product',
    },
    {
        titleBase: 'Creación de',
        titleAccent: 'apps webs',
        titleAccentColor: 'text-brand-green',
        titleLineBreak: true,
        description:
            'Desarrollo productos funcionales, optimizados y escalables. Podés llegar con una idea, un diseño previo o una planificación ya definida.',
        ctaText: 'Mi web en línea ya',
        wrapperClassName: 'lg:translate-y-24',
        decorationType: 'code',
    },
];
export const PROCESS_STEPS = [
    {
        id: '01',
        title: 'Estrategia',
        subtitle: 'y Estructura',
        question: '¿cual es el objetivo de la web?',
        description: 'Convertimos una idea abstracta en una hoja de ruta técnica y comercial respondiendo preguntas estrategicas para entender no solo la estructura, sino sus funcionalidades y características.',
        points: [
            {
                label: 'Claridad',
                text: 'Sin decisiones improvisadas, cada paso, cada interaccion, animacion y proceso estaran formando un conjunto de decisiones con el unico objetivo de alcanzar tu meta.'
            },
            {
                label: 'Solidez',
                text: 'Reducción de errores desde el día uno, se analizara la idea a detalle prestando atencion en cada posibilidada, buscando la mejor ruta posible.'
            },
            {
                label: 'Propósito',
                text: 'Construir exactamente lo que el mercado objetivo de tu prducto necesita.'
            }
        ]
    },
    {
        id: '02',
        title: 'Diseño',
        subtitle: 'Visual',
        question: '¿Cómo se verá tu marca?',
        description: 'Traducimos la estructura en una interfaz visual atractiva y funcional que conecte con tus usuarios.',
        points: [
            { label: 'Identidad', text: 'Colores y tipografías alineadas.' },
            { label: 'UX/UI', text: 'Navegación intuitiva.' }
        ]
    },
    {
        id: '03',
        title: 'Desarrollo',
        subtitle: 'Técnico',
        question: '¿Qué tecnologías usaremos?',
        description: 'Construimos la base sólida de tu aplicación con las mejores prácticas de desarrollo.',
        points: [
            { label: 'Performance', text: 'Carga rápida y optimizada.' },
            { label: 'Escalabilidad', text: 'Código limpio y mantenible.' }
        ]
    },
    {
        id: '04',
        title: 'Pruebas',
        subtitle: 'y QA',
        question: '¿Todo funciona perfecto?',
        description: 'Validamos cada rincón de la aplicación para asegurar una experiencia sin errores.',
        points: [
            { label: 'Testing', text: 'Pruebas en múltiples dispositivos.' },
            { label: 'Feedback', text: 'Ajustes finales basados en uso real.' }
        ]
    },
    {
        id: '05',
        title: 'Lanzamiento',
        subtitle: 'y Soporte',
        question: '¿Listos para el despegue?',
        description: 'Ponemos tu proyecto en producción y te acompañamos en el crecimiento.',
        points: [
            { label: 'Deploy', text: 'Configuración de servidores y dominio.' },
            { label: 'Mantenimiento', text: 'Actualizaciones y soporte continuo.' }
        ]
    }
];
