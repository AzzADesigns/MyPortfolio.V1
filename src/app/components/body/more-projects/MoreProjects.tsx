"use client"

import Card from '../../ui/Card';
import { Title } from '../../ui/Title';

import PageContainer from '../featured/PageContainer';
import { projectTexts } from '@/app/data/texts';



export const MoreProjects = () => {
    return (
        <Card extraClass="w-full flex flex-col gap-10 ">
            <Title extraClass='p-np'>Más Proyectos</Title>
            <div className="flex flex-wrap justify-center items-center gap-6">
                {Object.values(projectTexts).map((project, index) => (
                    <div
                        key={index}
                        className=""
                    >
                        <PageContainer
                            title={project.title}
                            description={project.description}
                            technologies={project.technologies}
                            imageSrc={project.image}
                            imageAlt={project.title}
                            deployUrl={project.deployUrl}
                            extraclass="flex-col border-2  p-np w-190  border-background "
                            widthIfo='w-full'
                            widthImage='w-280'
                            heigthImage='h-80'
                        />
                    </div>
                ))}
            </div>
        </Card>
    );
};


export default MoreProjects;