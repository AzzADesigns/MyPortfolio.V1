'use client';
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Theme } from "./Theme";
import { Translator } from "./Translator";

export const Them_Trans = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo(
            containerRef.current,
            {
                opacity: 0,
                y: -20,
                
            },
            {
                opacity: 1,
                y: 0,
                
                duration: 0.2,
                ease: "power3.out",
                delay: 0.20, 
            }
        );
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ opacity: 0 }}
            className="w-full xl:w-73 2xl:w-83 bg-foreground rounded-t-none xl:rounded-t-3xl rounded-2xl h-15 xl:h-70 p-10 px-4 md:px-5 justify-between flex transition-all duration-300 flex-row xl:flex-col items-center md:gap-5"
        >
            <Translator />
            <div className="h-2 hidden xl:flex w-[95%] rounded-full bg-background"></div>
            <Theme />
        </div>
    );
};
