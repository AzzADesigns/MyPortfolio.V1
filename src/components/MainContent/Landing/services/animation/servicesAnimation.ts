import gsap from 'gsap';

// Tipos de retorno del setup
interface ServicesScene {
    bg: Element;
    titleWords: NodeListOf<Element>;
    subtitle: Element | null;
    cards: Element[];
}

// 0. Prepara el escenario invisible y retorna las referencias del DOM
export const setupServicesScene = (container: HTMLDivElement): ServicesScene | null => {
    const bg = container.querySelector('.services-bg');
    const titleWords = container.querySelectorAll('.title-word');
    const subtitle = container.querySelector('.services-subtitle');
    const cards = gsap.utils.toArray<Element>('.service-card', container);

    if (!bg || cards.length === 0) return null;

    gsap.set(bg, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set(titleWords, {
        opacity: 0,
        y: 30,
        rotateX: -45,
        transformPerspective: 800,
        willChange: 'transform, opacity',
    });
    gsap.set(subtitle, {
        opacity: 0,
        y: 20,
        willChange: 'transform, opacity',
    });
    gsap.set(cards, {
        opacity: 0,
        rotateX: -45,
        y: 100,
        scale: 0.9,
        transformPerspective: 1000,
        willChange: 'transform, opacity',
    });

    return { bg, titleWords, subtitle, cards };
};

// 1. Animación del encabezado (fondo + título + subtítulo) — compartida entre desktop y mobile
export const animateServicesHeader = (
    tl: gsap.core.Timeline,
    bg: Element,
    titleWords: NodeListOf<Element>,
    subtitle: Element | null
) => {
    tl.to(bg, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' })
        .to(
            titleWords,
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.2)', force3D: true },
            '-=0.2'
        )
        .to(
            subtitle,
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', force3D: true },
            '-=0.4'
        );
};

// 2. Animación de cards en Desktop — se encadena al timeline principal
export const animateServicesCardsDesktop = (tl: gsap.core.Timeline, cards: Element[]) => {
    tl.to(
        cards,
        {
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.8)',
            force3D: true,
        },
        '-=0.4'
    );
};

// 3. Animación de cards en Móvil/Tablet — Scrubbing 1:1 con el scroll
export const animateServicesCardsMobile = (cards: Element[]) => {
    cards.forEach((card) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'center center',
                scrub: true,
            },
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            ease: 'none',
            force3D: true,
        });
    });
};
