'use client';

import { useState } from 'react';

export type BrandHoverState = 'vivas' | 'personalizados' | 'fluidas' | 'marca' | null;

export const useBrandState = () => {
    const [hoveredWord, setHoveredWord] = useState<BrandHoverState>(null);

    return {
        hoveredWord,
        setHoveredWord
    };
};
