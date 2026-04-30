import gsap from 'gsap';

export const animateNavbar = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-nav', { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
};

export const animateNavbarMobile = () => {
    gsap.fromTo('.gsap-nav', { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' });
};

export const animateMobileMenu = (
    isOpen: boolean, 
    overlay: HTMLDivElement | null, 
    content: HTMLDivElement | null
) => {
    if (isOpen) {
        gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(content, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.2)' });
        gsap.fromTo('.mobile-link', 
            { y: 30, opacity: 0, scale: 0.9 }, 
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.1 }
        );
    } else {
        gsap.to('.mobile-link', { y: -20, opacity: 0, duration: 0.2, stagger: -0.05, ease: 'power2.in' });
        gsap.to(content, { y: 50, autoAlpha: 0, duration: 0.4, ease: 'power3.in', delay: 0.1 });
        gsap.to(overlay, { autoAlpha: 0, duration: 0.4, ease: 'power2.in', delay: 0.2 });
    }
};
