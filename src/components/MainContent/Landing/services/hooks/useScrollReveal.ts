'use client';

import { useEffect, useRef } from 'react';

export type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'clip-in';

interface UseScrollRevealOptions {
    /** Selector CSS de los hijos que se van a revelar dentro del containerRef */
    selector: string;
    variant?: RevealVariant;
    /** Delay entre cada elemento (ms). Default: 80 */
    staggerMs?: number;
    /** Margin del IntersectionObserver. Default: '-8% 0px' */
    rootMargin?: string;
    /** Solo aplica en mobile (max-width: 1023px). Default: true */
    mobileOnly?: boolean;
}

/**
 * Hook de scroll reveal ultra-liviano para mobile.
 *
 * Estrategia de rendimiento:
 * - Un solo IntersectionObserver para TODOS los elementos (no uno por elemento).
 * - Las animaciones usan SOLO CSS @keyframes con transform + opacity.
 * - Cero GSAP, cero layout thrashing, cero reflows.
 * - Una vez revelado, el observer deja de observar ese elemento (unobserve).
 */
export const useScrollReveal = (
    containerRef: React.RefObject<HTMLElement | null>,
    {
        selector,
        variant = 'fade-up',
        staggerMs = 80,
        rootMargin = '-8% 0px',
        mobileOnly = true,
    }: UseScrollRevealOptions
) => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // En desktop no hacemos nada si mobileOnly=true (GSAP se encarga)
        if (mobileOnly && window.innerWidth >= 1024) return;

        const elements = Array.from(container.querySelectorAll<HTMLElement>(selector));
        if (elements.length === 0) return;

        // Estado inicial: ocultos con CSS (evita flash de contenido visible)
        elements.forEach((el) => {
            el.dataset.revealVariant = variant;
            el.classList.add('sr-hidden');
        });

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target as HTMLElement;
                    const index = elements.indexOf(el);

                    // Stagger via delay CSS inline (no JS timer)
                    el.style.animationDelay = `${index * staggerMs}ms`;
                    el.classList.remove('sr-hidden');
                    el.classList.add(`sr-reveal-${variant}`);

                    // Una vez revelado, dejamos de observarlo
                    observerRef.current?.unobserve(el);
                });
            },
            { rootMargin, threshold: 0.05 }
        );

        elements.forEach((el) => observerRef.current!.observe(el));

        return () => {
            observerRef.current?.disconnect();
        };
    }, [containerRef, selector, variant, staggerMs, rootMargin, mobileOnly]);
};
