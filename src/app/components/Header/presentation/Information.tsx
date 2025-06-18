'use client';
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";

gsap.registerPlugin(useGSAP);

export const Information = () => {
    const infoRef = useRef<HTMLDivElement>(null);

    const techStack = [
        "React", "SQL", "Figma", "Diseño UX/UI", "Research", "Tailwind",
        "GitHub", "APIs", "Axios", "Shadcn", "Motion", "TypeScript",
        "Express", "Nextjs", "Nodejs"
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Animar título principal y subtítulo
            gsap.from(".info-title", {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.1,
            });

            // Animar info de país y teléfono
            gsap.from(".info-location", {
                x: -20,
                opacity: 0,
                delay: 0.3,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.2,
            });

            // Animar "10 páginas realizadas"
            gsap.from(".info-pages", {
                opacity: 0,
                y: 10,
                delay: 0.6,
                duration: 0.5,
                ease: "power2.out",
            });

            // Animar experiencia
            gsap.from(".info-exp h2", {
                x: 20,
                opacity: 0,
                delay: 0.5,
                duration: 0.5,
                ease: "power2.out",
            });

            gsap.from(".info-exp li", {
                x: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.15,
                delay: 0.6,
            });

            // Animar tech stack
            gsap.from(".tech-item", {
                opacity: 0,
                y: 20,
                stagger: 0.08,
                duration: 0.6,
                ease: "power2.out",
            });
            
            // Animar botones - usando un enfoque más directo
            gsap.from(".button-wrapper", {
                opacity: 0,
                y: 25,
                duration: 0.6,
                ease: "back.out(1.7)",
                stagger: 0.15,
                delay: 0.5,
                clearProps: "all" // Asegura que no queden propiedades residuales
            });
        }, infoRef);

        return () => ctx.revert();
    }, { scope: infoRef });

    return (
        <section className="grid grid-rows-[auto_auto] gap-5 mt-12 p-np" ref={infoRef}>
            <div className="grid xl:grid-cols-4">
                <div className="col-span-3 md:mt-2 rounded-xl">
                    <Title extraClass="info-title">Azariel Moreno</Title>
                    <h2 className="text-xl xl:text-xl font-medium info-title">Full-Stack Developer</h2>

                    <div
                        className="mt-5 font-light text-md xl:text-lg w-[70%] md:w-[80%] xl:w-[86%] 2xl:w-[90%]"
                    >
                        <p className="flex flex-wrap gap-x-1">
                            {techStack.map((tech, i) => (
                                <span key={i} className="tech-item inline-block">
                                    {tech} |
                                </span>
                            ))}
                        </p>
                    </div>

                    <div className="flex items-center gap-5 mt-5 text-md lg:text-lg">
                        <p className="info-location">Argentina</p>
                        <p className="text-buttonColor font-semibold info-location">+54 9 2236979758</p>
                    </div>

                    <p className="font-bold text-buttonColor text-md lg:text-lg mt-3 info-pages">
                        10 Páginas realizadas
                    </p>
                </div>

                <div className="col-span-3 md:col-span-1 mt-3 md:mt-0 xl:ml-5 text-md text-gray-800 rounded-xl info-exp">
                    <h2 className="text-sm md:text-lg font-bold text-buttonColor mb-1">
                        Experiencia
                    </h2>
                    <ul className="flex flex-row xl:flex-col flex-wrap gap-x-3 text-md 2xl:text-md text-textColor list-inside">
                        <li>Independiente</li>
                        <li>No Country</li>
                        <li>Proyectos</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4  w-narrow-range w-full  xl:w-full lg:flex lg:flex-row">
                <Button extraClass="button-wrapper ">Ver Proyectos</Button>
                <Button extraClass="button-wrapper ">Descargar CV</Button>
                <Button extraClass="col-span-2 button-wrapper   xl:col-span-1">Contáctame</Button>
            </div>
        </section>
    );
};