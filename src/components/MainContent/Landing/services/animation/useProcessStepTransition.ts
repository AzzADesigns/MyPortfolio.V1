import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface UseProcessStepTransitionProps {
    processRef: React.RefObject<HTMLDivElement | null>;
    activeStepRef: React.MutableRefObject<number>;
    setActiveStep: (step: number) => void;
    isAnimatingRef: React.MutableRefObject<boolean>;
    setIsAnimating: (animating: boolean) => void;
    scrollTargetStepRef: React.MutableRefObject<number>;
}

export const useProcessStepTransition = ({
    processRef,
    activeStepRef,
    setActiveStep,
    isAnimatingRef,
    setIsAnimating,
    scrollTargetStepRef
}: UseProcessStepTransitionProps) => {
    
    const handleStepChange = (newIdx: number) => {
        if (isAnimatingRef.current || newIdx === activeStepRef.current) return;
        
        scrollTargetStepRef.current = newIdx; // Actualizamos la intención manual
        setIsAnimating(true);
        isAnimatingRef.current = true; // Síncrono para bloqueo inmediato

        const direction = newIdx > activeStepRef.current ? 1 : -1;
        const processSection = processRef.current;
        if (!processSection) {
            setActiveStep(newIdx);
            setIsAnimating(false);
            isAnimatingRef.current = false;
            return;
        }

        // Seleccionamos los elementos específicos del contenido para animar
        const number = processSection.querySelector('.step-number-huge');
        const subtitle = processSection.querySelector('.step-content-subtitle');
        const pill = processSection.querySelector('.step-content-pill');
        const desc = processSection.querySelector('.step-content-desc');
        const list = processSection.querySelector('.step-content-list');

        const targets = [number, subtitle, pill, desc, list].filter(Boolean);

        // Seleccionamos las líneas decorativas
        const titleLine = processSection.querySelector('.process-title-line');
        const vLine = processSection.querySelector('.process-v-line');
        const bLine = processSection.querySelector('.process-b-line');
        const rLine = processSection.querySelector('.process-r-line');
        const tLine = processSection.querySelector('.process-t-line');

        const hLines = [titleLine, bLine, tLine].filter(Boolean);
        const vLines = [vLine, rLine].filter(Boolean);

        if (targets.length === 0) {
            setActiveStep(newIdx);
            setIsAnimating(false);
            isAnimatingRef.current = false;
            return;
        }

        // --- CONFIGURACIÓN DE EFECTOS DINÁMICOS POR SECCIÓN ---
        let textOut: gsap.TweenVars, textInFrom: gsap.TweenVars, textInTo: gsap.TweenVars;
        let hLinesOut: gsap.TweenVars, vLinesOut: gsap.TweenVars;
        let hLinesInFrom: gsap.TweenVars, vLinesInFrom: gsap.TweenVars;
        let hLinesIn: gsap.TweenVars, vLinesIn: gsap.TweenVars;

        // Limpieza universal de transformaciones para evitar que "basura" de otros efectos se acumule
        const baseFrom = { x: 0, y: 0, scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, opacity: 0, filter: "blur(10px)" };

        if (newIdx === 2) { 
            // ----- SECCIÓN 03: 3D DEPTH DIVE (Efecto de Inmersión) -----
            textOut = { scale: 1.5, opacity: 0, filter: "blur(20px)", y: -50, duration: 0.5, stagger: 0.04, ease: "power3.in" };
            textInFrom = { ...baseFrom, scale: 0.5, rotationX: 45, y: 100, filter: "blur(15px)" };
            textInTo = { scale: 1, rotationX: 0, y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.06, ease: "elastic.out(1, 0.75)" };
            
            // Las líneas "explotan" hacia afuera del marco
            hLinesOut = { scaleX: 1.5, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.05 };
            vLinesOut = { scaleY: 1.5, opacity: 0, duration: 0.4, ease: "power3.in", stagger: 0.05 };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.1 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.1, delay: 0.2 };
        }
        else if (newIdx === 3) { 
            // ----- SECCIÓN 04: GRAVITY BOUNCE & GLITCH (Efecto Disruptivo) -----
            textOut = { y: 150, skewX: -15, rotationZ: direction * 5, opacity: 0, filter: "blur(5px)", duration: 0.4, stagger: 0.02, ease: "back.in(2)" };
            textInFrom = { ...baseFrom, y: -200, skewX: 15, rotationZ: direction * -5 };
            textInTo = { y: 0, skewX: 0, rotationZ: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.04, ease: "bounce.out" };
            
            // Las líneas colapsan violentamente y rebotan de forma caótica (stagger invertido)
            hLinesOut = { scaleX: 0, opacity: 0, duration: 0.3, ease: "power4.in" };
            vLinesOut = { scaleY: 0, opacity: 0, duration: 0.3, ease: "power4.in" };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)", stagger: -0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.3)", stagger: -0.05, delay: 0.1 };
        }
        else if (newIdx >= 4) {
            // ----- SECCIÓN 05: HYPER-WARP / VELOCIDAD DE LA LUZ (Efecto Final) -----
            // El texto colapsa en un agujero negro súper rápido
            textOut = { scale: 0, rotationZ: direction * 15, opacity: 0, filter: "blur(10px)", duration: 0.3, stagger: 0.02, ease: "expo.in" };
            // El texto nuevo viene disparado desde detrás del usuario
            textInFrom = { ...baseFrom, scale: 5, filter: "blur(30px)", opacity: 0 };
            textInTo = { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.9, stagger: 0.05, ease: "expo.out" };

            // Las líneas se estiran hacia el infinito y desaparecen
            hLinesOut = { scaleX: 3, opacity: 0, duration: 0.3, ease: "expo.in" };
            vLinesOut = { scaleY: 3, opacity: 0, duration: 0.3, ease: "expo.in" };
            hLinesInFrom = { scaleX: 0, opacity: 0 };
            vLinesInFrom = { scaleY: 0, opacity: 0 };
            // Las líneas entran como un rayo láser limpio
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.7, ease: "circ.out", stagger: 0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.7, ease: "circ.out", stagger: 0.05, delay: 0.1 };
        }
        else { 
            // ----- SECCIÓN 01 y 02: SLIDE MECÁNICO (Línea de tiempo progresiva) -----
            textOut = { x: -80 * direction, opacity: 0, filter: "blur(10px)", duration: 0.4, stagger: 0.03, ease: "power2.in" };
            textInFrom = { ...baseFrom, x: 80 * direction };
            textInTo = { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" };
            
            hLinesOut = { scaleX: 0.2, opacity: 0.2, duration: 0.4, ease: "power2.inOut", stagger: 0.05 };
            vLinesOut = { scaleY: 0.2, opacity: 0.2, duration: 0.4, ease: "power2.inOut", stagger: 0.05 };
            hLinesInFrom = { scaleX: 0.2, opacity: 0.2 };
            vLinesInFrom = { scaleY: 0.2, opacity: 0.2 };
            hLinesIn = { scaleX: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.05 };
            vLinesIn = { scaleY: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)", stagger: 0.05, delay: 0.1 };
        }

        // Ejecutar Animación de Salida del contenido
        gsap.to(targets, {
            ...textOut,
            onComplete: () => {
                setActiveStep(newIdx);
                activeStepRef.current = newIdx;
                
                setTimeout(() => {
                    // Ejecutar Animación de Entrada de las Líneas
                    if (hLines.length) gsap.fromTo(hLines, hLinesInFrom, hLinesIn);
                    if (vLines.length) gsap.fromTo(vLines, vLinesInFrom, vLinesIn);

                    // Ejecutar Animación de Entrada del contenido
                    gsap.fromTo(targets, textInFrom, {
                        ...textInTo,
                        onComplete: () => {
                            setIsAnimating(false);
                            isAnimatingRef.current = false;

                            // LEY DE SECUENCIACIÓN: ¿El scroll ya avanzó más allá de este paso?
                            // Si es así, disparamos el siguiente paso de la cadena.
                            if (scrollTargetStepRef.current !== activeStepRef.current) {
                                const nextStep = scrollTargetStepRef.current > activeStepRef.current 
                                    ? activeStepRef.current + 1 
                                    : activeStepRef.current - 1;
                                
                                // Pequeño respiro para que React asiente el estado antes de la siguiente animación
                                setTimeout(() => {
                                    handleStepChangeRef.current(nextStep);
                                }, 30);
                            }
                        }
                    });
                }, 20);
            }
        });

        // Ejecutar Animación de Salida de las Líneas simultáneamente
        if (hLines.length) gsap.to(hLines, hLinesOut);
        if (vLines.length) gsap.to(vLines, vLinesOut);
    };

    // Ref para la función fresca
    const handleStepChangeRef = useRef(handleStepChange);
    useEffect(() => {
        handleStepChangeRef.current = handleStepChange;
    });

    return { handleStepChange };
};
