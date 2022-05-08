import express from 'express';
import { PrismaFeedbacksRespository } from './repositories/prisma/prisma-feedbacks-repositorys';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.use(express.json()); // o famoso myddleware transformando objetos em formato javascript(json)
// config p/ envio do email

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRespository()
  const nodemailerMailAdapter = new NodeMailerAdapter()

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
    )

    await submitFeedbackService.execute({
      type,
      comment,
      screenshot,
    })

  return res.status(201).send()
})