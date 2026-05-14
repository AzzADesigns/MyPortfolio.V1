import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

/**
 * Gestor de scroll simplificado.
 * Eliminamos el Observer para evitar conflictos con el snap nativo del navegador
 * que causaba saltos inversos hacia el header.
 */
export const useLandingScrollManager = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const isTransitioning = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Dejamos que el snap-mandatory de CSS haga su trabajo nativo.
        // Solo restauramos el overflow por si acaso quedó bloqueado por un error previo.
        container.style.overflowY = 'auto';

        return () => {
            if (container) container.style.overflowY = 'auto';
        };
    }, [containerRef]);
};
