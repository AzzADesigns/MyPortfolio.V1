'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    /** Distancia en px antes de entrar al viewport para pre-renderizar. Default: 400px */
    rootMargin?: string;
    /** Clase CSS para el placeholder (debe mantener la altura aproximada de la sección) */
    placeholderClassName?: string;
    /** ID para preservar los anchor links incluso antes de montar */
    id?: string;
}

/**
 * Wrapper que difiere el montaje de sus hijos hasta que el placeholder
 * entre en el viewport (con margen configurable).
 *
 * Esto evita que React monte y ejecute hooks pesados (GSAP, ScrollTrigger,
 * canvas, etc.) de secciones que el usuario aún no puede ver, reduciendo
 * drásticamente el tiempo de carga inicial y la presión en el hilo principal.
 *
 * Una vez montado, el componente NUNCA se desmonta (isMounted queda true)
 * para que el estado/animaciones se preserven al volver a esa sección.
 */
export const LazySection = ({
    children,
    rootMargin = '400px 0px',
    placeholderClassName = 'min-h-screen w-full flex-none',
    id,
}: LazySectionProps) => {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const el = placeholderRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsMounted(true);
                    observer.disconnect(); // Una vez montado, ya no necesitamos observar
                }
            },
            { rootMargin, threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    if (!isMounted) {
        return (
            <div
                ref={placeholderRef}
                id={id}
                className={placeholderClassName}
                aria-hidden="true"
            />
        );
    }

    return <>{children}</>;
};
