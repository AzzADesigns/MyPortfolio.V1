import React from "react";
import Button from "../../ui/Button";
import { Title } from "../../ui/Title";

export const Information = () => {
    return (
        <section className="grid grid-rows-[auto_auto]  gap-5 mt-12 p-np">
            <div className="grid xl:grid-cols-4">
                <div className="col-span-3 md:mt-2 rounded-xl">
                    <Title>Azariel Moreno</Title>
                    <h2 className="text-xl xl:text-xl font-medium">Full-Stack Developer</h2>
                    <div className="mt-5 font-light text-md xl:text-lg w-[70%] md:w-[80%] xl:w-[86%] 2xl:w-[90%]">
                        <p>
                            React | SQL | Figma | Diseño UX/UI | Research | Tailwind | GitHub | APIs
                            | Axios | Shadcn | Motion | TypeScript | Express | Nextjs | Nodejs |
                        </p>
                    </div>
                    <div className="flex items-center gap-5 mt-5 text-md lg:text-lg">
                        <p>Argentina</p>
                        <p className="text-buttonColor  font-semibold">+54 9 2236979758</p>
                    </div>
                    <p className="font-bold text-buttonColor text-md lg:text-lg mt-3">
                        10 Páginas realizadas
                    </p>
                </div>

                <div className="col-span-3 md:col-span-1 mt-3 md:mt-0 xl:ml-5 text-md text-gray-800 rounded-xl">
                    <h2 className="text-sm md:text-lg font-bold text-buttonColor mb-1">
                        Experiencia
                    </h2>
                    <ul className="flex flex-row xl:flex-col flex-wrap gap-x-3 text-md 2xl:text-md text-textColor list-inside">
                        <li>Independiente</li>
                        <li className="">No Country</li>
                        <li className="">Proyectos</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full w-narrow-range sm:w-90 lg:w-full lg:flex lg:flex-row">
                <Button>Ver Proyectos</Button>
                <Button>Descargar CV</Button>
                <Button extraClass="col-span-2  xl:col-span-1">Contáctame</Button>
            </div>
        </section>
    );
};
//lg:col-span-1 lg:w-auto
