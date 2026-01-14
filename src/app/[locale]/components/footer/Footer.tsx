'use client';
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import { FaLinkedin, FaGithub, FaFolderOpen, FaEnvelope } from 'react-icons/fa';
import { useGSAP } from "@gsap/react";

export default function Footer() {
    const t = useTranslations('textsPage');
    const links = [
        {
            label: t('textMyLikendin'),
            href: "https://www.linkedin.com/in/azariel-moreno/",
            icon: FaLinkedin,
        },
        {
            label: t('textMyGithub'),
            href: "https://github.com/AzzADesigns",
            icon: FaGithub,
        },
        {
            label: t('textRepo'),
            href: "https://github.com/AzzADesigns/MyPortfolio.V1",
            icon: FaFolderOpen,
        },
    ];

    const email = "walter.azariel.moreno@gmail.com";
    const toastRef = useRef<HTMLDivElement>(null);
    const [showToast, setShowToast] = useState(false);

    useGSAP(() => {
        if (showToast && toastRef.current) {
            gsap.fromTo(
                toastRef.current,
                { y: 20, opacity: 0, display: "flex" },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(toastRef.current, {
                            delay: 2,
                            duration: 0.4,
                            opacity: 0,
                            y: 20,
                            onComplete: () => {
                                setShowToast(false);
                            },
                        });
                    },
                }
            );
        }
    }, [showToast]);


    return (
        <footer className="relative pn-p py-8 md:py-12">

            <div className="flex mt-3 flex-col md:flex-row justify-between items-center gap-8 md:gap-4 px-10">
                {/* Links Section */}
                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {links.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 text-textColor hover:text-buttonColor transition-all duration-300 text-sm md:text-base lg:text-lg"
                            >
                                <Icon className="text-xl md:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative">
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-buttonColor group-hover:w-full transition-all duration-300"></span>
                                </span>
                            </Link>
                        );
                    })}

                    {/* Email */}
                    <Link
                        href={`mailto:${email}`}
                        className="group flex items-center gap-3 text-textColor hover:text-buttonColor transition-all duration-300 cursor-pointer text-sm md:text-base lg:text-lg"
                        title="Enviar email"
                    >
                        <FaEnvelope className="text-xl md:text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">
                            {email}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-buttonColor group-hover:w-full transition-all duration-300"></span>
                        </span>
                    </Link>
                </div>

                {/* Logo Section */}
                <div className="flex flex-col items-center gap-3 xl:mr-10">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-buttonColor rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <Image
                            src="/logoAzza.jpg"
                            alt="AzzA Designs Logo"
                            width={100}
                            height={100}
                            className="relative object-cover w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full shadow-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <p className="text-xs md:text-sm text-textColor/60 text-center">
                        © {new Date().getFullYear()} AzzA Designs
                    </p>
                </div>
            </div>
        </footer>
    );
}
