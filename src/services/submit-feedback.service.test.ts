import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn(); // jest.fn() é uma função espiã que tem a finalizade de saber quando essa função foi chamada ou não
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy }, // testando somente o caso de uso que é a criação do Email mockado
  { sendMail: sendMailSpy }, // testando somente o caso de uso que é o envio do Email mockado
)

describe('Submit feedback', () => {
  test('Deveria ser possivel enviar o feedback', async() => {
    await expect(submitFeedback.execute({ // eu espero que quando passar os parametros para a função submitFeedback
      type: 'Problema',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow(); // ela resolva e que não dispare nenhum error

    expect(createFeedbackSpy).toHaveBeenCalled() // eu espero que a função tenha sido chamada.
    expect(sendMailSpy).toHaveBeenCalled() // eu espero que a função tenha sido chamada.
  })

  test('Não deveria ser possível enviar um feedback sem um type ou um comment', async() => {
    await expect(submitFeedback.execute({ // eu espero que quando passar os parametros para a função submitFeedback
      type: '',
      comment: '',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow(); // ela rejeite e que dispare um error
  })

  test('Não deveria ser possível enviar uma screenshot com o formato inválido', async() => {
    await expect(submitFeedback.execute({ // eu espero que quando passar os parametros para a função submitFeedback
      type: 'Problema',
      comment: 'example comment',
      screenshot: 'teste.png',
    })).rejects.toThrow(); // ela rejeite e que dispare um error
  })
})