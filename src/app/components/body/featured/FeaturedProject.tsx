'use client'

import { useState } from "react";
import Card from "../../ui/Card";
import { Title } from "../../ui/Title";

import Image from "next/image";
import TechStack from "../../ui/TechStack";
import Deploy from "../../ui/Deploy";
import Tilt from 'react-parallax-tilt';
import { projectTexts } from "@/app/data/texts";
import { useVideoModal } from "@/app/hooks/useVideoModal";
import { VideoModal } from "../../ui/VideoModal";

export function FeaturedProject() {
    const featureProject = Object.values(projectTexts)[0];
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { selectedVideo, openVideo, closeVideo } = useVideoModal();

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    return (
        <>
            <VideoModal videoUrl={selectedVideo} onClose={closeVideo} />
            <Card extraClass="w-full p-6 flex flex-col md:flex-row gap-6">
            <Tilt
                perspective={1000}
                transitionSpeed={700}
                scale={1.05}
                className="w-full md:w-1/2"
                gyroscope={true}
            >
                <div
                    className="relative xl:h-[402px] 2xl:h-[360px] h-[300px] group overflow-hidden rounded-2xl cursor-pointer"
                    onMouseMove={handleMouseMove}
                    onClick={() => openVideo(featureProject.video)}
                >
                    <Image
                        src={featureProject.image}
                        alt={featureProject.title}
                        fill
                        className="object-cover rounded-2xl group-hover:brightness-75 transition"
                    />

                    <div
                        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl transition-all duration-100"
                        style={{
                            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.25), transparent 80%)`
                        }}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-5xl opacity-0 group-hover:opacity-100 transition duration-300">&#9658;</span>
                    </div>
                </div>
            </Tilt>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <Title extraClass="text-2xl font-bold mb-3">{featureProject.title}</Title>
                    <p className="text-textColor mb-4">{featureProject.description}</p>
                </div>
                <div>
                    <TechStack technologies={featureProject.technologies} extraClass="mb-4" />
                    {featureProject.link && (
                        <Deploy
                            url={featureProject.link.url}
                            type={featureProject.link.type}
                            extraClass="text-base"
                        />
                    )}
                </div>
            </div>
        </Card>
        </>
    );
}
