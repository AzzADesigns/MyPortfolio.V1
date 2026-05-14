'use client';

import { useRef, RefObject } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ContactForm } from './components/ContactForm';
import { ContactHeadline } from './components/ContactHeadline';
import { FooterBar } from './components/FooterBar';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export const Contact = ({ containerRef }: ContactProps) => {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const el = sectionRef.current;
        const container = containerRef.current;
        if (!el || !container) return;

        const q = gsap.utils.selector(el);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scroller: container,
                start: "top 75%",
                toggleActions: 'play reverse play reverse',
            }
        });

        // 1. Fondo (Fade suave)
        tl.fromTo(q(".contact-bg-fade"), { opacity: 0 }, { opacity: 1, duration: 1.5 })
          
          // 2. Inputs del Formulario (Staggered con desplazamiento sutil)
          .fromTo(q(".contact-input-reveal"), 
              { opacity: 0, y: 15 }, 
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
              "-=1"
          )
          
          // 3. Botón de envío (Efecto sutil de escalado)
          .fromTo(q(".contact-button-reveal"), 
              { opacity: 0, scale: 0.95 }, 
              { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, 
              "-=0.4"
          )
          
          // 4. Iconos Sociales (Aparición rítmica)
          .fromTo(q(".contact-social-reveal"), 
              { opacity: 0, scale: 0.5 }, 
              { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 
              "-=0.6"
          );

    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="flex-none relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden flex flex-col justify-between px-6 md:px-16 lg:px-8 xl:px-16 md:pt-16 pb-6 lg:pt-20 lg:pb-8">
            <div id="contacto" className="absolute top-0 left-0 w-full h-0 pointer-events-none" aria-hidden="true" />
            
            {/* Imagen de fondo (handshake) */}
            <div className="absolute inset-0 z-0 pointer-events-none contact-bg-fade">
                <Image 
                    src="/branding/contact-me.png" 
                    alt="" 
                    fill 
                    className="object-cover object-right opacity-20 lg:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001720] via-[#001720]/80 to-transparent"></div>
            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-center lg:items-center lg:justify-between gap-16 lg:gap-24 flex-1 py-10 lg:py-0 mt-8 lg:mt-0">
                <div className="contents">
                    <ContactForm />
                </div>
                <div className="contents">
                    <ContactHeadline />
                </div>
            </div>

            <FooterBar />
        </section>
    );
};
