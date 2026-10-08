import nodemailer from "nodemailer";


export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html :string
 ) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"PROJECTAPI" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};