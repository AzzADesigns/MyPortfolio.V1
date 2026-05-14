'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(_prevState: unknown, formData: FormData) {
  // 1. Verificación de Honeypot (Seguridad Anti-Bots)
  const honeypot = formData.get('_honeypot') as string;
  if (honeypot) {
    // Si el campo tiene algo, es un bot. Respondemos con éxito falso para no dar pistas.
    return { success: true }; 
  }

  const nombre = (formData.get('nombre') as string)?.slice(0, 100);
  const proyecto = (formData.get('proyecto') as string)?.slice(0, 150);
  const email = (formData.get('email') as string)?.slice(0, 150);
  const mensaje = (formData.get('mensaje') as string)?.slice(0, 3000);

  // 2. Validación de campos obligatorios
  if (!nombre || !proyecto || !email || !mensaje) {
    return { error: 'Por favor, completa todos los campos obligatorios.' };
  }

  // 3. Validación de formato de email (Básica)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'El formato del correo electrónico no es válido.' };
  }

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['walter.azariel.moreno@gmail.com'], // El usuario deberá cambiar esto o usar una variable de entorno
      subject: `Nuevo mensaje de contacto: ${nombre}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje desde tu Portfolio</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Proyecto:</strong> ${proyecto}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    return { success: true, data };
  } catch {
    return { error: 'Error al enviar el email' };
  }
}
