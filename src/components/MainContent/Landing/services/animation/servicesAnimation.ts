import gsap from 'gsap';


interface ServicesScene {
    bg: Element;
    titleWords: NodeListOf<Element>;
    subtitle: Element | null;
    cards: Element[];
}


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
        autoAlpha: 0,
        x: -50,
        willChange: 'transform, opacity, visibility',
    });

    return { bg, titleWords, subtitle, cards };
};


export const animateServicesHeader = (
    tl: gsap.core.Timeline,
    bg: Element,
    titleWords: NodeListOf<Element>,
    subtitle: Element | null
) => {
    tl.to(bg, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' })
        .to(
            titleWords,
            { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08, ease: 'back.out(1.2)', force3D: true },
            '-=0.2'
        )
        .to(
            subtitle,
            { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', force3D: true },
            '-=0.4'
        );
};


export const animateServicesCardsDesktop = (tl: gsap.core.Timeline, cards: Element[]) => {
    tl.to(
        cards,
        {
            autoAlpha: 1,
            x: 0,
            duration: 1.0,
            stagger: 0.3, // Retraso estilo proyector de izquierda a derecha
            ease: 'power3.out',
            force3D: true,
        },
        '-=0.4'
    );
};


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
            x: 0,
            ease: 'none',
            force3D: true,
        });
    });
};
