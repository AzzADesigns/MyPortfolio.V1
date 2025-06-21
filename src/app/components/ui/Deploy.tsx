import Link from "next/link";

interface DeployProps {
    url: string;
    type: string;
    extraClass?: string;
}

export default function Deploy({ url, type, extraClass = "" }: DeployProps) {
    const label = type === "deploy" ? "Deploy" : "Repo";

    return (
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-buttonColor hover:underline ${extraClass}`}
        >
            <span>🔗</span>
            <span>{label}</span>
        </Link>
    );
}

