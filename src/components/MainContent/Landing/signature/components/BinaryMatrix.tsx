'use client';

import { useState, useEffect } from 'react';
import { BINARY_MATRIX_COLUMNS, BINARY_MATRIX_ROWS } from '../constants/signatureData';

const MOBILE_MAX_WIDTH = 768;
const MOBILE_COLS = 8;
const MOBILE_ROWS = 14;

// --- Sub-componente BinaryColumn estático animado por CSS ---
const BinaryColumn = ({ length, delayIndex }: { length: number, delayIndex: number }) => {
    // Generamos el array una sola vez y no lo guardamos en estado
    const staticBinary = Array.from({ length }, () => Math.round(Math.random()));

    return (
        <div 
            className="flex flex-col animate-pulse will-change-[opacity]"
            style={{ 
                animationDuration: `${2 + (delayIndex % 3)}s`, 
                animationDelay: `${delayIndex * 0.15}s` 
            }}
        >
            {staticBinary.map((val, idx) => (
                <span 
                    key={idx} 
                    style={{ 
                        opacity: 0.2 + (Math.random() * 0.6),
                        textShadow: val === 1 ? '0 0 10px #07F8F2' : 'none'
                    }}
                >
                    {val}
                </span>
            ))}
        </div>
    );
};

// --- Sub-componente BinaryMatrix para el efecto de lluvia de datos (Sin interacción) ---
export const BinaryMatrix = () => {
    const [mounted, setMounted] = useState(false);
    const [cols, setCols] = useState(BINARY_MATRIX_COLUMNS);
    const [rows, setRows] = useState(BINARY_MATRIX_ROWS);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) return;
        const apply = () => {
            const narrow = window.innerWidth < MOBILE_MAX_WIDTH;
            setCols(narrow ? MOBILE_COLS : BINARY_MATRIX_COLUMNS);
            setRows(narrow ? MOBILE_ROWS : BINARY_MATRIX_ROWS);
        };
        apply();
        window.addEventListener('resize', apply, { passive: true });
        return () => window.removeEventListener('resize', apply);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div className="flex justify-between w-full h-full px-4 md:px-10 opacity-30">
            {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1 font-mono text-[10px] md:text-xs 3xl:text-xl text-[#07F8F2]/60">
                    <BinaryColumn length={rows} delayIndex={i} />
                </div>
            ))}
        </div>
    );
};
