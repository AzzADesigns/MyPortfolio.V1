'use client';

import React from 'react';

export const ScrollIndicator = () => (
    <div className="absolute right-2 md:right-5.5 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 z-50 pointer-events-none">
        <span className="text-[11px] font-bold text-[#001720] uppercase tracking-[0.4em] [writing-mode:vertical-lr] opacity-60">
            Scroll
        </span>
        <div className="w-[6px] h-32 bg-[#001720]/10 relative overflow-hidden rounded-full flex justify-center">
            <div className="w-[2px] h-16 bg-[#001720] animate-scroll-bounce rounded-full" />
        </div>
    </div>
);
