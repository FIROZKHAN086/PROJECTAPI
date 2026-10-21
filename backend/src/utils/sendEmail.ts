import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    const data = await resend.emails.send({
      from: "PROJECTAPI <support@firozkhan.site>",
      to,
      subject,
      text,
      html,
    });
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};