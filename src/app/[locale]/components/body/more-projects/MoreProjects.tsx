'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import TechStack from '../../ui/TechStack';
import Deploy from '../../ui/Deploy';
import { Carousel } from '../../ui/Carousel';
import Button from '../../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const MoreProjects = () => {
    const t = useTranslations();
    const projectRefs = useRef<HTMLDivElement[]>([]);
    const titleRef = useRef<HTMLDivElement>(null);

    const projectKeys = Object.keys(t.raw('projectTexts')).slice(1);

    useGSAP(() => {
        // Configuración inicial inmediata: ocultos y desplazados
        if (titleRef.current) gsap.set(titleRef.current, { autoAlpha: 0, y: 30 });

        const projects = projectRefs.current.filter(Boolean);
        gsap.set(projects, { autoAlpha: 0, y: 50, scale: 0.95 });

        // Animación del Título
        if (titleRef.current) {
            gsap.to(titleRef.current, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // Animación de Proyectos (Batch)
        ScrollTrigger.batch(projects, {
            start: "top 85%",
            onEnter: batch => gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                stagger: 0.15,
                duration: 0.6,
                ease: "power2.out",
                overwrite: true
            }),
            onLeaveBack: batch => gsap.to(batch, {
                autoAlpha: 0,
                y: 50,
                scale: 0.95,
                overwrite: true
            })
        });

        ScrollTrigger.refresh();

    }, []);

    return (
        <Card extraClass="w-full flex flex-col pb-10">
            <div ref={titleRef} className="invisible">
                <Title extraClass="p-np mt-5">{t('textsPage.textMoreProjects')}</Title>
            </div>

            <div className="flex flex-col justify-center mt-5 items-center overflow-hidden gap-10">
                {projectKeys.map((key, index) => {
                    const project = t.raw(`projectTexts.${key}`);

                    return (
                        <div
                            key={index}
                            ref={el => {
                                if (el) projectRefs.current[index] = el;
                            }}
                            className="flex rounded-xl flex-col gap-5 md:w-full border-background invisible" // invisible inicial
                        >
                            {/* Reservamos espacio mínimo para evitar saltos y colapsos de altura */}
                            <div className="relative m-auto w-full min-h-[250px] flex items-center bg-transparent rounded-xl">
                                <Carousel slides={project.image} />
                            </div>

                            <article className="w-full p-np">
                                <div className="flex flex-col  gap-2 pr-1">
                                    <div className="flex items-center justify-between">
                                        <TitelPage title={project.title} />
                                        {project.link && (
                                            <Button>
                                                <Deploy
                                                    url={project.link.url}
                                                    type={project.link.type}
                                                />

                                            </Button>
                                        )}
                                    </div>
                                    <TechStack technologies={project.technologies} />
                                </div>

                                <div className="border-2 mb-10 rounded-2xl p-5 border-background h-auto mt-4 pr-2 overflow-y-auto custom-scrollbar">
                                    <div className="space-y-4">
                                        {project.description.map((text: string, i: number) => (
                                            <p key={i} className="text-sm xl:text-lg leading-relaxed">
                                                {text}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default MoreProjects;
