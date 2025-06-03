import Image from "next/image";
import Header from "./components/Header/presentation/Header";
import Card from "./components/ui/Card";
import { Them_Trans } from "./components/Header/themeAndTraductor/Them_Trans";
import { Title } from "./components/ui/Title";
import { FeaturedProject } from "./components/body/FeaturedProject";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-background text-textColor overflow-x-hidden overflow-y-auto transition-all duration-500 font-[family-name:var(--font-geist-sans)] selection">
            <div className="w-full lg:mr-70 max-w-lg sm:max-w-127 md:max-w-[800px] lg:max-w-7xl xl:max-w-full px-4">
                <header className="mt-12 flex md:flex-row-reverse flex-col justify-center gap-5">
                    <div className="order-2 flex flex-col gap-5 md:order-1 ">
                        <Them_Trans />

                        <Card extraClass="lg:absolute md:top-65 lg:top-77 transition-all duration-300 p-5 flex flex-wrap md:w-50 lg:w-72 text-md flex justify-center">
                            <Title>Acerca de</Title>
                            <p className="mt-5">
                                Con{" "}
                                <span className="text-buttonColor font-semibold">
                                    tres años de formación
                                </span>
                                , que incluyen{" "}
                                <span className="text-buttonColor font-semibold">
                                    un año de experiencia práctica
                                </span>
                                , me he especializado en
                                <span className="text-buttonColor font-semibold">
                                    {" "}
                                    UX/UI utilizando Atomic Design
                                </span>
                                . He participado en{" "}
                                <span className="text-buttonColor font-semibold">
                                    simulaciones laborales
                                </span>
                                , colaborando en{" "}
                                <span className="text-buttonColor font-semibold">
                                    equipos de hasta seis personas
                                </span>
                                . Además, he desarrollado{" "}
                                <span className="text-buttonColor font-semibold">
                                    proyectos por encargo
                                </span>
                                . Sumado a mis conocimientos en{" "}
                                <span className="text-buttonColor font-semibold">back-end</span>,
                                estoy preparado para integrarme a un
                                <span className="text-buttonColor font-semibold">
                                    {" "}
                                    equipo profesional
                                </span>
                                .
                            </p>
                        </Card>
                    </div>

                    <Card extraClass="lg:w-[43%] md:max-h-[760px] xl:max-h-[655px] max-w-4xl mt-5 md:mt-0 order-1 md:order-2">
                        <Header />
                        <div className="absolute z-40 w-24 lg:w-[170px] lg:h-[170px] overflow-hidden rounded-full top-47 lg:top-24 left-3 lg:left-8 border-4 border-foreground transition-all duration-300">
                            <Image
                                src="/perfil.png"
                                alt="Imagen de perfil"
                                width={170}
                                height={170}
                                className="w-24 lg:w-170 rounded-full transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    </Card>
                </header>

                <main className="flex flex-col w-[43%] ml-132 mt-5 gap-5">
                    <FeaturedProject />
                    <Card extraClass="p-np"></Card>
                </main>
                <footer></footer>
            </div>
        </div>
    );
}
