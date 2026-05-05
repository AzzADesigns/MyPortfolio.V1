import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initNavbarScroll = () => {
    ScrollTrigger.create({
        scroller: typeof window !== 'undefined' && window.innerWidth >= 1024 ? ".landing-container" : window,
        start: "top -20",
        onUpdate: (self) => {
            if (window.innerWidth >= 1024) {
                if (self.direction === 1 && self.scroll() > 20) {
                    gsap.to("nav", { 
                        backgroundColor: "rgba(0, 23, 32, 0.7)", 
                        backdropFilter: "blur(12px)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        duration: 0.4,
                        ease: 'power2.out',
                        overwrite: true
                    });
                } else if (self.scroll() <= 20) {
                    gsap.to("nav", { 
                        backgroundColor: "transparent", 
                        backdropFilter: "blur(0px)",
                        borderBottom: "1px solid transparent",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        duration: 0.4,
                        ease: 'power2.out',
                        overwrite: true
                    });
                }
            }
        }
    });
};

export const animateNavbar = (tl: gsap.core.Timeline) => {
    tl.fromTo('.gsap-nav', 
        { 
            y: -80, 
            autoAlpha: 0, 
            rotateX: -45, 
            scale: 0.9,
            filter: 'blur(10px)'
        }, 
        { 
            y: 0, 
            autoAlpha: 1, 
            rotateX: 0, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.5, 
            stagger: 0.15, 
            ease: 'elastic.out(1, 0.7)',
            transformOrigin: "top center"
        }
    );
};

export const animateNavbarMobile = () => {
    gsap.fromTo('.gsap-nav', 
        { 
            y: -50, 
            autoAlpha: 0, 
            scale: 0.95,
            filter: 'blur(8px)'
        }, 
        { 
            y: 0, 
            autoAlpha: 1, 
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.2, 
            stagger: 0.15, 
            ease: 'expo.out',
            delay: 0.2
        }
    );
};

export const animateMobileMenu = (
    isOpen: boolean,
    overlay: HTMLDivElement | null,
    content: HTMLDivElement | null
) => {
    if (isOpen) {
        gsap.to(overlay, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
        gsap.to(content, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.2)' });

        gsap.fromTo('.mobile-link:not(.mobile-cta)',
            { y: 10, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)', delay: 0.1 }
        );

        gsap.fromTo('.mobile-cta',
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 }
        );
    } else {
        gsap.to('.mobile-link', { y: -0.5, opacity: 0, duration: 0.2, stagger: -0.05, ease: 'power2.in' });
        gsap.to(content, { y: 50, autoAlpha: 0, duration: 0.4, ease: 'power3.in', delay: 0.1 });
        gsap.to(overlay, { autoAlpha: 0, duration: 0.4, ease: 'power2.in', delay: 0.2 });
    }
};
