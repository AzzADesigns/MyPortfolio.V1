import { useState } from 'react';

export const useVideoModal = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const openVideo = (videoUrl: string) => setSelectedVideo(videoUrl);
    const closeVideo = () => setSelectedVideo(null);

    return {
        selectedVideo,
        openVideo,
        closeVideo
    };
};