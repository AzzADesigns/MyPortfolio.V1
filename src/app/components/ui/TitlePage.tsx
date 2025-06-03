interface TitleCardProps {
    extraClass?: string;
    title: string;
}

export default function TitelPage({ title, extraClass }: TitleCardProps) {
    return (
        <section className={`lg:text-lg font-semibold mb-2 ${extraClass}`}>
            <h2>{title}</h2>
        </section>
    );
}
