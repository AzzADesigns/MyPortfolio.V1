'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Header from './Header/presentation/Header';
import Card from './ui/Card';
import { Them_Trans } from './Header/themeAndTraductor/Them_Trans';
import { Title } from './ui/Title';
import { FeaturedProject } from './body/featured/FeaturedProject';
import { ProfileImage } from './ui/ProfileImage';
import Footer from './footer/Footer';


import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLazyMoreProjects } from './hooks/useLazyMoreProjects';
import { useLazyFooter } from './hooks/useLazyFooter';
import { useGSAPHomeAnimation } from './hooks/useGSAPHomeAnimation';
import { ActualPojects } from './body/actualProjects/ActualPojects';


gsap.registerPlugin(ScrollTrigger);

const LazyMoreProjects = dynamic(
    () => import('./body/more-projects/MoreProjects').then(mod => mod.MoreProjects),
    { ssr: false }
);

export default function Home() {
    const t = useTranslations('textsPage');
    const profileRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const aboutRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);


    const { ref: moreProjectsRef, shouldRender } = useLazyMoreProjects();
    const { ref: lazyFooterRef, shouldRender: shouldRenderFooter } = useLazyFooter();
    
    
    

    useGSAPHomeAnimation(cardRef, profileRef, aboutRef, featuredRef);



    return (
        <div className="flex flex-col overflow-x-hidden items-center max-w-[1900px] min-h-screen bg-background text-textColor font-[family-name:var(--font-geist-sans)] selection">
            <div className="flex flex-col h-full items-center xl:items-start w-[500px] md:w-[85%] xl:mr-52 xl:w-[47%]">
                <div className="fixed w-full z-50 left-0 xl:left-[67%] 2xl:left-[1225px] xl:w-70 xl:top-10">
                    <Them_Trans />
                    <div className='hidden xl:block'>
                        <ActualPojects/>
                    </div>
                </div>

                <div className="w-[45vh] md:w-full flex gap-5 md:items-center 2xl:items-start flex-col mt-25 xl:mt-10 xl:top-20">
                    <header>
                        <Card extraClass="" ref={cardRef} style={{ opacity: 0 }}>
                            <Header featuredRef={featuredRef} />
                            <ProfileImage ref={profileRef} />
                            
                        </Card>
                    </header>
                    <main className="w-full overflow-visible flex flex-col gap-3.5 justify-center md:items-center 2xl:items-start transition-all duration-300 ">

                        <Card extraClass="p-np" ref={aboutRef} style={{ opacity: 0 }}>
                            <Title>{t('textAbout')}</Title>
                            <p className='mt-3 text-textColor'>{t('textAboutme')}</p>
                        </Card>

                        <div className='w-full overflow-visible flex flex-col justify-center md:items-center 2xl:items-start transition-all duration-300  xl:hidden -mt-3'>
                            <ActualPojects/>
                        </div>

                        <Card ref={featuredRef} extraClass="mt-1.5" style={{ opacity: 0 }}>
                            <FeaturedProject />
                        </Card>

                        <Card extraClass="mt-2" ref={moreProjectsRef}>
                            {shouldRender && <LazyMoreProjects />}
                        </Card>
                    </main>

                    <footer ref={lazyFooterRef} className=" w-full 2xl:w-[90%]  flex justify-center xl:ml-0 mb-10">
                        {shouldRenderFooter && (
                            <Card extraClass='w-full'>
                                <Footer />
                            </Card>
                        )}
                    </footer>
                </div>
            </div>
        </div>
    );
}
