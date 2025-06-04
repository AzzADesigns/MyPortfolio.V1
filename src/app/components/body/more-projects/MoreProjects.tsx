"use client"

import React, { useEffect, useState } from 'react';
import Card from '../../ui/Card';
import { Title } from '../../ui/Title';
import TitelPage from '../../ui/TitlePage';
import PageContainer from '../featured/PageContainer';
import { projectTexts } from "../../../data/texts";



export const MoreProjects = () => {
    const [project, setProjects]= useState([])

    useEffect(()=>{
        const projectArray=Object.values(projectTexts)
        setProjects(projectArray)
    },[])
    
    
    return (
        <Card extraClass="w-full p-np">
            <Title>Más Proyectos</Title>
            <div className="mt-4 grid gap-4">
                <TitelPage title="Urbania"/>
                <div className='flex gap-5'>
                    {project.map((project, index) => (
                        <div key={index} className='w-80 bg-red-300 '>
                            <PageContainer
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                imageSrc={project.image}
                                imageAlt={project.title}
                                deployUrl={project.deployUrl}
                                extraclass=" flex-col"
                            />

                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default MoreProjects;