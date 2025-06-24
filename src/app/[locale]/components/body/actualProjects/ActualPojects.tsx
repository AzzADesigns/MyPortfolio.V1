import React, { useState, forwardRef } from 'react';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import { TitleAndDescriptionActualProject } from './TitleAndDescriptionActualProject';
import { useTranslations } from 'next-intl';

interface Project {
    title: string;
    description: string;
    href: string;
}

export const ActualPojects = forwardRef<HTMLDivElement>((_, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const t = useTranslations();

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const projects = t.raw('actualProjects') as Project[];

    return (
        <div ref={ref} className='w-full flex justify-center'>
            <Card extraClass="w-full transition-all p-np mt-5   backdrop-blur-sm bg-background/20 xl:bg-foreground rounded-2xl xl:rounded-t-3xl p-4">
                <Title>{t('textsPage.textActualProject')}</Title>
                {projects.map((project, index) => (
                    <TitleAndDescriptionActualProject
                        key={index}
                        title={project.title}
                        description={project.description}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                        Href={project.href}
                    />
                ))}
            </Card>
        </div>
    );
});

ActualPojects.displayName = 'ActualPojects';
