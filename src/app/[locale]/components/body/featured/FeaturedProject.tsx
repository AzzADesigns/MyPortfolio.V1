'use client'

import { useState } from "react";
import Card from "../../ui/Card";
import { Title } from "../../ui/Title";
import { useTranslations } from 'next-intl';

import TechStack from "../../ui/TechStack";
import Deploy from "../../ui/Deploy";
import Tilt from 'react-parallax-tilt';
import { Carousel } from "../../ui/Carousel";

import Button from "../../ui/Button";

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
        <Card extraClass="w-full p-6 flex flex-col gap-6">

            <Tilt
                perspective={2000}
                transitionSpeed={1500}
                scale={1.02}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                className="w-full"
                gyroscope={true}
            >
                <div
                    className="relative group overflow-hidden rounded-2xl cursor-pointer"
                    onMouseMove={handleMouseMove}
                >
                    <Carousel slides={slides} priority={true} />
                    <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl transition-all duration-100"
                        style={{
                            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.25), transparent 80%)`
                        }}
                    />
                </div>
            </Tilt>

            <div className="w-full flex flex-col justify-between">
                <div>
                    <Title extraClass="text-2xl font-bold mb-3">{t('title')}</Title>
                    {t.raw('description').map((paragraph: string, index: number) => (
                        <p className="text-textColor mb-2 2xl:text-lg" key={index}>{paragraph}</p>
                    ))}
                </div>
                <div>
                    <TechStack technologies={t.raw('technologies')} extraClass="mb-4" />
                    {t('link.url') && (
                        <Button>
                            <Deploy
                                url={t('link.url')}
                                type={t('link.type')}
                                extraClass="text-base"
                            />

                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
