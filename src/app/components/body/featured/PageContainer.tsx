import Image from "next/image";
import TitelPage from "../../ui/TitlePage";
import TechStack from "../../ui/TechStack";
import Deploy from "../../ui/Deploy";
import { ReactNode } from "react";

interface PageContainerProps {
    title: string;
    description: string;
    technologies: { name: string; icon?: ReactNode }[];
    imageSrc: string;
    imageAlt: string;
    deployUrl?: string;
    extraclass?: string;
    widthIfo?:string;
    widthImage?:string;
    heigthImage?:string;
}

export default function PageContainer({ 
    title, 
    description, 
    technologies, 
    imageSrc, 
    imageAlt,
    deployUrl,
    extraclass,
    widthIfo,
    widthImage,
    heigthImage
}: PageContainerProps) {
    return (
        <section className={`flex  rounded-xl flex-col md:${extraclass}gap-5`}>
            <figure className="">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={500}
                    height={300}
                    className={` ${heigthImage} ${widthImage} object-cover rounded-md`}
                />
            </figure>
            <article className={`${widthIfo} `}>
                <header className="flex flex-col gap-2">
                    <div className="flex w-50 items-center justify-between">
                        <TitelPage title={title} />
                        <Deploy url={deployUrl} />
                    </div>
                    <TechStack technologies={technologies} />
                </header>
                <div className="md:h-20 2xl:h-50 mt-2 pr-2 overflow-y-auto custom-scrollbar">
                    <p>
                        <span className="text-buttonColor font-semibold">{title}</span> {description}
                    </p>
                </div>
            </article>
        </section>
    );
}