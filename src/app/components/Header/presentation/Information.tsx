import React from 'react'
import Button from '../../ui/Button'
import { Title } from '../../ui/Title'

export const Information = () => {
    return (
        <section className="grid grid-rows-[auto_auto]  gap-5 mt-12 p-np">

            <div className="grid xl:grid-cols-4">

                <div className="col-span-3 rounded-xl">
                    <Title>Azariel Moreno</Title>
                    <h2 className="text-xl xl:text-xl font-medium">Full-Stack Developer</h2>
                    <div className="font-light text-sm xl:text-lg mt-5">
                        <p>React | SQL | Figma | Diseño UX/UI | Research | Tailwind |</p>
                        <p>GitHub | APIs | Axios | Shadcn | Motion | TypeScript |</p>
                        <p>Express | Nextjs | Nodejs |</p>
                    </div>
                    <div className="flex gap-5 items-center text-sm lg:text-lg mt-5">
                        <p>Argentina</p>
                        <p className="text-buttonColor  font-semibold">+54 9 2236979758</p>
                    </div>
                    <p className="font-bold text-buttonColor text-sm lg:text-lg mt-3">10 Páginas realizadas</p>
                </div>

                <div className="rounded-xl text-sm xl:ml-5  text-gray-800 mt-3 md:mt-0">
                    <h2 className="text-sm md:text-lg font-bold text-buttonColor mb-1">Experiencia</h2>
                    <ul className="list-inside text-textColor flex flex-row md:flex-col font-bold gap-x-3 flex-wrap text-sm 2xl:text-lg">
                        <li>Independiente</li>
                        <li className=''>No Country</li>
                        <li className=''>Proyectos</li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-row w-full  w-narrow-range   sm:w-90  lg:w-full ">
                <Button>
                    Mas sobre mí
                </Button>
                <Button>
                    Descargar CV
                </Button>
                <Button extraClass='col-span-2  xl:col-span-1'>
                    Conáctame
                </Button>
            </div>
        </section>
    )
}
//lg:col-span-1 lg:w-auto