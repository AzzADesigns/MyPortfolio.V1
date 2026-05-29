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
            'Diseño de interfaces claras, disruptivas y alineadas a una identidad de marca sólida. Estructuro tu producto mediante sistemas de componentes reutilizables y guías de branding listo para pasar a codigo.',
        ctaText: 'Crea mi diseño',
        decorationType: 'design',
    },
    {
        titleBase: 'Planeación de',
        titleAccent: 'producto',
        titleAccentColor: 'text-brand-cyan',
        titleLineBreak: true,
        description:
            'Analizo tu idea y la convierto en una estructura clara: funcionalidades, flujos, experiencia de usuario y enfoque del producto orientado a ventas.',
        ctaText: 'Quiero mi producto',
        decorationType: 'product',
    },
    {
        titleBase: 'Creación de',
        titleAccent: 'apps webs',
        titleAccentColor: 'text-brand-green',
        titleLineBreak: true,
        description:
            'Desarrollo de productos funcionales para insertarlos fuertemente en tu mercado objetivo, haciendo incapie en la convertibilidad y la experiencia de usuario.',
        ctaText: 'Mi web en línea ya',
        decorationType: 'code',
    },
];
