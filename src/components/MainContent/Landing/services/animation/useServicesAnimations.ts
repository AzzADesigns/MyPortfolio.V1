import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { PROCESS_STEPS } from '../constants/servicesData';

interface UseServicesAnimationsProps {
    scrollRef: React.RefObject<HTMLDivElement | null>;
    processRef: React.RefObject<HTMLDivElement | null>;
    isProcessModeRef: React.MutableRefObject<boolean>;
    activeStepRef: React.MutableRefObject<number>;
    setActiveStep: (step: number) => void;
    isAnimatingRef: React.MutableRefObject<boolean>;
    setIsAnimating: (animating: boolean) => void;
    scrollTargetStepRef: React.MutableRefObject<number>;
    handleStepChangeRef: React.MutableRefObject<(idx: number) => void>;
    carouselObserverRef: React.MutableRefObject<ReturnType<typeof Observer.create> | null>;
    enterFromBottomFnRef: React.MutableRefObject<(() => void) | null>;
}

export const useServicesAnimations = ({
    scrollRef,
    processRef,
    isProcessModeRef,
    activeStepRef,
    setActiveStep,
    isAnimatingRef,
    setIsAnimating,
    scrollTargetStepRef,
    handleStepChangeRef,
    carouselObserverRef,
    enterFromBottomFnRef
}: UseServicesAnimationsProps) => {

    useGSAP(() => {
        if (!scrollRef.current || !processRef.current) return;
        const scroller = scrollRef.current;
        const processSection = processRef.current;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            // 1. Efecto de "Snap" fluido
            ScrollTrigger.create({
                trigger: processSection,
                scroller: scroller,
                start: "top 90%",
                onEnter: () => {
                    if (isProcessModeRef.current) return; 
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
                    if (isProcessModeRef.current) return;
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
                    y: -50,
                    opacity: 0,
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

            // Definición de las funciones de entrada y salida del Paso 01
            // Se definen aquí dentro para que tengan acceso a processSection y los elementos
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

            gsap.set(allElements, { opacity: 0, y: 40 });

            // Declaramos let para carouselObserver que inicializaremos abajo
            // eslint-disable-next-line prefer-const
            let carouselObserver: ReturnType<typeof Observer.create>;

            const playPaso01Entrance = () => {
                setIsAnimating(true);
                isAnimatingRef.current = true;

                gsap.killTweensOf([...allElements, titleLineEl, vLineEl, bLineEl, rLineEl, tLineEl].filter(Boolean));
                gsap.set(allElements, { scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, x: 0 });

                const tl = gsap.timeline({
                    delay: 0.2,
                    onComplete: () => {
                        setIsAnimating(false);
                        isAnimatingRef.current = false;
                        if (carouselObserver) carouselObserver.enable();
                    }
                });
                if (titleLineEl) tl.to(titleLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 0);
                if (vLineEl) tl.to(vLineEl, { scaleY: 1, opacity: 1, duration: 0.7, ease: "none" }, 0.3);
                if (bLineEl) tl.to(bLineEl, { scaleX: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.0);
                if (rLineEl) tl.to(rLineEl, { scaleY: 1, opacity: 1, duration: 0.6, ease: "none" }, 1.6);
                if (tLineEl) tl.to(tLineEl, { scaleX: 1, opacity: 1, duration: 0.3, ease: "none" }, 2.2);

                if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 0);
                if (stepLabelEl) tl.to(stepLabelEl, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.15);
                if (subtitleContainer) tl.to(subtitleContainer, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.3);
                if (pillEl) tl.to(pillEl, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.6);
                const col4 = [descriptionEl, ...listItemEls].filter(Boolean);
                if (col4.length) tl.to(col4, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.9);
                if (buttonsEl) tl.to(buttonsEl, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 1.4);
            };

            const bigNumber = processSection.querySelector('.step-number-huge');

            const playPaso01Exit = (keepLocked = false) => {
                setIsAnimating(true);
                isAnimatingRef.current = true;

                const tl = gsap.timeline({
                    onComplete: keepLocked ? undefined : () => {
                        setIsAnimating(false);
                        isAnimatingRef.current = false;
                    }
                });

                if (bigNumber) tl.to(bigNumber, {
                    opacity: 0,
                    scale: 1.04,
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, 0);

                if (titleLineEl) tl.to(titleLineEl, { scaleX: 0, opacity: 0, duration: 0.5, ease: 'expo.inOut' }, 0);
                if (tLineEl)     tl.to(tLineEl,     { scaleX: 0, opacity: 0, duration: 0.45, ease: 'expo.inOut' }, 0.04);
                if (rLineEl)     tl.to(rLineEl,     { scaleY: 0, opacity: 0, duration: 0.5,  ease: 'expo.inOut' }, 0.1);
                if (bLineEl)     tl.to(bLineEl,     { scaleX: 0, opacity: 0, duration: 0.5,  ease: 'expo.inOut' }, 0.18);
                if (vLineEl)     tl.to(vLineEl,     { scaleY: 0, opacity: 0, duration: 0.55, ease: 'expo.inOut' }, 0.26);

                if (titleEl)           tl.to(titleEl,           { opacity: 0, duration: 0.55, ease: 'power2.inOut' }, 0.05);
                if (stepLabelEl)       tl.to(stepLabelEl,       { opacity: 0, duration: 0.5,  ease: 'power2.inOut' }, 0.08);
                if (subtitleContainer) tl.to(subtitleContainer, { opacity: 0, duration: 0.5,  ease: 'power2.inOut' }, 0.12);
                if (pillEl)            tl.to(pillEl,            { opacity: 0, duration: 0.48, ease: 'power2.inOut' }, 0.15);
                if (descriptionEl)     tl.to(descriptionEl,     { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 0.2);

                const exitListItems = Array.from(processSection.querySelectorAll('ul li'));
                if (exitListItems.length) tl.to(exitListItems, {
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: 'power2.inOut'
                }, 0.23);

                if (buttonsEl) tl.to(buttonsEl, { opacity: 0, duration: 0.4, ease: 'power2.inOut' }, 0.32);
            };

            // 3. Animación de "01" Gigante (Integrada con el Lock)
            if (bigNumber) {
                gsap.fromTo(bigNumber,
                    {
                        scale: 15,
                        opacity: 0,
                        x: 330,
                        y: -110
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        x: 0,
                        y: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: processSection,
                            scroller: scroller,
                            start: "top top",
                            end: "top -50%", 
                            scrub: 0.3,
                            onLeave: () => {
                                isProcessModeRef.current = true;
                                scroller.style.overflowY = 'hidden';
                                gsap.set(bigNumber, { scale: 1, opacity: 1, x: 0, y: 0 });
                                if (carouselObserver) carouselObserver.enable();
                                playPaso01Entrance();
                            },
                            onEnterBack: () => {
                                if (isProcessModeRef.current) return;
                                scroller.style.overflowY = 'auto';
                                if (carouselObserver) carouselObserver.disable();
                                gsap.to(allElements, { opacity: 0, y: 40, duration: 0.3, overwrite: true });
                            }
                        }
                    }
                );
            }

            // 4. Sistema de Bloqueo y Navegación por Pasos (Observer + Scroll Lock)
            carouselObserver = Observer.create({
                target: scroller,
                type: "wheel,touch",
                onUp: () => {
                    if (isAnimatingRef.current) return;
                    if (activeStepRef.current > 0) {
                        handleStepChangeRef.current(activeStepRef.current - 1);
                    } else {
                        playPaso01Exit(true);

                        const mainSection = document.getElementById('servicios');
                        const bgContainer = mainSection?.querySelector('.services-bg');

                        gsap.to(scroller, {
                            scrollTo: 0,
                            delay: 0.6,
                            duration: 1.0,
                            ease: 'power4.inOut',
                            overwrite: 'auto',
                            onComplete: () => {
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
            carouselObserver.disable();
            carouselObserverRef.current = carouselObserver;

            // --- ENTRADA DESDE ABAJO ---
            enterFromBottomFnRef.current = () => {
                if (!processRef.current || !scrollRef.current) return;
                const lastIdx = PROCESS_STEPS.length - 1;

                isProcessModeRef.current = true;

                const mainSection = document.getElementById('servicios');
                const bgContainer = mainSection?.querySelector('.services-bg');
                if (mainSection) gsap.set(mainSection, { paddingTop: 0, paddingLeft: 0, paddingRight: 0 });
                if (bgContainer) gsap.set(bgContainer, { borderTopLeftRadius: 0, borderTopRightRadius: 0 });

                scroller.style.overflowY = 'hidden';
                scroller.scrollTop = processRef.current.offsetTop;

                setActiveStep(lastIdx);
                activeStepRef.current = lastIdx;
                scrollTargetStepRef.current = lastIdx;
                setIsAnimating(false);
                isAnimatingRef.current = false;

                const ps = processRef.current;
                const bigNum2 = ps.querySelector('.step-number-huge');
                const titleEl2 = ps.querySelector('h3');
                const subtitleContainer2 = ps.querySelector('.step-content-subtitle');
                const pillEl2 = ps.querySelector('.step-content-pill');
                const descriptionEl2 = ps.querySelector('.step-content-desc');
                const listItemEls2 = Array.from(ps.querySelectorAll('ul li'));
                const buttonsEl2 = ps.querySelector('.flex-col.gap-6');
                const stepLabelEl2 = ps.querySelector('.process-step-label');
                const titleLineEl2 = ps.querySelector('.process-title-line');
                const vLineEl2 = ps.querySelector('.process-v-line');
                const bLineEl2 = ps.querySelector('.process-b-line');
                const rLineEl2 = ps.querySelector('.process-r-line');
                const tLineEl2 = ps.querySelector('.process-t-line');

                if (bigNum2) gsap.killTweensOf(bigNum2);
                gsap.set([bigNum2].filter(Boolean), { scale: 1, opacity: 1, x: 0, y: 0 });

                const allEls2 = [titleEl2, subtitleContainer2, pillEl2, descriptionEl2, ...listItemEls2, buttonsEl2, stepLabelEl2].filter(Boolean);
                gsap.set(allEls2, { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationZ: 0, skewX: 0, x: 0 });
                gsap.set([titleLineEl2, vLineEl2, bLineEl2, rLineEl2, tLineEl2].filter(Boolean), { scaleX: 1, scaleY: 1, opacity: 1 });

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        carouselObserver.enable();
                    });
                });
            };

            // 5. Efecto Acuoso / Expansión del Contenedor
            const mainSectionLocal = document.getElementById('servicios');
            const bgContainerLocal = mainSectionLocal?.querySelector('.services-bg');
            if (mainSectionLocal && bgContainerLocal) {
                gsap.to(mainSectionLocal, {
                    paddingTop: 0, paddingLeft: 0, paddingRight: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top 95%",
                        end: "top 10%",
                        scrub: true,
                    }
                });
                gsap.to(bgContainerLocal, {
                    borderTopLeftRadius: 0, borderTopRightRadius: 0,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: processSection,
                        scroller: scroller,
                        start: "top 95%",
                        end: "top 10%",
                        scrub: true,
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
};
