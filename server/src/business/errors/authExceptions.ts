import { Output } from '#/business/dto/output'

export const UNAUTHORIZED = new Output({
  httpCode: 401,
  message: 'Unauthorized'
})

export const FORBIDDEN = new Output({
  httpCode: 403,
  message: 'Forbidden'
})
