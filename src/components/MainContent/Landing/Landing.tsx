'use client';

import './Landing.css';
import { Hero, Projects, Validation } from './header';
import { Navbar, useLandingEntrance, sora, momoSignature } from './shared';
import { FloatingShapes } from './services/components/FloatingShapes';
import { CodeExplorer } from './services/components/CodeExplorer';

export const Landing = () => {
    const { containerRef } = useLandingEntrance();

    return (
        <div
            ref={containerRef}
            className={`min-h-screen lg:h-screen w-full flex flex-col overflow-x-hidden lg:overflow-y-auto lg:snap-y lg:snap-mandatory scroll-smooth landing-container ${momoSignature.variable} ${sora.variable}`}
        >
            <Navbar />

            <section className="flex-none flex flex-col lg:flex-row items-center relative mt-0 lg:mt-0 justify-center lg:justify-between px-6 md:px-16 lg:px-8 xl:px-16 py-4 lg:py-0 min-h-screen lg:h-screen overflow-hidden lg:overflow-visible lg:snap-start">
                <Hero />
                <Projects />
                <Validation />
            </section>

            <section id="servicios" className="flex-none w-full min-h-screen lg:h-screen px-0 lg:px-6 pt-0 lg:pt-27 relative z-10 lg:snap-start">
                <div className="w-full h-full bg-gradient-to-b from-white to-[#ababab] rounded-t-[16px] lg:rounded-t-[23px] flex flex-col items-center justify-start gap-8 lg:gap-12 px-6 md:px-16 lg:px-24 pt-6 lg:pt-10 pb-20 shadow-[0_-20px_50px_rgba(255,255,255,0.1)]">

                    <div className="text-center space-y-1 px-4">
                        <h2 className="text-[#001720] text-3xl md:text-[50px] font-bold tracking-tight">
                            Tu idea hecha <span className="relative inline-block px-4 lg:px-6 py-1 lg:py-2 bg-[#001720] border border-[#22d3ee]/30 rounded-2xl lg:rounded-3xl text-[#22d3ee] shadow-[0_0_40px_rgba(34,211,238,0.25)] ml-1">realidad</span>
                        </h2>
                        <p className="text-gray-600 text-lg md:text-3xl font-medium">
                            Te ayudamos a pasar de la imaginación a un producto ideal para tu mercado objetivo
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30 w-full max-w-8xl pb-32">

                        <div className="bg-[#011D26] border border-white/5 p-8 lg:p-12 rounded-[16px] lg:rounded-[23px] flex flex-col gap-6 lg:gap-8 relative overflow-hidden group hover:bg-[#001720]/95 transition-all duration-500 shadow-2xl">
                            <h3 className="text-white text-3xl lg:text-5xl font-bold leading-[1.1]">
                                Diseño {' '}
                                <span className="text-[#89EA2B]">UX / UI</span>
                            </h3>
                            <p className="text-gray-50 text-base lg:text-xl leading-relaxed flex-1 font-medium">
                                Diseño interfaces claras, modernas y alineadas a una identidad de marca sólida.
                                Ideal para productos que necesitan mejorar su imagen o construir una experiencia desde cero.
                            </p>
                            <button className="w-full py-4 lg:py-5 bg-[#89EA2B] text-[#001720] font-black rounded-2xl text-lg lg:text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(137,234,43,0.35)] tracking-tight">
                                Crea mi diseño perfecto
                            </button>
                            <FloatingShapes type="design" />
                        </div>

                        <div className="bg-[#001720] border border-white/5 p-8 lg:p-12 rounded-[23px] lg:rounded-[23px] flex flex-col gap-6 lg:gap-8 relative overflow-hidden group hover:bg-[#001c26]/95 transition-all duration-500 shadow-2xl lg:translate-y-12">
                            <h3 className="text-white text-3xl lg:text-5xl font-bold leading-[1.1]">
                                Planeación de <br />
                                <span className="text-[#22d3ee]">producto</span>
                            </h3>
                            <p className="text-gray-400 text-base lg:text-xl leading-relaxed flex-1 font-medium">
                                Analizo tu idea y la convierto en una estructura clara: funcionalidades, flujos,
                                experiencia de usuario y enfoque del producto orientado a ventas.
                            </p>
                            <button className="w-full py-4 lg:py-5 bg-[#89EA2B] text-[#001720] font-black rounded-2xl text-lg lg:text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(137,234,43,0.35)] tracking-tight">
                                Quiero mi producto ideal
                            </button>
                            <FloatingShapes type="product" />
                        </div>

                        <div className="bg-[#001720] border border-white/5 p-8 lg:p-12 rounded-[23px] lg:rounded-[23px] flex flex-col gap-6 lg:gap-8 relative overflow-hidden group hover:bg-[#001c26]/95 transition-all duration-500 shadow-2xl lg:translate-y-24">
                            <h3 className="text-white text-3xl lg:text-5xl font-bold leading-[1.1]">
                                Creación de <br />
                                <span className="text-[#4ade80]">apps webs</span>
                            </h3>
                            <p className="text-gray-400 text-base lg:text-xl leading-relaxed flex-1 font-medium">
                                Desarrollo productos funcionales, optimizados y escalables.
                                Podés llegar con una idea, un diseño previo o una planificación ya definida.
                            </p>
                            <button className="w-full py-4 lg:py-5 bg-[#89EA2B] text-[#001720] font-black rounded-2xl text-lg lg:text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_15px_40px_rgba(137,234,43,0.35)] tracking-tight">
                                Mi web en línea ya
                            </button>
                            <CodeExplorer />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
