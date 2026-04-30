import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const animateProjects = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-hero-image', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, "-=0.4");
    tl.fromTo('.gsap-hero-bg', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, "-=0.8");
};

export const animateProjectsMobile = () => {
    const images = gsap.utils.toArray('.gsap-hero-image');
    if (!images || images.length < 3) return;

    // 1. Initial State & Entrance for the first project (CEM)
    // Aplicamos Blur y Oscurecimiento para dar profundidad
    gsap.set(images[0], { x: 0, y: 0, scale: 0.5, autoAlpha: 1, filter: "blur(4px) brightness(0.7)", force3D: true });
    gsap.set(images[1], { x: 0, y: 0, scale: 0.5, autoAlpha: 1, filter: "blur(10px) brightness(0.5)", force3D: true });
    gsap.set('.gsap-hero-bg', { scale: 0.1, autoAlpha: 0 });

    // Entrance for the first project (CEM - index 2)
    gsap.fromTo(images[2], 
        { x: 0, y: -100, scale: 0.5, autoAlpha: 0 }, 
        { x: 0, y: -160, scale: 2.8, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)', force3D: true }
    );

    // 2. Sequential Scroll Animation: Scrub
    const scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.landing-container',
            start: "top top",
            end: "55% top",
            scrub: 1.8, // Valor más alto para mayor suavidad en móviles
            invalidateOnRefresh: true
        }
    });

    // Phase 1: First project moves and scales down
    scrollTl.to(images[2], {
        x: 50,
        y: 60,
        scale: 1.5,
        duration: 0.8,
        ease: 'power1.inOut'
    }, 0);

    scrollTl.to(images[0], {
        x: -120,
        y: -45,
        scale: 1.4,
        filter: "blur(0px) brightness(1)", // Se vuelve nítido
        duration: 0.8,
        ease: 'power1.inOut'
    }, 0.1);

    // Phase 2: Third project (Eve) appears
    scrollTl.to(images[1], {
        x: 100,
        y: -75,
        scale: 1.4,
        filter: "blur(0px) brightness(1)", // Se vuelve nítido
        duration: 0.8,
        ease: 'power1.inOut'
    }, 0.4);

    // Phase 3: Circle appears and grows (Más pronto en el scroll)
    scrollTl.to('.gsap-hero-bg', {
        scale: 1.4, // Círculo más pequeño
        autoAlpha: 1,
        duration: 1.2, // Expansión un poco más lenta para mayor fluidez
        ease: 'power4.out' // Ease más suave y premium
    }, 0.8);

    // Phase 4: All images converge into the circle
    scrollTl.to(images, {
        x: 0,
        y: 48,
        scale: 0.85, // Convergen un poco más grandes
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.inOut'
    }, 1.4);
};
