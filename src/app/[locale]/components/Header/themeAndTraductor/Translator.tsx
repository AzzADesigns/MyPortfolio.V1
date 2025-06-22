import React from "react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";
import { HiOutlineTranslate } from "react-icons/hi";
import { textsPage } from "../../data/texts"

export const Translator = () => {
    return (
        <div className="flex flex-col  xl:items-center  xl:justify-center xl:w-full">
            <Title extraClass="hidden xl:flex mb-2">{textsPage.textIdiom}</Title>
            <div className="hidden xl:flex w-full justify-center gap-3">
                <Button>English</Button>
                <Button>Español</Button>
            </div>
            <Button extraClass="   p-0.5 px-2 flex xl:hidden ">
                <HiOutlineTranslate className="text-background text-xl" />
                <p className="text-background ml-2">traducir</p>
            </Button>
        </div>
    );
};
