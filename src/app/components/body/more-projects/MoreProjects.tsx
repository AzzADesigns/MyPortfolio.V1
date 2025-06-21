'use client'

import Image from 'next/image';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import TechStack from '../../ui/TechStack';
import Deploy from '../../ui/Deploy';

import { projectTexts, textsPage } from '@/app/data/texts';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Carousel } from '../../ui/Carousel';

gsap.registerPlugin(ScrollTrigger);

export const MoreProjects = () => {
    const projectRefs = useRef<HTMLDivElement[]>([]);
    const titleRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const timer = setTimeout(() => {
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            projectRefs.current.forEach((ref) => {
                if (ref) {
                    gsap.fromTo(ref,
                        { opacity: 0, y: 60, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.7,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div>
            

            <Card extraClass="w-full flex flex-col pb-10 ">
                <div ref={titleRef}>
                    <Title extraClass='p-np mt-5'>{textsPage.textMoreProjects}</Title>
                </div>
                <div className="flex flex-col justify-center -mt-5 items-center overflow-hidden">
                    {Object.values(projectTexts).slice(1).map((project, index) => (
                        <div
                            key={index}
                            ref={el => {
                                if (el) projectRefs.current[index] = el;
                            }}
                            className="flex rounded-xl flex-col gap-5 p-np md:w-full border-background"
                        >
                            <div className="relative  m-auto">
                                <Carousel slides={project.image} />
                            </div>

                            <article className="w-full">
                                <header className="flex flex-col gap-2 pr-1">
                                    <div className="flex items-center justify-between">
                                        <TitelPage title={project.title} />
                                        {project.link && (
                                            <Deploy
                                                url={project.link.url}
                                                type={project.link.type}
                                            />
                                        )}
                                    </div>
                                    <TechStack technologies={project.technologies} />
                                </header>
                                <div className="border-2 rounded-2xl p-5 border-background h-auto mt-4 pr-2 overflow-y-auto custom-scrollbar">
                                    <p>
                                        <span className="text-buttonColor font-semibold">{project.title}</span> {project.description}
                                    </p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default MoreProjects;
