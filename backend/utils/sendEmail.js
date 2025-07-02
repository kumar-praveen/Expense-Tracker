import nodemailer from "nodemailer"

export async function sendEmail(message, subject, userEmailAdd) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: 587,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
        from: process.env.SMTP_MAIL,
        to: userEmailAdd,
        subject: subject,
        html: message,
      });
}
