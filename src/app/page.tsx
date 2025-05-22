import Image from "next/image";
import { Banner } from "./components/Banner";


export default function Home() {
    return (
        <div className="bg-background text-textColor min-h-screen  font-[family-name:var(--font-geist-sans)] flex flex-col items-center ">
            <nav className="w-full h-12 bg-red-200 mb-8"></nav>
            <header className="w-full h-[500px] flex justify-center gap-20">
                <section className="w-[47%] h-full bg-foreground rounded-3xl border-2 border-gray-200 shadow-xs flex flex-col">
                    <Banner/>
                    <Image
                        src="/perfil.jfif"
                        alt="Imagen de perfil"
                        width={200}
                        height={200}
                        className="rounded-full"
                    />
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
