import express from 'express'
import { ValidationError } from 'class-validator'
import { Operation } from '#/controller/operations/operation'
import { Validatable } from '#/business/modules/validatable'
import { Output } from '#/business/dto/output'

export async function operationOrchestrator<I extends Validatable, O> (
  input: I,
  operation: Operation<I, O>,
  req: express.Request,
  res: express.Response
) {
  const valid = validateInput(input, req, res)
  if (valid) {
    try {
      const result = await operation.run(input)
      res.status(result.httpCode || 200)
      res.send({
        status: 'success',
        data: result.data
      })
    } catch (err) {
      console.error(err)
      if (err instanceof Output) {
        res.status(err.httpCode || 400)
        res.send(
          Object.assign(
            {
              status: 'fail',
              data: err.data
            },
            err
          )
        )
      } else {
        res.status(500)
        res.send({
          status: 'error',
          message: 'Internal Server Error'
        })
      }
    }
  }
}

function validateInput (
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
    res.status(422)
    res.send({
      status: 'fail',
      data
    })
  }
  return false
}
