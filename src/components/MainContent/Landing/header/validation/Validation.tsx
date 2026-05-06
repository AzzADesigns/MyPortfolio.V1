import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { STATS, SOCIAL_LINKS } from './constants/validationData';

export default function Validation() {
    return (
        <div className="flex flex-col gap-10 lg:gap-16 2xl:gap-30 mt-[-100px] md:mt-0 lg:mt-0 2xl:mt-19 items-center lg:items-end flex-shrink-0 z-20 w-full lg:w-auto pb-32 lg:pb-0">
            <div className="flex flex-row lg:flex-col gap-4 md:gap-20 lg:gap-12 2xl:gap-50 w-full justify-center lg:justify-end px-2">
                {STATS.map((stat, index) => (
                    <div key={index} className="text-center lg:text-right gsap-hero-stat flex-1 lg:flex-auto">
                        <p className="font-bold flex items-baseline justify-center lg:justify-end gap-1 md:gap-2">
                           <span className={`${stat.valueColor} text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px]`}>{stat.value}</span>
                           <span className="text-xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-[55px] text-white">{stat.label}</span>
                        </p>
                        <p className="text-gray-400 text-[11px] md:text-base lg:text-xs xl:text-sm 2xl:text-[25px] mt-1 leading-tight">{stat.subLabel}</p>
                    </div>
                ))}
            </div>

            <div className="hidden lg:block w-[15%] bg-[#89EA2B] absolute bottom-0 right-0 h-2" />

            <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-4 xl:gap-6 2xl:gap-10 gsap-hero-stat mt-4 lg:mt-0">
                {SOCIAL_LINKS.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`relative group hover:scale-110 active:scale-75 ${link.activeClass} transition-all duration-300 block ${link.width} ${link.height}`}
                    >
                        <Image src={link.icon} alt={link.name} fill className="object-contain group-hover:opacity-0 transition-opacity duration-300" />
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
}
