import React from "react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";
import { HiOutlineTranslate } from "react-icons/hi";

export const Translator = () => {
    return (
        <div className="flex flex-col md:items-center justify-center md:w-full">
            <Title extraClass="hidden md:flex mb-2">Idiomas</Title>
            <div className="hidden md:flex w-full justify-center gap-3">
                <Button>English</Button>
                <Button>Español</Button>
            </div>
            <Button extraClass="   p-0.5 px-2 flex md:hidden ">
                <HiOutlineTranslate className="text-background text-xl" />
                <p className="text-background ml-2">traducir</p>
            </Button>
        </div>
    );
};
