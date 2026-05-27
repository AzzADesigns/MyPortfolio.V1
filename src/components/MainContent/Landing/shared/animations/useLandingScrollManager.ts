import { useEffect } from 'react';

export const useLandingScrollManager = (containerRef: React.RefObject<HTMLDivElement | null>) => {

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.style.overflowY = 'auto';

        return () => {
            if (container) container.style.overflowY = 'auto';
        };
    }, [containerRef]);
};
