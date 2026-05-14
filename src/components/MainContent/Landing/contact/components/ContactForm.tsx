'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { CTAButton } from '../../shared';
import { sendEmail } from '@/app/actions/sendEmail';

export const ContactForm = () => {
    // @ts-ignore
    const [state, action, isPending] = useActionState(sendEmail, null);
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    // Estado para persistir los valores y evitar que se borren al fallar la validación
    const [formValues, setFormValues] = useState({
        nombre: '',
        proyecto: '',
        email: '',
        mensaje: ''
    });

    useEffect(() => {
        if (state?.success) {
            formRef.current?.reset();
            setFormValues({ nombre: '', proyecto: '', email: '', mensaje: '' });
            setErrors({});
        }
    }, [state]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        // Limpiar error del campo mientras el usuario escribe
        if (errors[name]) {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs[name];
                return newErrs;
            });
        }
    };

    const handleFormAction = (formData: FormData) => {
        const newErrors: Record<string, string> = {};
        
        const email = formData.get('email') as string;
        const nombre = formData.get('nombre') as string;
        const proyecto = formData.get('proyecto') as string;
        const mensaje = formData.get('mensaje') as string;

        if (!nombre) newErrors.nombre = "Por favor, indícame tu nombre";
        if (!proyecto) newErrors.proyecto = "Cuéntame un poco sobre tu proyecto";
        if (!mensaje) newErrors.mensaje = "Déjame un mensaje con tu idea";
        if (!email) {
            newErrors.email = "Necesito un correo para contactarte";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Este formato de correo no es válido";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        action(formData);
    };

    if (state?.success) {
        return (
            <div className="w-full lg:w-[45%] xl:w-[40%] mt-20 p-10 border border-[#89EA2B]/20 bg-[#89EA2B]/5 rounded-2xl animate-in fade-in zoom-in duration-700 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-[#89EA2B] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(137,234,43,0.4)]">
                    <svg className="w-8 h-8 text-[#001720]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-bold font-syne tracking-tight">¡Mensaje recibido!</h3>
                <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light">
                    Gracias por dar el primer paso. He recibido tu idea y me pondré en contacto contigo muy pronto para darle vida.
                </p>
                <div className="pt-4">
                    <span className="text-[#89EA2B] text-xs tracking-[0.3em] uppercase font-bold opacity-50">AzzaDesigns • 2026</span>
                </div>
            </div>
        );
    }

    return (
        <form 
            ref={formRef}
            action={handleFormAction}
            noValidate
            className="w-full lg:w-[45%] xl:w-[40%] mt-20 space-y-8 md:space-y-10 order-2 lg:order-1 animate-in fade-in duration-1000"
        >
            <div className="space-y-6 md:space-y-8">
                {[
                    { placeholder: "Nombre", label: "Nombre", name: "nombre" as const, max: 100 },
                    { placeholder: "Proyecto", label: "Proyecto", name: "proyecto" as const, max: 150 },
                    { placeholder: "Mail", label: "Email", name: "email" as const, max: 150 },
                ].map((field) => (
                    <div key={field.label} className="group flex flex-col contact-input-reveal">
                        <input 
                            name={field.name}
                            maxLength={field.max}
                            value={formValues[field.name]}
                            onChange={handleInputChange}
                            type={field.name === "email" ? "email" : "text"}
                            placeholder={field.placeholder}
                            className={`w-full bg-transparent border-b ${errors[field.name] ? 'border-[#07F8F2]' : 'border-[#89EA2B]/30'} focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40`}
                        />
                        {errors[field.name] && (
                            <span className="text-[#07F8F2] text-xs mt-2 font-medium tracking-widest uppercase animate-pulse">
                                {errors[field.name]}
                            </span>
                        )}
                    </div>
                ))}
                <div className="group flex flex-col contact-input-reveal">
                    <textarea 
                        name="mensaje"
                        maxLength={3000}
                        value={formValues.mensaje}
                        onChange={handleInputChange}
                        placeholder="¿Cuál es tu idea?"
                        rows={5}
                        className={`w-full bg-transparent border-b ${errors.mensaje ? 'border-[#07F8F2]' : 'border-[#89EA2B]/30'} focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40 resize-none`}
                    />
                    {errors.mensaje && (
                        <span className="text-[#07F8F2] text-xs mt-2 font-medium tracking-widest uppercase animate-pulse">
                            {errors.mensaje}
                        </span>
                    )}
                </div>

                <div style={{ position: 'absolute', opacity: 0, zIndex: -1, pointerEvents: 'none' }}>
                    <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" />
                </div>
            </div>

            {state?.error && (
                <p className="text-red-400 text-sm">{state.error}</p>
            )}

            <div className="pt-8 contact-button-reveal">
                <CTAButton 
                    type="submit"
                    disabled={isPending}
                    text={isPending ? "Enviando..." : "Dar el primer paso"} 
                />
            </div>
        </form>
    );
};
