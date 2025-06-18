"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { FaReact } from "react-icons/fa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const rawLines = [
    [
        { text: "type", className: "text-purple-400" },
        { text: " Dev", className: "text-yellow-400" },
        { text: " = ", className: "text-white" },
        { text: "{", className: "text-white" },
    ],
    [
        { text: "  name", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: "string", className: "text-pink-400" },
        { text: ";", className: "text-white" },
    ],
    [
        { text: "  role", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: "string", className: "text-pink-400" },
        { text: ";", className: "text-white" },
    ],
    [
        { text: "  OpenToWork", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: "boolean", className: "text-pink-400" },
        { text: ";", className: "text-white" },
    ],
    [{ text: "};", className: "text-white" }],
    [],
    [
        { text: "export", className: "text-purple-400" },
        { text: " const", className: "text-purple-400" },
        { text: " Azariel", className: "text-green-400" },
        { text: ": ", className: "text-white" },
        { text: "Dev", className: "text-yellow-400" },
        { text: " = {", className: "text-white" },
    ],
    [
        { text: "  name", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: '"Azariel Moreno"', className: "text-lime-300" },
        { text: ",", className: "text-white" },
    ],
    [
        { text: "  role", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: '"Dev Full Stack"', className: "text-lime-300" },
        { text: ",", className: "text-white" },
    ],
    [
        { text: "  OpenToWork", className: "text-cyan-400" },
        { text: ": ", className: "text-white" },
        { text: "true", className: "text-orange-400" },
        { text: ",", className: "text-white" },
    ],
    [{ text: "};", className: "text-white" }],
];

const images = [
    {
        src: "/form1.svg",
        alt: "forma1",
        width: 200,
        height: 200,
        className: "absolute w-7 hidden 2xl:flex bottom-3 lg:w-40 lg:left-[-1] lg:top-0",
    },
    {
        src: "/form2.svg",
        alt: "forma2",
        width: 120,
        height: 120,
        className: "absolute w-7 hidden 2xl:flex bottom-3 lg:w-38 lg:bottom-[-1] lg:left-110",
    },
    {
        src: "/form2.svg",
        alt: "forma2",
        width: 150,
        height: 150,
        className: "absolute w-7 hidden 2xl:flex bottom-3 lg:w-52 lg:bottom-[-1] lg:right-0",
    },
    {
        src: "/form2.svg",
        alt: "forma2",
        width: 150,
        height: 150,
        className:
            "absolute w-7 hidden 2xl:flex bottom-3 lg:w-42 lg:top-[-1] lg:right-15 scale-y-[-1] scale-x-[-1]",
    },
];

export const Banner = () => {
    const codeRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const chars = codeRef.current?.querySelectorAll(".char");
        if (!chars) return;
        gsap.set(chars, { opacity: 0 });

        gsap.to(chars, {
            opacity: 1,
            stagger: 0.007,
            ease: "power1.inOut",
            duration: 0.02,
        });
    }, []);

    return (
        <section className="bg-[#03091E] h-59 lg:h-52 rounded-t-3xl relative overflow-hidden">
            <div className="flex h-52 w-96 p-4 ml-21 ml-narrow-range sm:ml-52 xl:ml-50 2xl:ml-70 text-xs text-white font-mono rounded">
                {/* Line numbers */}
                <div className="text-gray-500 absolute left-27 md:left-53 lg:left-78 xl:left-60 2xl:left-73 text-right pr-4 select-none">
                    {rawLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>

                {/* Code block with GSAP animation */}
                <pre className="overflow-x-auto absolute left-33 md:left-60 lg:left-85 xl:left-67 2xl:left-80">
                    <code ref={codeRef}>
                        {rawLines.map((line, lineIndex) => (
                            <div key={lineIndex}>
                                {line.length === 0 ? (
                                    <>&nbsp;</>
                                ) : (
                                    line.map((segment, segIndex) =>
                                        [...segment.text].map((char, charIndex) => (
                                            <span
                                                key={`${lineIndex}-${segIndex}-${charIndex}`}
                                                className={`char ${segment.className}`}
                                            >
                                                {char}
                                            </span>
                                        ))
                                    )
                                )}
                            </div>
                        ))}
                    </code>
                </pre>

                {/* Icon column (scroll down) */}
                <div className="absolute left-2 lg:left-11  2xl:left-56 top-0 h-full overflow-hidden">
                    <div className="scroll-down flex flex-col items-center gap-6 z-40">
                        <FaReact className="w-8 h-8 2xl:w-10 2xl:h-10 text-[#61DAFB]" />
                        <Image src="/ts.svg" alt="TypeScript" width={40} height={40} className="w-7 2xl:w-8" />
                        <Image src="/shadcn.svg" alt="ShadCN" width={40} height={40} className="w-7 2xl:w-8" />
                        <Image src="/tailwind.svg" alt="Tailwind" width={40} height={40} className="w-7 2xl:w-8" />
                    </div>
                </div>

                {/* Icon column (scroll up) */}
                <div className="absolute lg:left-40 left-15 z-40">
                    <div className="scroll-up flex flex-col items-center gap-6">
                        <Image src="/nodejs.svg" alt="Node.js" width={40} height={40} className="w-7 2xl:w-8" />
                        <Image src="/nextjs.svg" alt="Next.js" width={40} height={40} className="w-7 2xl:w-8" />
                        <Image src="/express.svg" alt="Express" width={40} height={40} className="w-7 2xl:w-8" />
                        <Image src="/postrgres.svg" alt="PostgreSQL" width={40} height={60} className="w-7 2xl:w-8" />
                    </div>
                </div>

                {/* Decorative shapes */}
                {images.map((img, i) => (
                    <Image
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className={img.className}
                    />
                ))}

                {/* Social links */}
                <div className="absolute flex h-[80%] xl:w-[16%] bottom-2 xl:bottom-5 right-18 xl:right-5 xl:flex-col xl:justify-center items-end xl:items-start pl-6 gap-5">
                    <a
                        href="https://www.linkedin.com/in/azariel-moreno-4267ba254"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 xl:text-[15px] 2xl:text-md hover:scale-105 transition-all"
                    >
                        Linkedin
                    </a>
                    <a
                        href="https://github.com/azariel-moreno"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="2xl:text-md xl:text-[15px] hover:scale-105 transition-all"
                    >
                        Github
                    </a>
                </div>
            </div>
        </section>
    );
};