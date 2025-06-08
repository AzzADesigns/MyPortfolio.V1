"use client";
import React from "react";
import Card from "../../ui/Card";
import { Theme } from "./Theme";
import { Translator } from "./Translator";

export const Them_Trans = () => {
    return (
        <div className="fixed w-full 2xl:right-100 xl:w-70 xl:top-12">
            <Card
                extraClass={
                    "w-full  h-14 rounded-t-none md:rounded-t-3xl md:h-60 px-4 md:px-0 justify-between md:justify-center flex transition-all duration-300 flex-row md:flex-col items-center md:gap-5"
                }
            >
                <Translator />
                <div className="h-2 hidden md:flex w-[95%] rounded-full bg-background"></div>
                <Theme />
            </Card>
        </div>
    );
};
