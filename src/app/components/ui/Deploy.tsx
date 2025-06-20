import Link from "next/link";

interface DeployProps {
    url: string;
    extraClass?: string;
}

export default function Deploy({ url, extraClass = "" }: DeployProps) {
    return (
        <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-buttonColor hover:underline ${extraClass}`}
        >
            <span>🔗</span>
            <span>Deploy</span>
        </Link>
    );
}





