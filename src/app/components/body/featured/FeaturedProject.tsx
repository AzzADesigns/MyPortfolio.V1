import Card from "../../ui/Card";
import { Title } from "../../ui/Title";
import PageContainer from "./PageContainer";
import { projectTexts } from "../../../data/texts";

export function FeaturedProject() {
    const inAudioData = projectTexts.inAudio;
    
    return (
        <div>
            <Card extraClass="p-np h-105">
                <div>
                    <Title extraClass="mb-5">Destacado</Title>
                    
                </div>
                <PageContainer 
                    title={inAudioData.title}
                    description={inAudioData.description}
                    technologies={inAudioData.technologies}
                    imageSrc={inAudioData.image}
                    imageAlt={inAudioData.title}
                    deployUrl={inAudioData.deployUrl}
                    extraclass="flex-row "
                    widthIfo="w-100"
                    widthImage="xl:h-77 "
                    heigthImage='h-80'
                />
            </Card>
        </div>
    );
}