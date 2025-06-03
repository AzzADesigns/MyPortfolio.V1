import Card from "../ui/Card";
import { Title } from "../ui/Title";
import PageContainer from "../ui/PageContainer";
import { projectTexts } from "../../data/texts";

export function FeaturedProject() {
    const inAudioData = projectTexts.inAudio;
    
    return (
        <div>
            <Card extraClass="p-np">
                <Title>Destacado</Title>
                <PageContainer 
                    title={inAudioData.title}
                    description={inAudioData.description}
                    technologies={inAudioData.technologies}
                    imageSrc={inAudioData.image}
                    imageAlt={inAudioData.title}
                />
            </Card>
        </div>
    );
}