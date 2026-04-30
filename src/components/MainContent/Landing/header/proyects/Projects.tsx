import React from 'react';
import Image from 'next/image';
import { PROJECT_IMAGES } from './constants/projectData';

export default function Projects() {
    return (
        <div className="relative w-full lg:flex-1 h-[300px] md:h-[500px] lg:h-[400px] 2xl:h-auto flex items-center justify-center my-10 lg:my-0 z-10">
            {PROJECT_IMAGES.map((img, index) => (
                <div key={index} className={`absolute ${img.animateClass} gsap-hero-image`} style={{ zIndex: img.zIndex }}>
                    <div className={img.containerClass}>
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={735}
                            height={400}
                            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-transform duration-500"
                            priority={index === 2} // Priority for the central image
                        />
                    </div>
                </div>
            ))}

            {/* Gran arco decorativo de fondo y flecha */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ zIndex: 0 }}>
                <div
                    className="absolute border-[3px] border-[#89EA2B]/90 rounded-full gsap-hero-bg w-[280px] h-[280px] md:w-[450px] md:h-[450px] lg:w-[320px] lg:h-[320px] xl:w-[450px] xl:h-[450px] 2xl:w-[550px] 2xl:h-[550px] lg:top-1/2 lg:left-[56%] lg:-translate-x-[72%] lg:-translate-y-[40%]"
                >
                    <svg 
                        className="absolute -bottom-[5px] md:-bottom-[5px] left-1/2 -translate-x-1/2 animate-bounce" 
                        width="48" 
                        height="72"
                        viewBox="0 0 24 36"
                        fill="none" 
                        stroke="#D1D5DB" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="0" x2="12" y2="32"></line>
                        <polyline points="5 25 12 32 19 25"></polyline>
                    </svg>
                </div>
            </div>
        </div>
    );
}
