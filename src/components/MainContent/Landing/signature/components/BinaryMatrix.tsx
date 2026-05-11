'use client';

import { useState, useEffect } from 'react';
import { BINARY_MATRIX_COLUMNS, BINARY_MATRIX_ROWS, BINARY_FLICKER_MIN_INTERVAL, BINARY_FLICKER_RANGE } from '../constants/signatureData';

// --- Sub-componente BinaryColumn para cada columna de la lluvia de datos ---
const BinaryColumn = ({ length }: { length: number }) => {
    const [binary, setBinary] = useState<number[]>([]);

    useEffect(() => {
        setBinary(Array.from({ length }, () => Math.round(Math.random())));
        
        const interval = setInterval(() => {
            setBinary(prev => {
                if (prev.length === 0) return prev;
                const next = [...prev];
                next[Math.floor(Math.random() * next.length)] = Math.round(Math.random());
                return next;
            });
        }, BINARY_FLICKER_MIN_INTERVAL + Math.random() * BINARY_FLICKER_RANGE);

        return () => clearInterval(interval);
    }, [length]);

    if (binary.length === 0) return null;

    return (
        <>
            {binary.map((val, idx) => (
                <span 
                    key={idx} 
                    className="transition-all duration-500"
                    style={{ 
                        opacity: 0.2 + (Math.random() * 0.6),
                        textShadow: val === 1 ? '0 0 10px #07F8F2' : 'none'
                    }}
                >
                    {val}
                </span>
            ))}
        </>
    );
};

// --- Sub-componente BinaryMatrix para el efecto de lluvia de datos (Sin interacción) ---
export const BinaryMatrix = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    
    if (!mounted) return null;

    return (
        <div className="flex justify-between w-full h-full px-4 md:px-10 opacity-30">
            {Array.from({ length: BINARY_MATRIX_COLUMNS }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 font-mono text-[10px] md:text-xs 2xl:text-xl text-[#07F8F2]/60">
                    <BinaryColumn length={BINARY_MATRIX_ROWS} />
                </div>
            ))}
        </div>
    );
};
