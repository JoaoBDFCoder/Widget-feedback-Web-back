import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9ad8e2a8ac01bf",
      pass: "1a83b9f23a7917"
    }
  });

export class NodeMailerAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        
  // Envio do email
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'João Batista <joaobdf@hotmail.com>',
    subject,
    html: body,
  })
    }
}