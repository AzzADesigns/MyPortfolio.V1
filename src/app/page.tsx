import Image from "next/image";
import { Banner } from "./components/Banner";


export default function Home() {
    return (
        <div className="bg-background text-textColor min-h-screen selection font-[family-name:var(--font-geist-sans)] flex flex-col items-center ">
            <nav className="w-full h-12 bg-red-200 mb-8"></nav>
            <header className="w-full h-[500px] flex justify-center gap-20">
                <section className="w-[47%] relative h-full bg-foreground rounded-3xl border-2 border-gray-200 shadow-xs flex flex-col">
                    <Banner/>
                    <div className="w-[170px] overflow-hidden rounded-full h-[170px] absolute top-24 left-8 border-4 border-foreground">
                        <Image
                            src="/perfil.jfif"
                            alt="Imagen de perfil"
                            width={170}
                            height={170}
                            className="rounded-full hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                </section>
                <div>
                    <p>aqui ira el idioma del perfil y el theme</p>
                </div>
            </header>
            <main>

            </main>
            <footer>
                
            </footer>
        </div>
    );
}
