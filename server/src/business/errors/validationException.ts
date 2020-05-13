import { Output } from '#/business/dto/output'

export const invalidException = (property: string, msg: string) =>
  new Output({
    httpCode: 422,
    data: {
      property,
      constraints: {
        invalid: msg
      }
    }
  })
