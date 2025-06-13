'use client'

import Image from 'next/image';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import TechStack from '../../ui/TechStack';
import Deploy from '../../ui/Deploy';

import { projectTexts } from '@/app/data/texts';

export const MoreProjects = () => {
    return (
        <div>
            <Card extraClass="w-full flex flex-col gap-10">
                <Title extraClass='p-np'>Más Proyectos</Title>
                <div className="flex flex-col justify-center items-center gap-6">
                    {Object.values(projectTexts).map((project, index) => (
                        <div
                            key={index}
                            className="flex w-[42vh] rounded-xl flex-col gap-5 p-np md:w-full border-background"
                        >
                            <figure className='rounded-2xl'>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={500}
                                    height={300}
                                    className="h-80 w-280 object-cover rounded-2xl"
                                />
                            </figure>
                            <article className="w-full p-np">
                                <header className="flex flex-col gap-2">
                                    <div className="flex  items-center justify-between">
                                        <TitelPage title={project.title} />
                                        <Deploy url={project.deployUrl} />
                                    </div>
                                    <TechStack technologies={project.technologies} />
                                </header>
                                <div className="md:h-20 2xl:h-50 mt-2 pr-2 overflow-y-auto custom-scrollbar">
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
