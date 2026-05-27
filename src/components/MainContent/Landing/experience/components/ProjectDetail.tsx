'use client';

import Image from 'next/image';
import { CTAButton } from '../../shared';
import { PROJECTS } from '../constants/projects';

interface ProjectDetailProps {
    selectedProject: number | null;
    setSelectedProject: (num: number | null) => void;
}

export const ProjectDetail = ({ selectedProject, setSelectedProject }: ProjectDetailProps) => {
    const project = PROJECTS.find(p => p.num === selectedProject);

    return (
        <div
            className={`fixed inset-0 z-[100] transition-all duration-1000 ease-in-out flex items-center justify-center
                ${selectedProject !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'}`}
            style={{ background: 'radial-gradient(circle at center, #ffffff 0%, #d1d5db 100%)' }}
        >
            {project && (
                <>
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-10 right-10 z-[100] text-black text-sm font-medium tracking-widest uppercase hover:opacity-50 transition-opacity flex items-center gap-2 group"
                    >
                        <span className="w-8 h-[1px] bg-black transition-all group-hover:w-12"></span>
                        Cerrar
                    </button>

                    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-white selection:bg-[#89EA2B] selection:text-black">
                        {/* Hero del Proyecto */}
                        <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
                            <div className="absolute top-20 left-10 opacity-10 select-none pointer-events-none">
                                <span className="text-[20vw] font-bold text-black leading-none">0{selectedProject}</span>
                            </div>

                            <h2 className="text-black text-7xl md:text-[10vw] font-extrabold tracking-tighter uppercase leading-[0.8] text-center z-10">
                                {project?.fullTitle}
                            </h2>
                            <p className="text-gray-400 text-xl md:text-2xl mt-8 tracking-[0.5em] uppercase font-light">Caso de Estudio & Desarrollo</p>

                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
                                <div className="w-[1px] h-20 bg-black/20 relative">
                                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#89EA2B]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Contenido en Secciones Disruptivas */}
                        <div className="max-w-[1600px] mx-auto px-6 space-y-32 md:space-y-64 pb-40">

                            {/* Sección 1: El Desafío (Imagen Derecha) */}
                            <div className="grid lg:grid-cols-12 gap-10 items-center">
                                <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                                    <h3 className="text-black text-5xl md:text-7xl font-bold tracking-tighter uppercase italic">El Desafío</h3>
                                    <p className="text-gray-600 text-lg md:text-2xl leading-relaxed font-light">
                                        {project?.challenge}
                                    </p>
                                </div>
                                <div className="lg:col-span-7 relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden order-1 lg:order-2 group">
                                    <Image
                                        src={`/${project?.imgPrefix}1.${project?.imgExt}`}
                                        alt="Challenge View" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
                                </div>
                            </div>

                            {/* Sección 2: Arquitectura (Imagen Izquierda - Overlap) */}
                            <div className="grid lg:grid-cols-12 gap-10 items-center">
                                <div className="lg:col-span-8 relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={`/${project?.imgPrefix}2.${project?.imgExt}`}
                                        alt="Solution View" fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                <div className="lg:col-span-4 lg:-ml-20 z-10 bg-white p-8 md:p-12 shadow-xl border-l-4 border-[#89EA2B]">
                                    <h3 className="text-black text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">Arquitectura</h3>
                                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light italic">
                                        {project?.architecture}
                                    </p>
                                </div>
                            </div>

                            {/* Sección 3: Impacto Real */}
                            <div className="space-y-16">
                                <div className="text-center max-w-4xl mx-auto space-y-6">
                                    <h3 className="text-black text-6xl md:text-8xl font-black tracking-tighter uppercase">Impacto Real</h3>
                                    <p className="text-gray-500 text-xl md:text-3xl font-light leading-snug">
                                        {project?.impact}
                                    </p>
                                </div>
                                <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                                    {/* Imagen Principal */}
                                    <div className="lg:col-span-8 relative aspect-video bg-gray-50 rounded-xl overflow-hidden shadow-2xl group border border-gray-100">
                                        <Image
                                            src={`/${project?.imgPrefix}3.${project?.imgExt}`}
                                            alt="Main Showcase" fill sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-[0.3em] font-bold text-black border-l-4 border-[#89EA2B]">
                                            Vista Principal de la Interfaz
                                        </div>
                                    </div>

                                    {/* Columna de Detalles */}
                                    <div className="lg:col-span-4 flex flex-col gap-8">
                                        {[4, 5].map((idx) => (
                                            <div key={idx} className="relative flex-1 aspect-video lg:aspect-auto bg-gray-50 rounded-xl overflow-hidden shadow-xl group border border-gray-100">
                                                <Image
                                                    src={`/${project?.imgPrefix}${idx}.${project?.imgExt}`}
                                                    alt="Detail View" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                                    <span className="text-white text-[10px] uppercase tracking-widest font-medium">Detalle 0{idx - 2}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sección Final: Tecnologías y Cierre */}
                            <div className="border-t border-gray-200 pt-20 space-y-20">
                                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                                    <div className="space-y-4">
                                        <span className="text-xs tracking-widest text-gray-400 uppercase">Tecnologías Principales</span>
                                        <div className="flex flex-wrap gap-4">
                                            {project?.technologies.map(t => <span key={t} className="text-2xl font-bold text-black border-b-2 border-[#89EA2B]">{t}</span>)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="bg-black text-white px-12 py-5 rounded-2xl hover:bg-[#89EA2B] hover:text-black transition-all duration-500 font-bold uppercase tracking-widest group"
                                    >
                                        Siguiente Proyecto
                                        <span className="ml-4 group-hover:ml-6 transition-all">→</span>
                                    </button>
                                </div>

                                {/* CTA Final */}
                                <div className="flex flex-col items-center text-center space-y-8 pt-10 pb-10">
                                    <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide max-w-xl">¿Te gustaría tener un proyecto con este nivel de detalle y calidad?</p>
                                    <CTAButton
                                        text="Contrátame"
                                        onClick={() => {
                                            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                                            setSelectedProject(null);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};