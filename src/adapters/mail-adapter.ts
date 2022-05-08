export interface SendMailData {
    subject: string; // assunto do email
    body: string; // conteúdo do email
}

export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}