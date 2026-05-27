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
    const lastProgressRef = useRef(-1);

    useGSAP(() => {
        if (!overlayRef.current) return;
        lastProgressRef.current = -1;
        const tl = gsap.timeline();
        tl.fromTo(".decryption-bg",
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" }
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
            onUpdate: () => {
                const v = Math.floor(progressObj.value);
                // Evita decenas de setState por segundo (mejora TBT cuando el overlay está activo)
                if (v !== lastProgressRef.current && (v % 4 === 0 || v >= 99)) {
                    lastProgressRef.current = v;
                    setProgress(v);
                }
            },
            onComplete: () => {
                setProgress(100);
                lastProgressRef.current = 100;
            },
        });
    }, { scope: overlayRef });

    return { overlayRef, progress };
};
