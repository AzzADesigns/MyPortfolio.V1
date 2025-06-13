"use client";
import React from "react";
import Card from "../../ui/Card";
import { Theme } from "./Theme";
import { Translator } from "./Translator";

export const Them_Trans = () => {
    return (
        <div className="fixed  w-full z-50 left-0 xl:left-[63%] 2xl:left-[64.3%] xl:w-70 xl:top-11">
            <div
                className="xl:w-83   bg-foreground rounded-t-none md:rounded-2xl h-15 xl:h-60 px-4 md:px-0 justify-between md:justify-center flex transition-all duration-300 flex-row xl:flex-col items-center md:gap-5"    
            >
                <Translator />
                <div className="h-2 hidden xl:flex w-[95%] rounded-full bg-background"></div>
                <Theme />
            </div>
        </div>
    );
};
