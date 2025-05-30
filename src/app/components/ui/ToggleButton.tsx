'use client';
import React from 'react';

export default function ToggleButton({ isDark, onToggle, iconDark, iconLight }) {
    return (
        <div
            onClick={onToggle}
            className="relative w-20 h-10 flex items-center select-none justify-between rounded-full shadow-2xl border-2 border-buttonColor cursor-pointer transition-colors duration-300 bg-foreground"
        >
          {/* Íconos visibles a los lados */}
            <div className="absolute  left-2 z-10">{iconDark}</div>
            <div className="absolute  right-2 z-10">{iconLight}</div>
        
          {/* Círculo deslizante que cubre el ícono activo */}
            <div
                className={`absolute  w-8 left-0.5 rigth-0.5 h-8 bg-buttonColor z-50 rounded-full shadow-md transition-transform duration-300 ${
                    isDark ? 'translate-x-10' : 'translate-x-0'
                }`}
            />
        </div>
    );
}
