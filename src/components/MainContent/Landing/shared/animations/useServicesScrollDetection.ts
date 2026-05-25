import { useEffect } from 'react';
import { ServicesHandle } from '../../services';

export const useServicesScrollDetection = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    servicesRef: React.RefObject<ServicesHandle | null>,
    isNavigatingRef: React.RefObject<boolean>
) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let scrollDir: 'up' | 'down' = 'down';
        let lastScrollTop = 0;

        const onScroll = () => {
            const current = container.scrollTop;
            scrollDir = current < lastScrollTop ? 'up' : 'down';
            lastScrollTop = current;
        };

        const onScrollEnd = () => {
            if (isNavigatingRef.current || scrollDir !== 'up') return;
            const servicesEl = document.getElementById('servicios');
            if (!servicesEl) return;
            // Comprobamos que el snap aterrizó en la sección de Servicios
            if (Math.abs(container.scrollTop - servicesEl.offsetTop) < 80) {
                servicesRef.current?.enterFromBottom();
            }
        };

        container.addEventListener('scroll', onScroll, { passive: true });
        container.addEventListener('scrollend', onScrollEnd, { passive: true });
        return () => {
            container.removeEventListener('scroll', onScroll);
            container.removeEventListener('scrollend', onScrollEnd);
        };
    }, [containerRef, servicesRef, isNavigatingRef]);
};
