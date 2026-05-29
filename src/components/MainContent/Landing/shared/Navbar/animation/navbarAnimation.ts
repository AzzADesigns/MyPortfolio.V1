/* eslint-disable @typescript-eslint/no-explicit-any */

export const initNavbarScroll = () => {
};

export const initBackgroundDetection = (gsap: any, navElement: HTMLElement | null, onThemeChange: (isLight: boolean) => void) => {
    if (typeof window === 'undefined' || !navElement) return () => {};

    let currentIsLight = false;
    let lastHeavyCheckMs = 0;
    const HEAVY_CHECK_INTERVAL_MS = 180;

    const checkBackground = () => {
        if (window.innerWidth < 1024) {
            if (currentIsLight) {
                currentIsLight = false;
                onThemeChange(false);
            }
            return;
        }

        const now = performance.now();
        if (now - lastHeavyCheckMs < HEAVY_CHECK_INTERVAL_MS) return;
        lastHeavyCheckMs = now;

        const rect = navElement.getBoundingClientRect();
        const points = [
            { x: rect.left + 50, y: rect.top + rect.height / 2 },
            { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
            { x: rect.right - 50, y: rect.top + rect.height / 2 }
        ];
        
        let lightPoints = 0;
        navElement.style.pointerEvents = 'none';
        
        points.forEach(pt => {
            const el = document.elementFromPoint(pt.x, pt.y) as HTMLElement | null;
            if (!el) return;

            if (el.closest('.service-card, .project-card, [data-card], .bg-brand-dark, .dark-bg')) return;
            if (el.closest('[data-theme="light"], .services-bg, .bg-white, .bg-gray-50, .bg-gray-100, .light-bg')) {
                lightPoints++;
                return;
            }

            let current: HTMLElement | null = el;
            while (current && current !== document.body) {
                const style = window.getComputedStyle(current);
                const bg = style.backgroundColor;
                const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                if (match) {
                    const r = parseInt(match[1]);
                    const g = parseInt(match[2]);
                    const b = parseInt(match[3]);
                    const a = match[4] ? parseFloat(match[4]) : 1;
                    if (a > 0.3) {
                        if (r > 180 && g > 180 && b > 180) lightPoints++;
                        return;
                    }
                }
                current = current.parentElement;
            }
        });

        navElement.style.pointerEvents = 'auto';
        
        const shouldBeLight = lightPoints >= 1;
        if (shouldBeLight !== currentIsLight) {
            currentIsLight = shouldBeLight;
            onThemeChange(shouldBeLight);
        }
    };

    gsap.ticker.add(checkBackground);
    return () => gsap.ticker.remove(checkBackground);
};

export const animateNavbar = (tl: any) => {
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

export const animateNavbarMobile = (gsap: any) => {
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

export const animateMobileMenu = (gsap: any, isOpen: boolean, overlay: HTMLDivElement | null, content: HTMLDivElement | null) => {
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
