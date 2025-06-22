'use client';
import Image from 'next/image';
import { forwardRef } from 'react';

export const ProfileImage = forwardRef<HTMLDivElement>((_, ref) => (
    <div
        ref={ref}
        className="absolute z-40 w-24 lg:w-[170px] lg:h-[170px] overflow-hidden rounded-full top-47 lg:top-24 left-3 lg:left-8 border-4 border-foreground transition-all duration-300 profile-img-wrapper"
        style={{ opacity: 0 }}
    >
        <Image
            src="/perfil.png"
            alt="Imagen de perfil"
            width={170}
            height={170}
            className="w-24 lg:w-170 rounded-full transition-transform duration-300 hover:scale-110"
        />
        <div className="glass-glow" />
    </div>
));

// ✅ Necesario para evitar warning con forwardRef
ProfileImage.displayName = 'ProfileImage';
