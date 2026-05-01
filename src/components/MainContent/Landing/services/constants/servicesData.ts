
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
        titleAccentColor: 'text-[#89EA2B]',
        description:
            'Diseño interfaces claras, modernas y alineadas a una identidad de marca sólida. Ideal para productos que necesitan mejorar su imagen o construir una experiencia desde cero.',
        ctaText: 'Crea mi diseño perfecto',
        cardBg: 'bg-[#011D26]',
        hoverBg: 'hover:bg-[#001720]/95',
        decorationType: 'design',
    },
    {
        titleBase: 'Planeación de',
        titleAccent: 'producto',
        titleAccentColor: 'text-[#22d3ee]',
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
        titleAccentColor: 'text-[#4ade80]',
        titleLineBreak: true,
        description:
            'Desarrollo productos funcionales, optimizados y escalables. Podés llegar con una idea, un diseño previo o una planificación ya definida.',
        ctaText: 'Mi web en línea ya',
        wrapperClassName: 'lg:translate-y-24',
        decorationType: 'code',
    },
];
