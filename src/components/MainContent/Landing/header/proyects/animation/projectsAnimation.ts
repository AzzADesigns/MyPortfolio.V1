/* eslint-disable @typescript-eslint/no-explicit-any */

export const animateProjects = (tl: any) => {
    tl.fromTo('.gsap-hero-image', { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, "-=0.4");
    tl.fromTo('.gsap-hero-bg', { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, "-=0.8");
};

export const animateProjectsMobile = (gsap: any) => {
    const images = gsap.utils.toArray('.gsap-hero-image') as HTMLElement[];
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
            scroller: window.innerWidth >= 1024 ? ".landing-container" : window,
            trigger: '.gsap-projects-container',
            start: "top 60%", 
            end: "bottom center",
            scrub: 1, 
            invalidateOnRefresh: true
        },
    });

    scrollTl.to(images[2], { scale: 2.2, duration: 1, ease: "power1.out" }, 0);
    scrollTl.to(images[2], { y: -200, duration: 1, ease: "power1.out" }, 0);
    scrollTl.to(images[2], { brightness: 0.6, duration: 1.5, ease: "power1.out" }, 0);
    scrollTl.to(images[2], { scale: 1, y: -60, duration: 2, ease: "power1.out" });
    scrollTl.to(images[0], { scale: 1.2, duration: 2, ease: "power1.out" }, "-=2");
    scrollTl.to(images[2], { x: -20, duration: 6, ease: "none" }, 0);
    scrollTl.to(images[2], { rotation: -5, duration: 6, ease: "none" }, 0);

    scrollTl.to(images[0], { x: 0, y: -20, scale: 1.2, duration: 2, ease: "power1.out" }, ">-0.5");
    scrollTl.to(images[1], { x: 0, y: -20, scale: 1.2, duration: 2, ease: "power1.out" }, ">-0.5");

    scrollTl.to(images[2], { scale: 1, x: 0, y: 0, rotation: 0, duration: 10, ease: "power1.out" });
    scrollTl.to(images[0], { scale: 1, x: 0, y: 0, duration: 10, ease: "power1.out" }, "-=10");
    scrollTl.to(images[1], { scale: 1, x: 0, y: 0, duration: 10, ease: "power1.out" }, "-=10");
};
