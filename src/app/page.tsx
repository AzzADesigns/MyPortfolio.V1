'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Image from "next/image";
import Header from "./components/Header/presentation/Header";
import Card from "./components/ui/Card";
import { Them_Trans } from "./components/Header/themeAndTraductor/Them_Trans";
import { Title } from "./components/ui/Title";
import { FeaturedProject } from "./components/body/featured/FeaturedProject";
import MoreProjects from "./components/body/more-projects/MoreProjects";
import AboutMe from "./components/ui/AboutMe";

export default function Home() {
    const profileRef = useRef(null);
    const cardRef = useRef(null); 
    const aboutRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            cardRef.current,
            {
                opacity: 0,
                y: 30,
                scale: 0.92,
                filter: "blur(6px)",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.12,
                ease: "power3.out",
                delay: 0.1,
            }
        );

        tl.fromTo(
            profileRef.current,
            {
                opacity: 0,
                y: -20,
                scale: 0.9,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "expo.out",
            },
            "-=0.6" 
        );

        tl.fromTo(
            aboutRef.current,
            {
                opacity: 0,
                y: 40,
                scale: 0.95,
                filter: "blur(8px)",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.9,
                ease: "power3.out",
            },
            "-=0.1" 
        );
    }, []);

    return (
        <div className="flex flex-col items-center max-w-[1900px] min-h-screen bg-background text-textColor overflow-x-hidden overflow-y-auto transition-all duration-500 font-[family-name:var(--font-geist-sans)] selection">
            <div className="flex flex-col items-center xl:items-start w-[500px] md:w-[85%] xl:mr-52 xl:w-[47%]">
                <div className="fixed w-full z-50 left-0 xl:left-[67%] 2xl:left-[1225px] xl:w-70 xl:top-10">
                    <Them_Trans />
                </div>

                <div className="w-[45vh] md:w-full flex md:items-center 2xl:items-start flex-col mt-25 xl:mt-10 xl:top-20">
                    <Card extraClass="" ref={cardRef} style={{ opacity: 0 }}>
                        <Header />
                        <div
                            ref={profileRef}
                            className="absolute z-40 w-24 lg:w-[170px] lg:h-[170px] overflow-hidden rounded-full top-47 lg:top-24 left-3 lg:left-8 border-4 border-foreground transition-all duration-300 profile-img-wrapper"
                            style={{ opacity: 0 }}
                        >
                            <Image
                                src="/perfil.png"
                                alt="Imagen de perfil"
                                width={170}
                                height={170}
                                className="w-24 lg:w-170 rounded-full transition-transform duration-300 hover:scale-110"
                            />
                            <div className="glass-glow" />
                        </div>
                    </Card>

                    <main className="w-full flex flex-col gap-5 justify-center md:items-center 2xl:items-start transition-all duration-300 mt-5">
                        <Card extraClass="p-np" ref={aboutRef} style={{ opacity: 0 }}>
                            <Title>Acerca de</Title>
                            <AboutMe />
                        </Card>
                        <Card>
                            <FeaturedProject />
                        </Card>
                        <Card>
                            <MoreProjects />
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
}
