'use client';

import { useRef } from 'react';
import './Landing.css';
import { Hero, Projects, Validation, AuroraBackground } from './header';
import { Navbar, CustomCursor, CTAButton, useLandingEntrance, useServicesEntrance, useServicesScrollDetection, useLandingScrollManager, sora, momoSignature } from './shared';
import { Services, ServicesHandle } from './services';
import { Signature } from './signature';
import { BrandIdentity } from './brand';
import { Experience } from './experience';
import Image from 'next/image';

export const Landing = () => {
    const servicesRef = useRef<ServicesHandle>(null);

    const { containerRef } = useLandingEntrance();
    
    useServicesEntrance(containerRef);
    useServicesScrollDetection(containerRef, servicesRef);
    useLandingScrollManager(containerRef);

    return (
        <div ref={containerRef} className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}>
            <CustomCursor />
            <Navbar />

            <section className="flex-none flex flex-col md:gap-20 lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-10 md:py-32 lg:py-0 min-h-[85svh] lg:min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start lg:snap-always">
                <AuroraBackground />
                <Hero />
                <Projects />
                <Validation />
            </section>

            <Services ref={servicesRef} />

            <Signature containerRef={containerRef} />

            <BrandIdentity containerRef={containerRef} />

            <Experience containerRef={containerRef} />

            {/* ═══════════════════════════════════════════════════════ */}
            {/* SECCIÓN FINAL: CONTACTO + FOOTER                      */}
            {/* ═══════════════════════════════════════════════════════ */}
            <section className="flex-none relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden flex flex-col justify-between px-6 md:px-16 lg:px-8 xl:px-16 pt-16 pb-6 lg:pt-20 lg:pb-8">
                
                {/* Imagen de fondo (handshake) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
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
                    
                    {/* Columna Izquierda: Formulario */}
                    <div className="w-full lg:w-[45%] xl:w-[40%] mt-20 space-y-8 md:space-y-10 order-2 lg:order-1">
                        <div className="space-y-6 md:space-y-8">
                            {[
                                { placeholder: "Nombre", label: "Nombre" },
                                { placeholder: "Proyecto", label: "Proyecto" },
                                { placeholder: "Mail", label: "Email" },
                            ].map((field) => (
                                <div key={field.label} className="group">
                                    <input 
                                        type={field.label === "Email" ? "email" : "text"}
                                        placeholder={field.placeholder}
                                        className="w-full bg-transparent border-b border-[#89EA2B]/30 focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40"
                                    />
                                </div>
                            ))}
                            <div className="group">
                                <textarea 
                                    placeholder="¿Cuál es tu idea?"
                                    rows={5}
                                    className="w-full bg-transparent border-b border-[#89EA2B]/30 focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40 resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <CTAButton text="Dar el primer paso" />
                        </div>
                    </div>

                    {/* Columna Derecha: Headline */}
                    <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col items-center xl:items-center lg:justify-end order-1 lg:order-2 gap-10 lg:gap-14">
                        <h2 className={`text-center text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight ${sora.className}`}>
                            Trabajemos juntos<br />
                            para lograr que tu<br />
                            producto tenga una<br />
                            <span className="text-[#89EA2B]">web de marca</span>
                        </h2>

                        {/* Redes Sociales Desktop (xl+) */}
                        <div className="hidden xl:flex items-center justify-center gap-12 w-full pt-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300">
                                <Image src="/branding/in.svg" alt="LinkedIn" width={64} height={64} />
                            </a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300">
                                <Image src="/branding/ticktok.svg" alt="TikTok" width={64} height={64} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 hover:scale-110 transition-all duration-300">
                                <Image src="/branding/instagram.svg" alt="Instagram" width={64} height={64} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-24 lg:pt-0 mt-auto">
                    {/* Redes Sociales Mobile/Tablet */}
                    <div className="flex xl:hidden items-center gap-6">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src="/branding/in.svg" alt="LinkedIn" width={32} height={32} />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src="/branding/ticktok.svg" alt="TikTok" width={32} height={32} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                            <Image src="/branding/instagram.svg" alt="Instagram" width={32} height={32} />
                        </a>
                    </div>

                    {/* Powered By */}
                    <div className="flex items-center gap-3 opacity-60 xl:ml-auto">
                        <span className="text-white/50 text-sm tracking-widest uppercase font-light">Powered By</span>
                        <Image src="/branding/AzzADesigns.svg" alt="AzzADesigns" width={140} height={40} className="opacity-80" />
                    </div>
                </div>
            </section>
        </div>
    );
};
