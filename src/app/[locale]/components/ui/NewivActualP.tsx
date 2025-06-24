import React, { useState, useEffect, useRef } from "react";
import { ActualPojects } from "../body/actualProjects/ActualPojects";


export default function NewDivActualP() {
    const [visible, setVisible] = useState(false);
    const actualProjectsRef = useRef(null);

    useEffect(() => {

        const timer = setTimeout(() => {
        setVisible(true);
        }, 100); 

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            ref={actualProjectsRef}
            className={`transition-opacity w-full duration-2000 ${
                visible ? "xl:opacity-100" : "opacity-0"
            }`}
        >
            <ActualPojects />
        </div>
    );
}
