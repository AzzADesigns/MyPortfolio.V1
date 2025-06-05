"use client"

import React, { useEffect, useState, useRef } from 'react';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import PageContainer from '../featured/PageContainer';
import { projectTexts } from "../../../data/texts";
import CarouselButton from '../../ui/CarouselButton';

interface Project {
    title: string;
    description: string;
    technologies: { name: string; icon?: React.ReactNode }[];
    image: string;
    deployUrl: string;
}

export const MoreProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const projectArray = Object.values(projectTexts);
        setProjects(projectArray as unknown as Project[]);
    }, []);
    
    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };
    
    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <Card extraClass="w-full p-np">
            <Title>Más Proyectos</Title>

            <div className="mt-4 grid relative gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex w-full absolute top-[50%] justify-between gap-2">
                        <CarouselButton 
                            direction="left" 
                            onClick={scrollLeft} 
                            ariaLabel="Anterior proyecto" 
                        />
                        <CarouselButton 
                            direction="right" 
                            onClick={scrollRight} 
                            ariaLabel="Siguiente proyecto" 
                        />
                    </div>
                </div>

                <div 
                    ref={carouselRef}
                    className="flex gap-10  overflow-x-auto w-full px-2 scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="w-[400px] mb-5  border-2 border-background shadow-xl p-5 rounded-lg flex-shrink-0"
                        >
                            <PageContainer
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                imageSrc={project.image}
                                imageAlt={project.title}
                                deployUrl={project.deployUrl}
                                extraclass="flex-col w-180"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default MoreProjects;