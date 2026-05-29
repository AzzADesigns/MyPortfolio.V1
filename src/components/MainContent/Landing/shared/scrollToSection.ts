'use client';

export function scrollToSection(targetId: string) {
    if (typeof window === 'undefined') return;

    const isMobile = window.innerWidth < 1280;
    if (!isMobile) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'instant' });

    const waitForReal = () => {
        const current = document.getElementById(targetId);
        if (current && !current.hasAttribute('aria-hidden')) {
            current.scrollIntoView({ behavior: 'smooth' });
        } else {
            requestAnimationFrame(waitForReal);
        }
    };
    requestAnimationFrame(waitForReal);
}
