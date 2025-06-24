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
import { SwipeHint } from '../../ui/SwipeHint';

gsap.registerPlugin(ScrollTrigger);

export const MoreProjects = () => {
    const t = useTranslations();
    const projectRefs = useRef<HTMLDivElement[]>([]);
    const titleRef = useRef<HTMLDivElement>(null);

    const projectKeys = Object.keys(t.raw('projectTexts')).slice(1);

    useGSAP(() => {
        const timer = setTimeout(() => {
            if (titleRef.current) {
                gsap.fromTo(
                    titleRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            projectRefs.current.forEach((ref) => {
                if (ref) {
                    gsap.fromTo(
                        ref,
                        { opacity: 0, y: 60, scale: 0.9 },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.7,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: ref,
                                start: 'top 80%',
                                toggleActions: 'play none none reverse'
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
        <Card extraClass="w-full flex flex-col pb-10">
            
            <div ref={titleRef}>
                <Title extraClass="p-np mt-5">{t('textsPage.textMoreProjects')}</Title>
            </div>

            <div className="flex flex-col justify-center mt-5 items-center overflow-hidden">
                {projectKeys.map((key, index) => {
                    const project = t.raw(`projectTexts.${key}`);

                    return (
                        <div
                            key={index}
                            ref={el => {
                                if (el) projectRefs.current[index] = el;
                            }}
                            className="flex rounded-xl flex-col gap-5  md:w-full border-background"
                        >
                            <div className="relative m-auto">
                                <SwipeHint />
                                <Carousel slides={project.image} />
                            </div>

                            <article className="w-full p-np">
                                <div className="flex flex-col gap-2 pr-1">
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
                                </div>

                                <div className="border-2 mb-10 rounded-2xl p-5 border-background h-auto mt-4 pr-2 overflow-y-auto custom-scrollbar">
                                    <p className='text-sm xl:text-lg'>
                                        <span className="text-buttonColor font-semibold">
                                            {project.title}
                                        </span>{' '}
                                        {project.description.map((text: string, i: number) => (
                                            <span key={i}>{text}</span>
                                        ))}
                                    </p>
                                    
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
