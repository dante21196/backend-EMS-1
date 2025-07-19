// src/services/resendService.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!); // Load from .env

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // Must match verified domain
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error: any) {
    console.error('Resend Error:', error);
    return { success: false, error };
  }
};
