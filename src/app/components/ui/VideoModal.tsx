import { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";

interface VideoModalProps {
    videoUrl: string | null;
    onClose: () => void;
    inline?: boolean;
    className?: string;
}

export const VideoModal = ({ videoUrl, onClose, inline = false, className = "" }: VideoModalProps) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    if (!videoUrl) return null;

    if (inline) {
        return (
            <div className={`absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center rounded-2xl ${className}`}>
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover rounded-2xl"
                />

            </div>
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] bg-black bg-opacity-90 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="max-w-full max-h-full"
                />
                <button
                    onClick={onClose}
                    className="absolute flex justify-center items-center w-25 h-15 text-md font-bold hover:scale-105 hover:shadow-2xl hover:shadow-background rounded-full top-[50%] left-5 text-buttonColor backdrop-blur-md bg-background/50 bg-opacity-50 p-1 hover:bg-opacity-75 cursor-pointer"
                >
                    <MdArrowBack />
                    Back
                </button>
            </div>
        </div>
    );
};
