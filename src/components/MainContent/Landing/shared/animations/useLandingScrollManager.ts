import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(Observer, ScrollToPlugin);

export const useLandingScrollManager = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const isTransitioning = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const servicesEl = document.getElementById('servicios');
        
        const goToServices = () => {
            if (isTransitioning.current || !servicesEl) return;
            isTransitioning.current = true;
            
            // Bloqueamos el scroll nativo momentáneamente para "matar" la inercia del mouse (MX Master 3)
            container.style.overflowY = 'hidden';

            gsap.to(container, {
                scrollTo: { y: servicesEl.offsetTop, autoKill: false },
                duration: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    // Restauramos el scroll una vez aterrizamos
                    container.style.overflowY = 'auto';
                    // Pequeño delay para que el motor de snap no se vuelva loco con inercia remanente
                    setTimeout(() => {
                        isTransitioning.current = false;
                    }, 100);
                }
            });
        };

        const observer = Observer.create({
            target: container,
            type: "wheel,touch",
            tolerance: 20,
            onDown: () => {
                // Si el usuario intenta bajar desde el Hero
                if (container.scrollTop < 50) {
                    goToServices();
                }
            },
            // Opcional: Impedir saltos desde servicios hacia arriba si se desea
        });

        return () => {
            observer.kill();
            if (container) container.style.overflowY = 'auto';
        };
    }, [containerRef]);
};

