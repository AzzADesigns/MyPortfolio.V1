"use client";
import React from "react";
import Card from "../../ui/Card";
import { Theme } from "./Theme";
import { Translator } from "./Translator";

export const Them_Trans = () => {
    return (
        
            <div
                className=" w-full xl:w-73 2xl:w-83   bg-foreground  rounded-t-none xl:rounded-t-3xl rounded-2xl h-15 xl:h-70 p-10 px-4 md:px-5 justify-between flex transition-all duration-300 flex-row xl:flex-col items-center md:gap-5"    
            >
                <Translator />
                <div className="h-2 hidden xl:flex w-[95%] rounded-full bg-background"></div>
                <Theme />
            </div>
        
    );
};
