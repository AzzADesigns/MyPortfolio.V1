import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * Hook que maneja la animación GSAP del DecryptionOverlay:
 * - Entrada del fondo con blur
 * - Flicker del HUD central
 * - Contador de progreso animado (0% → 100%)
 * Devuelve el ref del contenedor y el progreso actual.
 */
export const useDecryptionOverlay = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        if (!overlayRef.current) return;
        const tl = gsap.timeline();
        tl.fromTo(".decryption-bg",
            { opacity: 0, backdropFilter: "blur(0px)" },
            { opacity: 1, backdropFilter: "blur(24px)", duration: 1, ease: "power2.out" }
        );
        tl.fromTo(".decryption-hud",
            { scale: 0.8, opacity: 0, filter: "brightness(2)" },
            { scale: 1, opacity: 1, filter: "brightness(1)", duration: 0.4, ease: "back.out(1.7)" },
            "-=0.5"
        )
        .to(".decryption-hud", { opacity: 0.5, duration: 0.05, repeat: 3, yoyo: true })
        .to(".decryption-hud", { opacity: 1, duration: 0.1 });
        const progressObj = { value: 0 };
        gsap.to(progressObj, {
            value: 100, duration: 2, ease: "none",
            onUpdate: () => setProgress(Math.floor(progressObj.value))
        });
    }, { scope: overlayRef });

    return { overlayRef, progress };
};
