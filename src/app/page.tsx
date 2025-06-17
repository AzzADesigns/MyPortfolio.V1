import Image from "next/image";
import Header from "./components/Header/presentation/Header";
import Card from "./components/ui/Card";
import { Them_Trans } from "./components/Header/themeAndTraductor/Them_Trans";
import { Title } from "./components/ui/Title";
import { FeaturedProject } from "./components/body/featured/FeaturedProject";
import MoreProjects from "./components/body/more-projects/MoreProjects";
import AboutMe from "./components/ui/AboutMe";

export default function Home() {

    return (
        <div className="flex flex-col items-center max-w-[1900px]   min-h-screen bg-background text-textColor overflow-x-hidden overflow-y-auto transition-all duration-500 font-[family-name:var(--font-geist-sans)] selection">
            <div className="flex flex-col items-center xl:items-start w-[500px] md:w-[85%]   xl:mr-52 xl:w-[47%]">
                <div className="fixed  w-full z-50 left-0 xl:left-[67%]   2xl:left-[1225px]  xl:w-70 xl:top-25">
                    <Them_Trans />

                </div>
                <div className="w-[45vh] md:w-full flex md:items-center 2xl:items-start flex-col mt-25 xl:top-20">
                    
                        <Card extraClass="">
                            <Header />
                            <div className="absolute z-40 w-24 lg:w-[170px] lg:h-[170px] overflow-hidden rounded-full top-47 lg:top-24 left-3 lg:left-8 border-4 border-foreground transition-all duration-300">
                                <Image
                                    src="/perfil.png"
                                    alt="Imagen de perfil"
                                    width={170}
                                    height={170}
                                    className="w-24 lg:w-170 rounded-full transition-transform duration-300 hover:scale-110"
                                />
                                <div className="glass-glow">

                                </div>
                            </div>
                        </Card>
                    

                    <main className="w-full flex flex-col gap-5 justify-center md:items-center 2xl:items-start transition-all duration-300  mt-5 ">
                        <Card extraClass="p-np">
                            <Title>Acerca de</Title>
                            <AboutMe/>
                        </Card>
                        <Card>
                            <FeaturedProject />
                        </Card>
                        <Card>
                            <MoreProjects />
                        </Card>
                    </main>

                </div>
            </div>
        </div>
    );
}