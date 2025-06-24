'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { FaHandPointer } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export const SwipeHint: React.FC = () => {
    const handRef = useRef(null);
    const t = useTranslations('textsPage');

    useGSAP(() => {
        gsap.to(handRef.current, {
            x: -40,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            duration: 1.2,
        });
    }, []);

    return (
        <div className="lg:hidden absolute bottom-4 left-1/2 z-40 transform -translate-x-1/2 text-white/90 flex flex-col items-center pointer-events-none">
            <div ref={handRef} className="text-2xl ml-12">
                <FaHandPointer className='text-white/90'/>
            </div>
            <span className="text-xs mt-1 ">{t("textSwipe")}</span>
        </div>
    );
};
