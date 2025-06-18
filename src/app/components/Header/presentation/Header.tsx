"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Banner } from "./Banner";
import { Information } from "./Information";
import Card from "../../ui/Card";

export default function Header() {
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            containerRef.current,
            {
                opacity: 0,
                scale: 0.8,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "back.out(1.7)",
            }
        );
    }, []);

    return (
        <div ref={containerRef}>
            <Card extraClass=" ">
                <Banner />
                <Information />
            </Card>
        </div>
    );
}
