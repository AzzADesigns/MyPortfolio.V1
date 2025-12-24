'use client';
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useTranslations } from 'next-intl';
import Image from "next/image";

export default function Footer() {
    const t = useTranslations('textsPage');
    const links = [
        {
            label: t('textMyLikendin'),
            href: "https://www.linkedin.com/in/azariel-moreno/",
        },
        {
            label: t('textMyGithub'),
            href: "https://github.com/AzzADesigns",
        },
        {
            label: t('textRepo'),
            href: "https://github.com/AzzADesigns/MyPortfolio.V1",
        },
    ];

    const email = "walter.azariel.moreno@gmail.com";
    const toastRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (showToast && toastRef.current) {
            gsap.fromTo(
                toastRef.current,
                { x: -20, opacity: 0, display: "block" },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(toastRef.current, {
                            delay: 1.5,
                            duration: 0.3,
                            opacity: 0,
                            x: -20,
                            onComplete: () => {
                                setShowToast(false);
                            },
                        });
                    },
                }
            );
        }
    }, [showToast]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setShowToast(true);
        } catch (err) {
            console.error("Error al copiar el correo:", err);
        }
    };

    return (
        <section className="flex pn-p justify-between relative">
            {/* Toast */}
            {showToast && (
                <div
                    ref={toastRef}
                    className="absolute left-[20%] top-[90%] bg-buttonColor text-white px-3 py-1 rounded shadow-lg text-xs xl:text-sm pointer-events-none"
                >
                    {t('textCopied')}
                </div>
            )}

            <div className="text-sm xl:text-2xl flex flex-col gap-3 p-np text-textColor">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-buttonColor transition-colors duration-200 underline"
                    >
                        {link.label}
                    </Link>
                ))}
                <p
                    onClick={handleCopy}
                    className="hover:text-buttonColor  transition-colors duration-200 cursor-pointer underline"
                    title="Copiar al portapapeles"
                >
                    {email}
                </p>
            </div>

            <div className="w-[40%] flex justify-center md:mb-3 items-center">
                <div className="text-xs p-2 rounded-2xl flex justify-center items-center   xl:text-2xl text-textColor mt-5">
                    <Image 
                        src="/logoAzza.jpg"
                        alt="logo"
                        width={100}
                        height={100}
                        className="object-cover w-full rounded-full shadow-2xl mb-6 xl:mb-0"
                    />
                </div>
            </div>
        </section>
    );
}
