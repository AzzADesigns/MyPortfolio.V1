'use client';

import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';
import { FluidBackground } from './components/FluidBackground';
import { ScrollIndicator } from './components/ScrollIndicator';
import { ServicesContent } from './components/ServicesContent';
import { PROCESS_STEPS } from './constants/servicesData';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

export interface ServicesHandle {
    enterFromBottom: () => void;
}

export const Services = React.forwardRef<ServicesHandle>((_, ref) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const currentStep = PROCESS_STEPS[activeStep];

    // Refs para acceder al estado más reciente dentro de GSAP
    const activeStepRef = useRef(activeStep);
    const isAnimatingRef = useRef(isAnimating);
    const scrollTargetStepRef = useRef(activeStep); // Tracker de la posición deseada por el scroll

    // Refs para exponer funciones al componente padre (Landing)
    const carouselObserverRef = useRef<ReturnType<typeof Observer.create> | null>(null);
    const enterFromBottomFnRef = useRef<(() => void) | null>(null);
    // Bandera: true cuando el carousel está activo (scroll bloqueado en pasos)
    const isProcessModeRef = useRef(false);

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

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

    useGSAP(() => {
        if (!scrollRef.current || !processRef.current) return;
        const scroller = scrollRef.current;
        const processSection = processRef.current;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // 1. Efecto de "Snap" fluido hecho con GSAP para mayor suavidad que el Snap nativo
            //    Guardado con isProcessModeRef para no re-disparar cuando el carrusel ya está activo.
            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "top 90%",
                onEnter: () => {
                    if (isProcessModeRef.current) return; // ya en modo carousel, ignorar
                    gsap.to(scroller, {
                        scrollTo: { y: processSection.offsetTop },
                        duration: 1.2,
                        ease: "power4.inOut",
                        overwrite: true
                    });
                }
            });

            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "top 10%",
                onLeaveBack: () => {
                    // GUARD: durante el exit del carousel, isProcessModeRef es true.
                    // Sin este guard, esta trigger mata el onComplete del scroll de salida
                    // (overwrite:true) y el cleanup nunca corre → scroll bloqueado permanentemente.
                    if (isProcessModeRef.current) return;
                    // Solo aplica para scroll manual del usuario (no programático)
                    if (activeStepRef.current === 0) {
                        gsap.to(scroller, {
                            scrollTo: { y: 0 },
                            duration: 1.2,
                            ease: "power4.inOut",
                            overwrite: true
                        });
                    }
                }
            });

            // 2. Animación de salida elegante (Parallax Exit)
            const servicesHeader = scroller.querySelector('.text-center');
            const cards = scroller.querySelectorAll('.service-card');

            if (servicesHeader) {
                gsap.to(servicesHeader, {
                    y: -50,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top bottom",
                        end: "top 40%",
                        scrub: true,
                    }
                });
            }

            cards.forEach((card, i) => {
                gsap.to(card, {
                    y: -150 - (i * 60),
                    opacity: 0,
                    scale: 0.9,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top bottom",
                        end: "top 10%",
                        scrub: true,
                    }
                });
            });

            // 3. Animación de "01" Gigante (Integrada con el Lock)
            const bigNumber = processSection.querySelector('.step-number-huge');
            if (bigNumber) {
                gsap.fromTo(bigNumber,
                    {
                        scale: 15,
                        opacity: 0, // Empieza invisible
                        filter: "blur(40px)", // Más desenfocado para el efecto gaseoso
                        x: 330,
                        y: -110
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                        x: 0,
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: processSection,
                            scroller: scroller,
                            start: "top top",
                            end: "top -50%", 
                            scrub: 0.3, // Restaurado: el efecto que sigue tu scroll
                            onLeave: () => {
                                if (isProcessModeRef.current) return; // entrada desde abajo ya lo configura
                                isProcessModeRef.current = true;
                                scroller.style.overflowY = 'hidden';
                                gsap.set(bigNumber, { scale: 1, opacity: 1, filter: "blur(0px)", x: 0, y: 0 });
                                // Habilitar el observer ANTES de la animación de entrada
                                // para que preventDefault bloquee el scroll del outer container
                                // mientras isAnimating bloquea los cambios de paso
                                carouselObserver.enable();
                                playPaso01Entrance();
                            },
                            // onEnterBack: solo aplica cuando el usuario hace scroll manual atrás del scrub
                            // (no cuando venimos de un exit programático del carousel)
                            onEnterBack: () => {
                                if (isProcessModeRef.current) return;
                                scroller.style.overflowY = 'auto';
                                carouselObserver.disable();
                                gsap.to(allElements, { opacity: 0, y: 40, duration: 0.3, overwrite: true });
                            }
                        }
                    }
                );
            }

            // 4. Entrada Épica del Contenido
            const titleEl = processSection.querySelector('h3') as HTMLElement | null;
            const subtitleContainer = processSection.querySelector('.step-content-subtitle') as HTMLElement | null;
            const pillEl = processSection.querySelector('.step-content-pill') as HTMLElement | null;
            const descriptionEl = processSection.querySelector('.step-content-desc') as HTMLElement | null;
            const listItemEls = Array.from(processSection.querySelectorAll('ul li')) as HTMLElement[];
            const buttonsEl = processSection.querySelector('.flex-col.gap-6') as HTMLElement | null;
            const stepLabelEl = processSection.querySelector('.process-step-label') as HTMLElement | null;

            const titleLineEl = processSection.querySelector('.process-title-line') as HTMLElement | null;
            const vLineEl = processSection.querySelector('.process-v-line') as HTMLElement | null;
            const bLineEl = processSection.querySelector('.process-b-line') as HTMLElement | null;
            const rLineEl = processSection.querySelector('.process-r-line') as HTMLElement | null;
            const tLineEl = processSection.querySelector('.process-t-line') as HTMLElement | null;

            const allElements = [titleEl, subtitleContainer, pillEl, descriptionEl, ...listItemEls, buttonsEl, stepLabelEl].filter(Boolean);

            gsap.set(allElements, { opacity: 0, y: 40, filter: "blur(10px)" });

            // 4. Sistema de Bloqueo y Navegación por Pasos (Observer + Scroll Lock)
            // Creamos el Observer que manejará el cambio de pasos de forma virtual
            const carouselObserver = Observer.create({
                target: scroller,
                type: "wheel,touch",
                onUp: () => {
                    if (isAnimatingRef.current) return;
                    if (activeStepRef.current > 0) {
                        handleStepChangeRef.current(activeStepRef.current - 1);
                    } else {
                        // Salida hacia arriba: animar salida, restaurar estado visual y
                        // volver al inner scroll a 0 (ServicesContent).
                        // El usuario puede scrollear manualmente a Hero desde ahí.
                        playPaso01Exit(true);

                        const mainSection = document.getElementById('servicios');
                        const bgContainer = mainSection?.querySelector('.services-bg');

                        // El dissolve ocurre primero (0.6s). NO limpiamos los estilos todavía
                        // para mantener la pantalla completa intacta y evitar el "doble salto".
                        gsap.to(scroller, {
                            scrollTo: 0,
                            delay: 0.6,
                            duration: 1.0,
                            ease: 'power4.inOut',
                            overwrite: 'auto',
                            onComplete: () => {
                                // Limpiamos los estilos SOLAMENTE al final.
                                // Durante el scroll, el ScrollTrigger se encarga de reducir
                                // el contenedor suavemente. Limpiar aquí asegura que el CSS
                                // base retome el control sin saltos visuales.
                                if (mainSection) gsap.set(mainSection, { clearProps: 'paddingTop,paddingLeft,paddingRight' });
                                if (bgContainer) gsap.set(bgContainer, { clearProps: 'borderTopLeftRadius,borderTopRightRadius' });

                                isProcessModeRef.current = false;
                                scroller.style.overflowY = 'hidden';
                                requestAnimationFrame(() => {
                                    scroller.style.overflowY = 'auto';
                                });
                                carouselObserver.disable();
                                setActiveStep(0);
                                activeStepRef.current = 0;
                                scrollTargetStepRef.current = 0;
                                setIsAnimating(false);
                                isAnimatingRef.current = false;
                            }
                        });
                    }
                },
                onDown: () => {
                    if (isAnimatingRef.current) return;
                    if (activeStepRef.current < PROCESS_STEPS.length - 1) {
                        handleStepChangeRef.current(activeStepRef.current + 1);
                    } else {
                        // Último paso → salida hacia abajo.
                        // NO desbloqueamos el inner scroll (tiene 400vh abajo todavía).
                        // En su lugar, scrolleamos directamente el outer container a Contact.
                        isProcessModeRef.current = false;
                        carouselObserver.disable();

                        const outerEl = scrollRef.current?.closest('.landing-container') as HTMLElement | null;
                        const contactEl = document.getElementById('contacto');
                        if (outerEl && contactEl) {
                            gsap.to(outerEl, {
                                scrollTo: { y: contactEl.offsetTop },
                                duration: 1.2,
                                ease: 'power4.inOut',
                                overwrite: true
                            });
                        }
                    }
                },
                preventDefault: true
            });
            carouselObserver.disable(); // Empezamos desactivado por defecto
            carouselObserverRef.current = carouselObserver;

            // --- ENTRADA DESDE ABAJO (Contact → Services) ---
            // Esta función es llamada por Landing cuando el usuario viene desde Contact
            enterFromBottomFnRef.current = () => {
                if (!processRef.current || !scrollRef.current) return;
                const lastIdx = PROCESS_STEPS.length - 1;

                // Marcar modo proceso ANTES de cualquier cambio para que los guards funcionen
                isProcessModeRef.current = true;

                // 1. Full-screen instantáneo
                const mainSection = document.getElementById('servicios');
                const bgContainer = mainSection?.querySelector('.services-bg');
                if (mainSection) gsap.set(mainSection, { paddingTop: 0, paddingLeft: 0, paddingRight: 0 });
                if (bgContainer) gsap.set(bgContainer, { borderTopLeftRadius: 0, borderTopRightRadius: 0 });

                // 2. Bloquear overflow ANTES de mover el scroll para que el onDown del observer no dispare
                scroller.style.overflowY = 'hidden';

                // 3. Posicionar el scroll interno en el proceso (después de bloquear)
                scroller.scrollTop = processRef.current.offsetTop;

                // 4. Saltar al último paso
                setActiveStep(lastIdx);
                activeStepRef.current = lastIdx;
                scrollTargetStepRef.current = lastIdx;
                setIsAnimating(false);
                isAnimatingRef.current = false;

                // 5. Mostrar contenido del último paso + bigNumber inmediatamente
                const ps = processRef.current;
                const bigNum2 = ps.querySelector('.step-number-huge');
                const titleEl2 = ps.querySelector('h3');
                const subtitleContainer2 = ps.querySelector('.mt-8.space-y-1');
                const pillEl2 = ps.querySelector('.mb-8.self-start');
                const descriptionEl2 = ps.querySelector('p.max-w-2xl');
                const listItemEls2 = Array.from(ps.querySelectorAll('ul li'));
                const buttonsEl2 = ps.querySelector('.flex-col.gap-6');
                const stepLabelEl2 = ps.querySelector('.process-step-label');
                const titleLineEl2 = ps.querySelector('.process-title-line');
                const vLineEl2 = ps.querySelector('.process-v-line');
                const bLineEl2 = ps.querySelector('.process-b-line');
                const rLineEl2 = ps.querySelector('.process-r-line');
                const tLineEl2 = ps.querySelector('.process-t-line');

                // Matar tweens activos del scrub sobre bigNumber para que no lo reemplace
                if (bigNum2) gsap.killTweensOf(bigNum2);
                gsap.set([bigNum2].filter(Boolean), { scale: 1, opacity: 1, filter: 'blur(0px)', x: 0, y: 0 });

                const allEls2 = [titleEl2, subtitleContainer2, pillEl2, descriptionEl2, ...listItemEls2, buttonsEl2, stepLabelEl2].filter(Boolean);
                gsap.set(allEls2, { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, x: 0 });
                gsap.set([titleLineEl2, vLineEl2, bLineEl2, rLineEl2, tLineEl2].filter(Boolean), { scaleX: 1, scaleY: 1, opacity: 1 });

                // 6. Habilitar observer en el siguiente frame, cuando el scroll ya se asentó
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        carouselObserver.enable();
                    });
                });
            };

            // Función para disparar la animación de contenido del Paso 01
            const playPaso01Entrance = () => {
                // isAnimating bloquea cambios de paso. El observer ya está habilitado
                // (activado en onLeave) para que preventDefault detenga el scroll del outer container.
                setIsAnimating(true);
                isAnimatingRef.current = true;

                gsap.killTweensOf([...allElements, titleLineEl, vLineEl, bLineEl, rLineEl, tLineEl].filter(Boolean));
                gsap.set(allElements, { scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, x: 0 });

                const tl = gsap.timeline({
                    delay: 0.2,
                    onComplete: () => {
                        setIsAnimating(false);
                        isAnimatingRef.current = false;
                        // Observer ya está habilitado, sólo asegurar que sigue activo
                        carouselObserver.enable();
                    }
                });
                if (titleLineEl) tl.to(titleLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 0);
                if (vLineEl) tl.to(vLineEl, { scaleY: 1, opacity: 1, duration: 0.7, ease: "none" }, 0.3);
                if (bLineEl) tl.to(bLineEl, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.0);
                if (rLineEl) tl.to(rLineEl, { scaleY: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.6);
                if (tLineEl) tl.to(tLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 2.2);

                if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0);
                if (stepLabelEl) tl.to(stepLabelEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.15);
                if (subtitleContainer) tl.to(subtitleContainer, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.3);
                if (pillEl) tl.to(pillEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 0.6);
                const col4 = [descriptionEl, ...listItemEls].filter(Boolean);
                if (col4.length) tl.to(col4, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.9);
                if (buttonsEl) tl.to(buttonsEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "back.out(1.5)" }, 1.4);
            };

            // keepLocked=true: no resetear isAnimating en onComplete (el caller lo hace).
            const playPaso01Exit = (keepLocked = false) => {
                setIsAnimating(true);
                isAnimatingRef.current = true;

                const tl = gsap.timeline({
                    onComplete: keepLocked ? undefined : () => {
                        setIsAnimating(false);
                        isAnimatingRef.current = false;
                    }
                });

                // ── DISSOLVE PURO: sin movimiento Y para no luchar con el sticky ────────
                // El sticky baja físicamente durante el scroll;
                // añadir y:-28 crearía movimiento opuesto y el efecto "apresurado".
                // Blur + fade es el único efecto que se percibe como elegante aquí.

                // Número gigante: se expande levísimamente y se evapora
                if (bigNumber) tl.to(bigNumber, {
                    opacity: 0,
                    scale: 1.04,
                    filter: 'blur(18px)',
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0);

                // Líneas: se disuelven antes (dan señal de que el marco se deshace)
                if (titleLineEl) tl.to(titleLineEl, { scaleX: 0, opacity: 0, duration: 0.5, ease: 'expo.inOut' }, 0);
                if (tLineEl)     tl.to(tLineEl,     { scaleX: 0, opacity: 0, duration: 0.45, ease: 'expo.inOut' }, 0.04);
                if (rLineEl)     tl.to(rLineEl,     { scaleY: 0, opacity: 0, duration: 0.5,  ease: 'expo.inOut' }, 0.1);
                if (bLineEl)     tl.to(bLineEl,     { scaleX: 0, opacity: 0, duration: 0.5,  ease: 'expo.inOut' }, 0.18);
                if (vLineEl)     tl.to(vLineEl,     { scaleY: 0, opacity: 0, duration: 0.55, ease: 'expo.inOut' }, 0.26);

                // Contenido: fade con stagger suave, sin y
                if (titleEl)           tl.to(titleEl,           { opacity: 0, filter: 'blur(6px)', duration: 0.55, ease: 'power2.inOut' }, 0.05);
                if (stepLabelEl)       tl.to(stepLabelEl,       { opacity: 0, filter: 'blur(5px)', duration: 0.5,  ease: 'power2.inOut' }, 0.08);
                if (subtitleContainer) tl.to(subtitleContainer, { opacity: 0, filter: 'blur(5px)', duration: 0.5,  ease: 'power2.inOut' }, 0.12);
                if (pillEl)            tl.to(pillEl,            { opacity: 0, filter: 'blur(4px)', duration: 0.48, ease: 'power2.inOut' }, 0.15);
                if (descriptionEl)     tl.to(descriptionEl,     { opacity: 0, filter: 'blur(4px)', duration: 0.45, ease: 'power2.inOut' }, 0.2);

                const exitListItems = Array.from(processSection.querySelectorAll('ul li'));
                if (exitListItems.length) tl.to(exitListItems, {
                    opacity: 0,
                    filter: 'blur(3px)',
                    duration: 0.4,
                    stagger: 0.04,
                    ease: 'power2.inOut'
                }, 0.23);

                if (buttonsEl) tl.to(buttonsEl, { opacity: 0, filter: 'blur(3px)', duration: 0.4, ease: 'power2.inOut' }, 0.32);
            };

            // (Trigger de soporte eliminado y consolidado arriba)

            // 5. Efecto Acuoso / Expansión del Contenedor (RESTAURADO Y OPTIMIZADO)
            const mainSection = document.getElementById('servicios');
            const bgContainer = mainSection?.querySelector('.services-bg');
            if (mainSection && bgContainer) {
                gsap.to(mainSection, {
                    paddingTop: 0, paddingLeft: 0, paddingRight: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top 95%",
                        end: "top 10%",
                        scrub: true, // Sincronización instantánea vital para evitar parpadeos al limpiar props
                    }
                });
                gsap.to(bgContainer, {
                    borderTopLeftRadius: 0, borderTopRightRadius: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top 95%",
                        end: "top 10%",
                        scrub: true, // Sincronización instantánea
                    }
                });
            }
        });

        return () => {
            mm.revert();
            carouselObserverRef.current = null;
            enterFromBottomFnRef.current = null;
        };
    }, { scope: scrollRef });

    // Exponer la API imperativa al padre (Landing)
    useImperativeHandle(ref, () => ({
        enterFromBottom: () => {
            enterFromBottomFnRef.current?.();
        }
    }), []);

    return (
        <section id="servicios" className="flex-none w-full h-auto lg:h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
            <div className="services-bg relative w-full h-auto lg:h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] shadow-[0_-20px_50px_rgba(255,255,255,0.1)] overflow-hidden">
                <FluidBackground />
                <ScrollIndicator />

                {/* Contenedor de Scroll principal: En móvil es relativo y fluye con la página, en desktop es absoluto y scrolleable internamente */}
                <div
                    ref={scrollRef}
                    className="relative lg:absolute lg:inset-0 h-auto lg:h-full overflow-visible lg:overflow-y-auto lg:overflow-x-hidden services-internal-scroll z-10 flex flex-col"
                >
                    {/* Primera sección: Contenido de Servicios */}
                    <div className="relative w-full h-auto lg:min-h-screen flex-shrink-0">
                        <ServicesContent />
                    </div>

                    {/* Nueva sección: El Proceso */}
                    <div
                        ref={processRef}
                        id="proceso-section"
                        // Incrementamos la altura para tener suficiente espacio de scroll (track) para los 4 pasos
                        className="w-full relative h-auto lg:min-h-[400vh]"
                    >
                        {/* VERSION DESKTOP: Sticky + Interactivo (Solo visible en LG+) */}
                        <div className="hidden lg:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden">


                            <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-16 relative z-10 lg:mt-12 xl:mt-16 2xl:mt-24">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full">

                                    {/* Columna 1: Títulos y Selectores */}
                                    <div className="lg:col-span-5 flex flex-col space-y-8 lg:space-y-6 2xl:space-y-10">
                                        <div className="flex items-center">
                                            <h3 className="text-3xl md:text-[50px] lg:text-[36px] xl:text-[32px] 2xl:text-[50px] font-bold text-[#001720] tracking-tight whitespace-nowrap">
                                                El proceso
                                            </h3>
                                            <div
                                                className="process-title-line ml-3 h-[3px] flex-1 origin-left bg-[#001720]"
                                                style={{ transform: 'scaleX(0)' }}
                                            />
                                        </div>

                                        <div className="flex items-start gap-8 lg:gap-8 2xl:gap-10">
                                            {/* Selectores de pasos */}
                                            <div className="flex flex-col gap-6 lg:gap-4 2xl:gap-6 mt-4 lg:mt-2 2xl:mt-4">
                                                {PROCESS_STEPS.map((step, idx) => (
                                                    <button
                                                        key={step.id}
                                                        onClick={() => handleStepChange(idx)}
                                                        disabled={isAnimating}
                                                        className={`w-[67px] h-[60px] lg:w-[45px] lg:h-[40px] 2xl:w-[67px] 2xl:h-[60px] rounded-xl border-[3px] lg:border-[2px] 2xl:border-[3px] flex items-center justify-center font-bold text-xl lg:text-base 2xl:text-xl transition-all duration-300 ${activeStep === idx
                                                            ? 'border-[#001720] bg-[#001720] text-white shadow-md'
                                                            : 'border-[#001720] text-[#001720] hover:bg-[#001720]/5'
                                                            } ${isAnimating ? 'cursor-default' : ''}`}
                                                    >
                                                        {step.id}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Bloque central: Paso + Número Gigante + Subtítulo */}
                                            <div className="flex flex-col ml-10 lg:ml-6 xl:ml-12 2xl:ml-20 lg:mt-10 2xl:mt-20">
                                                <div className="relative inline-block">
                                                    <span className="process-step-label absolute -top-10 -right-2 origin-center rotate-90 text-[11px] lg:text-[9px] 2xl:text-[11px] font-black tracking-[0.3em] text-[#001720]/40 uppercase whitespace-nowrap">
                                                        Paso
                                                    </span>

                                                    {/* El número gigante ahora vive en el flujo, alineándose naturalmente */}
                                                    <span
                                                        className="step-number-huge block text-[120px] md:text-[180px] lg:text-[130px] xl:text-[110px] 2xl:text-[210px] font-bold leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-brand-cyan to-brand-green drop-shadow-[0_15px_30px_rgba(7,248,242,0.25)]"
                                                        style={{ WebkitTextStroke: '2px #001720' }}
                                                    >
                                                        {currentStep.id}
                                                    </span>
                                                </div>

                                                <div className="mt-8 lg:mt-4 2xl:mt-8 space-y-1 text-right mr-4 step-content-subtitle">
                                                    <h4 className="text-3xl md:text-[45px] lg:text-[32px] xl:text-[28px] 2xl:text-[45px] font-bold text-[#001720] tracking-tight leading-tight">
                                                        {currentStep.title}
                                                    </h4>
                                                    <p className="text-2xl md:text-[35px] lg:text-[24px] xl:text-[20px] 2xl:text-[35px] font-medium text-gray-500 leading-tight">
                                                        {currentStep.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna 2: Texto y Detalles */}
                                    <div className="lg:col-span-7 flex flex-col justify-center lg:pt-12 2xl:pt-24 pl-10 lg:pl-12 2xl:pl-16 lg:pr-24 xl:pr-36 2xl:pr-16 pb-16 relative">
                                        {/* Líneas decorativas */}
                                        <div className="process-v-line absolute left-0 top-[29px] bottom-0 w-[3px] bg-[#001720] origin-top" style={{ transform: 'scaleY(0)' }} />
                                        <div className="process-b-line absolute bottom-0 left-0 -right-10 h-[3px] bg-[#001720] origin-left" style={{ transform: 'scaleX(0)' }} />
                                        <div className="process-r-line absolute bottom-0 -right-10 top-[29px] w-[3px] bg-[#001720] origin-bottom" style={{ transform: 'scaleY(0)' }} />
                                        <div className="process-t-line absolute top-[29px] -right-10 w-24 h-[3px] bg-[#001720] origin-right" style={{ transform: 'scaleX(0)' }} />

                                        {/* Pregunta / Pill */}
                                        <div className="mb-8 lg:mb-6 2xl:mb-8 self-start flex items-center gap-3 step-content-pill">
                                            <span className="text-[#001720] font-medium text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[20px]">Todo comienza con</span>
                                            <div className="bg-[#001720] px-6 py-3 lg:px-4 lg:py-2 2xl:px-6 2xl:py-3 rounded-3xl border border-brand-cyan/20 shadow-[0_0_30px_rgba(34,211,238,0.1)] transform -rotate-1">
                                                <span className="text-brand-green font-bold text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[20px] italic tracking-tight block mb-[2px]">“{currentStep.question}”</span>
                                            </div>
                                        </div>

                                        <p className="text-lg lg:text-[15px] xl:text-[14px] 2xl:text-xl text-gray-600 font-medium leading-relaxed mb-10 lg:mb-6 2xl:mb-10 max-w-4xl 2xl:max-w-none step-content-desc">{currentStep.description}</p>

                                        <ul className="space-y-6 lg:space-y-4 2xl:space-y-6 step-content-list">
                                            {currentStep.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-5 lg:gap-3 2xl:gap-5">
                                                    <div className="w-2.5 h-2.5 lg:w-2 lg:h-2 2xl:w-2.5 2xl:h-2.5 bg-[#001720] mt-2.5 lg:mt-1.5 2xl:mt-2.5 flex-shrink-0"></div>
                                                    <p className="text-lg lg:text-[15px] xl:text-[14px] 2xl:text-[19px] text-gray-700 leading-snug">
                                                        <span className="font-bold text-[#001720]">{point.label}:</span> {point.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* VERSION MOBILE: Lista completa de todos los pasos uno tras otro */}
                        <div className="lg:hidden flex flex-col py-16 px-6 space-y-24 bg-transparent relative z-10">
                            <div className="flex flex-col space-y-4 mb-8">
                                <h2 className="text-4xl font-bold text-[#001720]">El Proceso</h2>
                                <div className="w-20 h-1 bg-brand-cyan"></div>
                            </div>

                            {PROCESS_STEPS.map((step) => (
                                <div key={step.id} className="flex flex-col space-y-10 border-b border-gray-100 pb-16 last:border-0 last:pb-0">
                                    {/* Cabecera del paso */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-brand-cyan font-bold tracking-widest uppercase text-sm mb-1">Paso {step.id}</span>
                                            <h3 className="text-3xl font-bold text-[#001720] leading-tight">{step.title}</h3>
                                            <p className="text-xl text-gray-500 font-medium italic mt-1">{step.subtitle}</p>
                                        </div>
                                        <div className="text-6xl font-black text-[#001720]/5 select-none">{step.id}</div>
                                    </div>

                                    {/* Pill de pregunta */}
                                    <div className="bg-[#001720] px-6 py-4 rounded-2xl self-start transform -rotate-1 shadow-lg">
                                        <span className="text-brand-green font-bold text-lg italic tracking-tight">“{step.question}”</span>
                                    </div>

                                    {/* Descripción y puntos */}
                                    <div className="space-y-8">
                                        <p className="text-lg text-gray-600 leading-relaxed font-medium">{step.description}</p>
                                        <ul className="space-y-6">
                                            {step.points.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="w-2 h-2 bg-[#001720] mt-2.5 flex-shrink-0"></div>
                                                    <p className="text-gray-700 leading-snug">
                                                        <span className="font-bold text-[#001720]">{point.label}:</span> {point.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

Services.displayName = 'Services';