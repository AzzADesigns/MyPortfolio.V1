'use client';

import Image from 'next/image';
import { ContactForm } from './components/ContactForm';
import { ContactHeadline } from './components/ContactHeadline';
import { FooterBar } from './components/FooterBar';

export const Contact = () => {
    return (
        <section className="flex-none relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden flex flex-col justify-between px-6 md:px-16 lg:px-8 xl:px-16 md:pt-16 pb-6 lg:pt-20 lg:pb-8">
            
            {/* Imagen de fondo (handshake) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Image 
                    src="/branding/contact-me.png" 
                    alt="" 
                    fill 
                    className="object-cover object-right opacity-20 lg:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#001720] via-[#001720]/80 to-transparent"></div>
            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 flex flex-col lg:flex-row justify-center lg:items-center lg:justify-between gap-16 lg:gap-24 flex-1 py-10 lg:py-0 mt-8 lg:mt-0">
                <ContactForm />
                <ContactHeadline />
            </div>

            <FooterBar />
        </section>
    );
};
