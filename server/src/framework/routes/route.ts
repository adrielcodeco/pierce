import express from 'express'
import { ValidationError } from 'class-validator'
import { Validatable } from '#/business/modules/validatable'

export abstract class Route {
  abstract run (req: express.Request, res: express.Response): Promise<void>

  validateInput (
    input: Validatable,
    req: express.Request,
    res: express.Response
  ) {
    try {
      input.validate()
      return true
    } catch (err) {
      let data = null
      if (
        err instanceof Array &&
        err.length &&
        err[0] instanceof ValidationError
      ) {
        data = err.map((i) => ({
          property: i.property,
          constraints: i.constraints
        }))
      }
      res.status(400)
      res.send({
        status: 'fail',
        data
      })
    }
    return false
  }
}
