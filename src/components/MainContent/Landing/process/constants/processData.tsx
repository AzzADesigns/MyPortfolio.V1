import React from 'react';
import { FiMap, FiEdit2, FiSettings } from 'react-icons/fi';
import { LiaIndustrySolid } from 'react-icons/lia';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';

export interface ProcessPoint {
    label: string;
    text: string;
}

export interface ProcessStep {
    id: string;
    title: string;
    question: string;
    description: string;
    points: ProcessPoint[];
    icon: React.ReactNode;
}

export const PROCESS_STEPS: ProcessStep[] = [
    {
        id: '01',
        title: 'Planeacion',
        question: '¿cual es el objetivo de la web?',
        description: 'Convertimos una idea abstracta en una hoja de ruta técnica y comercial respondiendo preguntas estrategicas para entender no solo la estructura, sino sus funcionalidades y características.',
        points: [
            {
                label: 'Claridad',
                text: 'Sin decisiones improvisadas, cada paso, cada interaccion, animacion y proceso estaran formando un conjunto de decisiones con el unico objetivo de alcanzar tu meta.'
            },
            {
                label: 'Solidez',
                text: 'Reducción de errores desde el día uno, se analizara la idea a detalle prestando atencion en cada posibilidada, buscando la mejor ruta posible.'
            },
            {
                label: 'Propósito',
                text: 'Construir exactamente lo que el mercado objetivo de tu prducto necesita.'
            }
        ],
        icon: <FiMap className="w-5 h-5" />
    },
    {
        id: '02',
        title: 'Diseño',
        question: '¿Cómo se verá tu marca?',
        description: 'Traducimos la estructura en una interfaz visual atractiva y funcional que conecte con tus usuarios.',
        points: [
            { label: 'Identidad', text: 'Colores y tipografías alineadas a la estrategia.' },
            { label: 'UX/UI', text: 'Navegación intuitiva centrada en la conversión.' },
            { label: 'Prototipado', text: 'Bocetos funcionales antes del desarrollo final.' }
        ],
        icon: <FiEdit2 className="w-5 h-5" />
    },
    {
        id: '03',
        title: 'Construccion',
        question: '¿Qué tecnologías usaremos?',
        description: 'Construimos la base sólida de tu aplicación con las mejores prácticas de desarrollo.',
        points: [
            { label: 'Performance', text: 'Carga rápida y optimizada desde el primer día.' },
            { label: 'Escalabilidad', text: 'Código limpio y estructurado para crecer contigo.' },
            { label: 'Integración', text: 'Conexión eficiente con bases de datos y APIs externas.' }
        ],
        icon: <FiSettings className="w-5 h-5" />
    },
    {
        id: '04',
        title: 'Validacion',
        question: '¿Todo funciona perfecto?',
        description: 'Sometemos el producto a pruebas rigurosas para asegurar una experiencia sin errores.',
        points: [
            { label: 'Testing', text: 'Pruebas intensivas en múltiples dispositivos y navegadores.' },
            { label: 'Feedback', text: 'Ajustes y refinamiento basados en uso real.' },
            { label: 'Seguridad', text: 'Revisión exhaustiva para proteger la integridad de los datos.' }
        ],
        icon: <IoShieldCheckmarkOutline className="w-6 h-6" />
    },
    {
        id: '05',
        title: 'Produccion',
        question: '¿Listos para el despegue?',
        description: 'Ponemos tu proyecto en línea y te preparamos para el éxito continuo.',
        points: [
            { label: 'Deploy', text: 'Configuración óptima de servidores y dominios.' },
            { label: 'Mantenimiento', text: 'Planes de actualización y soporte para garantizar estabilidad.' },
            { label: 'Monitoreo', text: 'Herramientas para medir rendimiento y analíticas.' }
        ],
        icon: <LiaIndustrySolid className="w-6 h-6" />
    }
];
