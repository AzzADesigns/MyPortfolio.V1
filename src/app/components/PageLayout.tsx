'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';

import Header from './Header/presentation/Header';
import Card from './ui/Card';
import { Them_Trans } from './Header/themeAndTraductor/Them_Trans';
import { Title } from './ui/Title';
import { FeaturedProject } from './body/featured/FeaturedProject';
import AboutMe from './ui/AboutMe';
import { ProfileImage } from './ui/ProfileImage';

import { useGSAPHomeAnimation } from '../hooks/useGSAPHomeAnimation';
import { useLazyMoreProjects } from '../hooks/useLazyMoreProjects';

const LazyMoreProjects = dynamic(() => import('./body/more-projects/MoreProjects'), {
    loading: () => <p className="text-center">Cargando proyectos...</p>,
    ssr: false
});

export default function Home() {
    const profileRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);

    const { ref: moreProjectsRef, shouldRender } = useLazyMoreProjects();
    useGSAPHomeAnimation(cardRef, profileRef, aboutRef, featuredRef);

    return (
        <div className="flex flex-col overflow-x-hidden items-center max-w-[1900px] min-h-screen bg-background text-textColor font-[family-name:var(--font-geist-sans)] selection">
            <div className="flex flex-col items-center xl:items-start w-[500px] md:w-[85%] xl:mr-52 xl:w-[47%]">
                <div className="fixed w-full z-50 left-0 xl:left-[67%] 2xl:left-[1225px] xl:w-70 xl:top-10">
                    <Them_Trans />
                </div>

                <div className="w-[45vh] md:w-full flex md:items-center 2xl:items-start flex-col mt-25 xl:mt-10 xl:top-20">
                    <Card extraClass="" ref={cardRef} style={{ opacity: 0 }}>
                        <Header />
                        <ProfileImage ref={profileRef} />
                    </Card>

                    <main className="w-full overflow-x-hidden flex flex-col gap-3.5 justify-center md:items-center 2xl:items-start transition-all duration-300 mt-5">
                        <Card extraClass="p-np" ref={aboutRef} style={{ opacity: 0 }}>
                            <Title>Acerca de</Title>
                            <AboutMe />
                        </Card>

                        <Card ref={featuredRef} extraClass='mt-1.5' style={{ opacity: 0 }}>
                            <FeaturedProject />
                        </Card>

                        <Card extraClass="mb-10 mt-2" ref={moreProjectsRef}>
                            {shouldRender && <LazyMoreProjects />}
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    );
}
