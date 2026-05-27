import React from 'react';
import { FiMap, FiEdit2, FiSettings } from 'react-icons/fi';

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
        icon: <svg viewBox="0 0 512 512" className="w-6 h-6"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M336 176 225.2 304 176 255.8"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z"/></svg>
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
        icon: <svg viewBox="0 0 32 32" className="w-6 h-6" fill="currentColor"><path d="M 20 5 L 20 10.46875 L 17 12.25 L 17 9.21875 L 15.5 10.15625 L 12 12.25 L 12 9.21875 L 10.5 10.15625 L 5.5 13.15625 L 5 13.4375 L 5 27 L 27 27 L 27 5 Z M 22 7 L 25 7 L 25 25 L 7 25 L 7 14.53125 L 10 12.75 L 10 15.78125 L 11.5 14.84375 L 15 12.75 L 15 15.78125 L 16.5 14.84375 L 21.5 11.84375 L 22 11.5625 Z M 9 17 L 9 19 L 11 19 L 11 17 Z M 13 17 L 13 19 L 15 19 L 15 17 Z M 17 17 L 17 19 L 19 19 L 19 17 Z M 21 17 L 21 19 L 23 19 L 23 17 Z M 9 21 L 9 23 L 11 23 L 11 21 Z M 13 21 L 13 23 L 15 23 L 15 21 Z M 17 21 L 17 23 L 19 23 L 19 21 Z M 21 21 L 21 23 L 23 23 L 23 21 Z"/></svg>
    }
];
