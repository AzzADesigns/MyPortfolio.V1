'use client';

import { useRef, RefObject } from 'react';
import { BrandHUD } from './components/BrandHUD';
import { BrandContent } from './components/BrandContent';
import { useBrandState } from './hooks/useBrandState';
import { useBrandEntrance } from './animation/useBrandEntrance';

interface BrandIdentityProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

export const BrandIdentity = ({ containerRef }: BrandIdentityProps) => {
    const brandSectionRef = useRef<HTMLDivElement>(null);
    const { hoveredWord, setHoveredWord } = useBrandState();
    
    useBrandEntrance(brandSectionRef, containerRef);

    return (
        <section 
            ref={brandSectionRef} 
            className="flex-none flex flex-col items-center justify-center relative w-full min-h-screen bg-[#001720] lg:snap-start overflow-hidden px-6 md:px-12 xl:px-24 3xl:px-32 py-20 3xl:pt-20 3xl:pb-2"
        >
            <BrandHUD hoveredWord={hoveredWord} />
            <BrandContent setHoveredWord={setHoveredWord} />
        </section>
    );
};
