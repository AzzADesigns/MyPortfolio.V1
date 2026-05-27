'use client';

import Link from 'next/link';
import Image from 'next/image';
import { sora } from '../../shared';
import { SOCIAL_LINKS } from '../../header/validation/constants/validationData';

export const ContactHeadline = () => {
    return (
        <div className="w-full lg:w-[50%] xl:w-[55%] flex flex-col items-center xl:items-center lg:justify-end order-1 lg:order-2 gap-10 lg:gap-14">
            <h2 className={`text-center text-white text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl font-extrabold leading-[1.05] tracking-tight ${sora.className}`}>
                Trabajemos juntos<br />
                para lograr que tu<br />
                producto tenga una<br />
                <span className="text-[#89EA2B]">web de marca</span>
            </h2>

            {/* Redes Sociales Desktop (xl+) — mismo estilo que el header */}
            <div className="hidden xl:flex items-center justify-center gap-10 w-full pt-4">
                {SOCIAL_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative group hover:scale-110 active:scale-75 ${link.activeClass} transition-all duration-300 block contact-social-reveal w-[64px] h-[64px]`}
                    >
                        <Image src={link.icon} alt={link.name} fill sizes="64px" className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-move"
                            style={{
                                backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2, #89EA2B)',
                                WebkitMaskImage: `url('${link.icon}')`,
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                                maskImage: `url('${link.icon}')`,
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center'
                            }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};
