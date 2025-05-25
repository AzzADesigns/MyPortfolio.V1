import React from 'react'

export const Information = () => {
    return (
        <section className=' p-np mt-12 flex'>
            <div className='w-[75%]'>
                <h1 className='text-2xl xl:text-2xl font-semibold'>Azariel Moreno</h1>
                <h2 className='text-xl xl:text-xl font-medium'>Full-Stack Developer</h2>
                <div className='font-light text-sm xl:text-lg mt-3'>
                    <p>React | SQL | Figma | Diseño UX/UI | Research | Tailwind |</p>
                    <p> GitHub | APIs | Axios | Shadcn | Motion | TypeScript |</p>
                    <p>Express | Nextjs | Nodejs |</p>
                </div>
                <div className='flex gap-5 mt-2'>
                    <p>Argentina</p>
                    <p className='text-buttonColor font-semibold'>+54 9 2236979758</p>
                </div>
                <div>
                    <p className='font-bold text-buttonColor mt-2'>10 Paginas realizadas</p>
                </div>
                <button className='border-2 p-1 px-3 rounded-full font-bold bg-buttonColor text-foreground tracking-wider mt-2'>
                    Contactame
                </button>
                <button className='border-2 p-1 px-3 rounded-full font-bold bg-buttonColor text-foreground tracking-wider mt-2 ml-3'>
                    Descargar CV
                </button>
                <button className='border-2 p-1 px-3 rounded-full font-bold bg-buttonColor text-foreground tracking-wider mt-2 ml-3'>
                    Más sobre mi
                </button>
            </div>
            <div className="text-sm xl:text-base text-gray-800 font-light">
                <h2 className="text-base font-semibold text-buttonColor mb-1 ">Experiencia</h2>
                <ul className="list-disc list-inside space-y-1">
                    <li>Independiente</li>
                    <li>No Country</li>
                    <li>Proyectos</li>
                </ul>
            </div>
        </section>
    )
}
