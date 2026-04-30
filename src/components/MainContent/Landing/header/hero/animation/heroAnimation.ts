import gsap from 'gsap';

export const animateHero = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-hero-text', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, "-=0.4");
};

export const animateHeroMobile = () => {
    gsap.fromTo('.gsap-hero-text', 
        { y: 50, autoAlpha: 0 }, 
        { scrollTrigger: { trigger: '.gsap-hero-text', start: "top 85%" }, y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
};
