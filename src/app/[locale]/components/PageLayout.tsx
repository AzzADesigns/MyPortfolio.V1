'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import Header from './Header/presentation/Header';
import Card from './ui/Card';
import { Them_Trans } from './Header/themeAndTraductor/Them_Trans_Up';
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
import NewDivActualP from './ui/NewivActualP';


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
    const actualProjectsRef = useRef<HTMLDivElement>(null);


    const { ref: moreProjectsRef, shouldRender } = useLazyMoreProjects();
    const { ref: lazyFooterRef, shouldRender: shouldRenderFooter } = useLazyFooter();
    
    
    

    useGSAPHomeAnimation(cardRef, profileRef, aboutRef, featuredRef, actualProjectsRef);



    return (
        <div className="flex flex-col overflow-x-hidden items-center  max-w-[1713px] min-h-screen bg-background text-textColor font-[family-name:var(--font-geist-sans)] selection">
            {/*para aarreglar el problema del margen, aca abajo y en theme:trans */}
            <div className="flex flex-col h-full items-center xl:items-start w-[500px] md:w-[85%] xl:mr-40  2xl:w-[800px] xl:w-[47%]">
                <section className="fixed w-full z-50 left-0 xl:left-[69.5%] 2xl:left-[1200px] xl:w-70 xl:top-10">
                    <Them_Trans />
                    <div className='hidden 2xl:block w-full 2xl:min-w-83 '>
                        <NewDivActualP/>
                    </div>

                </section>

                <section className="w-[45vh] md:w-full flex gap-5 md:items-center 2xl:items-start flex-col mt-25 xl:mt-10 xl:top-20">
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

                        <div className='  2xl:hidden -mt-3 mb-2 flex justify-center lg:w-full w-full'>
                            <ActualPojects ref={actualProjectsRef}/>
                        </div>

                        <Card ref={featuredRef} extraClass="" style={{ opacity: 0 }}>
                            <FeaturedProject />
                        </Card>

                        <Card extraClass="mt-2" ref={moreProjectsRef}>
                            {shouldRender && <LazyMoreProjects />}
                        </Card>
                    </main>

                    <footer ref={lazyFooterRef} className=" w-full max-w-[1638px] xl:w-full  flex justify-center xl:ml-0 mb-10">
                        {shouldRenderFooter && (
                            <Card extraClass='w-full'>
                                <Footer />
                            </Card>
                        )}
                    </footer>
                </section>
            </div>
        </div>
    );
}
