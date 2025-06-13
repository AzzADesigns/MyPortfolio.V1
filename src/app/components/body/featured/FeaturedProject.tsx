import Card from "../../ui/Card";
import { Title } from "../../ui/Title";
import PageContainer from "./PageContainer";
import { projectTexts } from "../../../data/texts";
import Image from "next/image";
import TechStack from "../../ui/TechStack";
import Deploy from "../../ui/Deploy";

export function FeaturedProject() {
    const featureProject = Object.values(projectTexts)[0];
    
    return (
        <Card extraClass="w-full p-6 flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 relative h-[300px]">
                <Image 
                    src={featureProject.image}
                    alt={featureProject.title}
                    fill
                    className="object-cover rounded-2xl"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                    <Title extraClass="text-2xl font-bold mb-3">{featureProject.title}</Title>
                    <p className="text-gray-300 mb-4">{featureProject.description}</p>
                </div>
                <div>
                    <TechStack technologies={featureProject.technologies} extraClass="mb-4" />
                    <Deploy url={featureProject.deployUrl} extraClass="text-base" />
                </div>
            </div>
        </Card>
    );
}
