import gsap from 'gsap';


export const animateProjects = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-hero-image', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, "-=0.4");
    tl.fromTo('.gsap-hero-bg', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, "-=0.8");
};

export const animateProjectsMobile = () => {
    const images = gsap.utils.toArray<HTMLElement>('.gsap-hero-image');
    if (!images || images.length < 3) return;

    gsap.set(images[0], { x: 0, y: 0, scale: 0.5, autoAlpha: 1, brightness: 0.8, force3D: true });
    gsap.set(images[1], { x: 0, y: 0, scale: 0.5, autoAlpha: 1, brightness: 0.6, force3D: true });
    gsap.set('.gsap-hero-bg', { scale: 0.1, autoAlpha: 0 });

    gsap.fromTo(images[2], 
        { x: 0, y: -100, scale: 0.5, autoAlpha: 0 }, 
        { x: 0, y: -160, scale: 2.8, autoAlpha: 1, duration: 1.2, ease: 'back.out(1.2)', force3D: true }
    );

    const scrollTl = gsap.timeline({
        scrollTrigger: {
            scroller: typeof window !== 'undefined' && window.innerWidth >= 1024 ? ".landing-container" : window,
            trigger: '.gsap-projects-container',
            start: "top 60%", 
            end: "bottom center",
            scrub: 1, 
            invalidateOnRefresh: true
        },
        defaults: { ease: "power1.inOut" }
    });

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
        brightness: 1,
        duration: 0.8,
        ease: 'power1.inOut'
    }, 0.1);

    scrollTl.to(images[1], {
        x: 100,
        y: -75,
        scale: 1.4,
        brightness: 1,
        duration: 0.8,
        ease: 'power1.inOut'
    }, 0.4);

    scrollTl.to('.gsap-hero-bg', {
        scale: 1.4,
        autoAlpha: 1,
        duration: 1.2,
        ease: 'power4.out'
    }, 0.8);

    scrollTl.to(images, {
        x: 0,
        y: 48,
        scale: 0.85,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power2.inOut'
    }, 1.4);
};
