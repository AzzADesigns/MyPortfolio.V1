import { useState, useRef, useEffect } from 'react';
import { Observer } from 'gsap/Observer';
import { PROCESS_STEPS } from '../constants/servicesData';

export const useServicesState = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    
    const currentStep = PROCESS_STEPS[activeStep];

    const activeStepRef = useRef(activeStep);
    const isAnimatingRef = useRef(isAnimating);
    const scrollTargetStepRef = useRef(activeStep); 

    const carouselObserverRef = useRef<ReturnType<typeof Observer.create> | null>(null);
    const enterFromBottomFnRef = useRef<(() => void) | null>(null);

    const isProcessModeRef = useRef(false);

    useEffect(() => {
        activeStepRef.current = activeStep;
    }, [activeStep]);

    useEffect(() => {
        isAnimatingRef.current = isAnimating;
    }, [isAnimating]);

    return {
        activeStep, setActiveStep,
        isAnimating, setIsAnimating,
        scrollRef, processRef,
        currentStep,
        activeStepRef,
        isAnimatingRef,
        scrollTargetStepRef,
        carouselObserverRef,
        enterFromBottomFnRef,
        isProcessModeRef
    };
};
