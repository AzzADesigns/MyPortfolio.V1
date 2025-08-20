'use client'

import { useState } from "react";
import Card from "../../ui/Card";
import { Title } from "../../ui/Title";
import { useTranslations } from 'next-intl';

import TechStack from "../../ui/TechStack";
import Deploy from "../../ui/Deploy";
import Tilt from 'react-parallax-tilt';
import { Carousel } from "../../ui/Carousel";
import { SwipeHint } from "../../ui/SwipeHint";

export function FeaturedProject() {
    // Obtenemos todas las claves de los proyectos
    const projects = useTranslations().raw('projectTexts');
    const firstProjectKey = Object.keys(projects)[0]; // toma automáticamente la primera clave
    const t = useTranslations(`projectTexts.${firstProjectKey}`); // traducciones del primer proyecto

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const slides = t.raw('image');

    return (
        <Card extraClass="w-full p-6 flex flex-col md:flex-row gap-6">
            
            <Tilt
                perspective={1000}
                transitionSpeed={700}
                scale={1.05}
                className="w-full md:w-1/2"
                gyroscope={true}
            >
                <div
                    className="relative h-[300px] xl:h-[460px] group overflow-hidden rounded-2xl cursor-pointer"
                    onMouseMove={handleMouseMove}
                >
                    <SwipeHint/>
                    <Carousel slides={slides} />
                    <div
                        className="absolute top-0 left-0 w-full h-[300px] xl:h-[460px] pointer-events-none rounded-2xl transition-all duration-100"
                        style={{
                            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.25), transparent 80%)`
                        }}
                    />
                </div>
            </Tilt>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <Title extraClass="text-2xl font-bold mb-3">{t('title')}</Title>
                    {t.raw('description').map((paragraph: string, index: number) => (
                        <p className="text-textColor mb-2 2xl:text-lg" key={index}>{paragraph}</p>
                    ))}
                </div>
                <div>
                    <TechStack technologies={t.raw('technologies')} extraClass="mb-4" />
                    {t('link.url') && (
                        <Deploy
                            url={t('link.url')}
                            type={t('link.type')}
                            extraClass="text-base"
                        />
                    )}
                </div>
            </div>
        </Card>
    );
}
