'use client';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export function useLazyMoreProjects() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (inView) setShouldRender(true);
    }, [inView]);

    return { ref, shouldRender };
}
