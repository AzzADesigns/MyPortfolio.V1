'use client'

import Image from 'next/image';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import TechStack from '../../ui/TechStack';
import Deploy from '../../ui/Deploy';
import Tilt from 'react-parallax-tilt';
import { projectTexts } from '@/app/data/texts';
import { useState } from 'react';

export const MoreProjects = () => {
    return (
        <div>
            <Card extraClass="w-full flex flex-col ">
                <Title extraClass='p-np mt-5'>Más Proyectos</Title>
                <div className="flex flex-col justify-center -mt-5 items-center">
                    {Object.values(projectTexts).slice(1).map((project, index) => {
                        const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

                        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setMousePos({
                                x: e.clientX - rect.left,
                                y: e.clientY - rect.top
                            });
                        };

                        return (
                            <div
                                key={index}
                                className="flex rounded-xl flex-col gap-5 p-np md:w-full border-background"
                            >
                                <Tilt
                                    perspective={2000}
                                    transitionSpeed={1000}
                                    
                                    gyroscope={true}
                                    className="rounded-2xl shadow-lg"
                                >
                                    <div
                                        className="relative"
                                        onMouseMove={handleMouseMove}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={500}
                                            height={300}
                                            className="h-80 w-280 object-cover rounded-2xl cursor-pointer"
                                        />
                                        <div
                                            className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl transition-all duration-100"
                                            style={{
                                                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.25), transparent 80%)`
                                            }}
                                        />
                                    </div>
                                </Tilt>
                                <article className="w-full">
                                    <header className="flex flex-col gap-2 pr-1">
                                        <div className="flex items-center justify-between">
                                            <TitelPage title={project.title} />
                                            <Deploy url={project.deployUrl} />
                                        </div>
                                        <TechStack technologies={project.technologies} />
                                    </header>
                                    <div className="md:h-20 2xl:h-50 mt-4 pr-2 overflow-y-auto custom-scrollbar">
                                        <p>
                                            <span className="text-buttonColor font-semibold">{project.title}</span> {project.description}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default MoreProjects;
