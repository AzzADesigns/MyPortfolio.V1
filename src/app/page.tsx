import Image from "next/image";
import Header from "./components/Header/presentation/Header";
import Card from "./components/ui/Card";
import { Them_Trans } from "./components/Header/themeAndTraductor/Them_Trans";




export default function Home() {
    return (
        <div className="bg-background text-textColor transition-all duration-500  min-h-screen selection font-[family-name:var(--font-geist-sans)] flex flex-col items-center ">
            <header className="w-full mt-12 flex md:flex-row-reverse flex-col max-w-lg  sm:max-w-127 md:max-w-[800px] lg:max-w-7xl xl:max-w-full justify-center gap-5 p-4">
                <Them_Trans/>
                <Card extraClass="lg:w-[43%] max-w-4xl ">
                    <Header/>
                    <div className=" w-24 lg:w-[170px]  overflow-hidden rounded-full lg:h-[170px] z-50 absolute top-47 lg:top-24 left-3 lg:left-8 border-4 transition-all duration-300 border-foreground">
                        <Image
                            src="/perfil.png"
                            alt="Imagen de perfil"
                            width={170}
                            height={170}
                            className="rounded-full w-24 lg:w-170  hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </Card>
            </header>
            <main>

            </main>
            <footer>
                
            </footer>
        </div>
    );
}
