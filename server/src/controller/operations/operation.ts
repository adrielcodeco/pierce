import { Output } from '#/business/dto/output'

export abstract class Operation<I, O> {
  abstract run (input: I): Promise<Output<O>>
}
