import { useState, useEffect } from 'react';
import { BINARY_FLICKER_MIN_INTERVAL, BINARY_FLICKER_RANGE } from '../constants/signatureData';

/**
 * Hook que genera y anima una columna de datos binarios con flicker aleatorio.
 * Devuelve el array de valores (0|1) que el componente renderiza.
 */
export const useBinaryColumn = (length: number) => {
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

    return binary;
};
