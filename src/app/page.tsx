import Image from "next/image";
import Header from "./components/Header/presentation/Header";
import Card from "./components/ui/Card";
import { Them_Trans } from "./components/Header/themeAndTraductor/Them_Trans";




export default function Home() {
    return (
        <div className="bg-background text-textColor min-h-screen selection font-[family-name:var(--font-geist-sans)] flex flex-col items-center ">
            <nav className="w-full h-12 bg-foreground mb-3"></nav>
            <header className="w-full flex flex-col max-w-lg  sm:max-w-127 md:max-w-[800px] lg:max-w-7xl xl:max-w-full md:flex-row justify-center gap-5 p-4">
                <Card extraClass="lg:w-[43%] max-w-4xl ">
                    <Header/>
                    <div className=" w-24 lg:w-[170px] overflow-hidden rounded-full lg:h-[170px] z-50 absolute top-47 lg:top-24 left-3 lg:left-8 border-4 border-foreground">
                        <Image
                            src="/perfil.jfif"
                            alt="Imagen de perfil"
                            width={170}
                            height={170}
                            className="rounded-full w-24 lg:w-170   hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </Card>
                <Them_Trans/>
            </header>
            <main>

            </main>
            <footer>
                
            </footer>
        </div>
    );
}
