// usando o D do SOLID (Dependency inversion principle) - para não depender da ferramenta do prisma
import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositorie";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type || !comment) {
      throw new Error('Type and comment is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) { // se a screenshot não começar(startsWith) com (tal info) atire um novo error
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`
      ].join('\n')
    })
  }
}