import { Output } from '#/business/dto/output'

export const genericException = (message: string) =>
  new Output({
    httpCode: 400,
    data: {
      message
    }
  })
