'use client';
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { Title } from '../../ui/Title';

export const Theme: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = theme === 'dark';

    if (!mounted) {
        // Placeholder del mismo tamaño (evita "saltos" visuales)
        return (
            <div className="flex flex-col justify-center items-center gap-3 w-27 h-21" />
        );
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <Title extraClass="hidden md:flex">Tema</Title>
            <div
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="relative w-20 h-8 md:h-10 flex items-center select-none justify-between rounded-full shadow-2xl border-2 border-buttonColor cursor-pointer transition-colors duration-300 bg-foreground"
            >
                <div className="absolute left-2 z-10">
                    <FaMoon className="w-5 h-5 text-buttonColor" />
                </div>
                <div className="absolute right-2 z-10">
                    <FaSun className="w-5 h-5 text-buttonColor" />
                </div>

                <div
                    className={`absolute w-7 md:w-8 h-6 md:h-8 left-0.5 right-0.5 bg-buttonColor z-50 rounded-full shadow-md transition-transform duration-300 ${
                        isDark ? 'translate-x-10' : 'translate-x-0'
                    }`}
                />
            </div>
        </div>
    );
};
