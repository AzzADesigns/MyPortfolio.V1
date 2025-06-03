import Image from "next/image";
import TitelPage from "./TitlePage";
import TechStack from "./TechStack";
import { ReactNode } from "react";

interface PageContainerProps {
    title: string;
    description: string;
    technologies: { name: string; icon?: ReactNode }[];
    imageSrc: string;
    imageAlt: string;
}

export default function PageContainer({ 
    title, 
    description, 
    technologies, 
    imageSrc, 
    imageAlt 
}: PageContainerProps) {
    return (
        <section className="flex flex-col md:flex-row gap-5">
            <figure className="md:w-1/2">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={500}
                    height={300}
                    className="w-full object-cover rounded-md"
                />
            </figure>
            <article className="md:w-1/2">
                <header className="flex flex-col gap-2">
                    <TitelPage title={title} />
                    <TechStack technologies={technologies} />
                </header>
                <div className="h-30 mt-2 pr-2 overflow-y-auto custom-scrollbar">
                    <p>
                        <span className="text-buttonColor font-semibold">{title}</span> {description}
                    </p>
                </div>
            </article>
        </section>
    );
}