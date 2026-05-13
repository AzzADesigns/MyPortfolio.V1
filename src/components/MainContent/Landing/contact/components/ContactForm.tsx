'use client';

import { CTAButton } from '../../shared';

export const ContactForm = () => {
    return (
        <div className="w-full lg:w-[45%] xl:w-[40%] mt-20 space-y-8 md:space-y-10 order-2 lg:order-1">
            <div className="space-y-6 md:space-y-8">
                {[
                    { placeholder: "Nombre", label: "Nombre" },
                    { placeholder: "Proyecto", label: "Proyecto" },
                    { placeholder: "Mail", label: "Email" },
                ].map((field) => (
                    <div key={field.label} className="group">
                        <input 
                            type={field.label === "Email" ? "email" : "text"}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent border-b border-[#89EA2B]/30 focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40"
                        />
                    </div>
                ))}
                <div className="group">
                    <textarea 
                        placeholder="¿Cuál es tu idea?"
                        rows={5}
                        className="w-full bg-transparent border-b border-[#89EA2B]/30 focus:border-[#89EA2B] text-white/90 text-xl md:text-2xl lg:text-3xl py-4 outline-none transition-all duration-500 placeholder:text-white/25 placeholder:font-light focus:placeholder:text-white/40 resize-none"
                    />
                </div>
            </div>

            <div className="pt-8">
                <CTAButton text="Dar el primer paso" />
            </div>
        </div>
    );
};
