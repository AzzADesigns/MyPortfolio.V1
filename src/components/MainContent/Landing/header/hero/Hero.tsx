import React from 'react';
import { HERO_TEXTS } from './constants/heroTexts';
import CTAButton from '../../shared/CTAButton/CTAButton';

export default function Hero() {
    return (
        <div className="flex mt-15 flex-col gap-8 lg:gap-10 3xl:gap-17 w-full max-w-[600px] lg:max-w-[400px] xl:max-w-[480px] 2xl:max-w-[580px] flex-shrink-0 items-center text-center lg:items-start lg:text-left z-20">
            <h1 className="text-4xl md:text-6xl lg:text-4xl xl:text-5xl 3xl:text-[70px] leading-tight lg:leading-snug 3xl:leading-25 text-white gsap-hero-text">
                {HERO_TEXTS.title.line1}<br className="hidden lg:block" />
                {HERO_TEXTS.title.word1}{' '}
                <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2)' }}
                >
                    {HERO_TEXTS.title.highlight1}
                </span>{' '}
                {HERO_TEXTS.title.word2} {' '}<br className="hidden lg:block" />
                {HERO_TEXTS.title.word3}{' '}
                <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(90deg, #89EA2B, #07F8F2)' }}
                >
                    {HERO_TEXTS.title.highlight2}
                </span>
            </h1>

            <p className="text-[#D7D7D7] text-base md:text-lg lg:text-sm xl:text-base 3xl:text-[18px] tracking-normal lg:-tracking-tighter leading-relaxed lg:leading-7 2xl:leading-10 max-w-[400px] md:max-w-none lg:max-w-[380px] 2xl:max-w-[380px] 3xl:max-w-[540px] gsap-hero-text">
                {HERO_TEXTS.description}
            </p>

            <div className="gsap-hero-text w-fit mt-2 lg:mt-0">
                <CTAButton onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })} />
            </div>
        </div>
    );
}
