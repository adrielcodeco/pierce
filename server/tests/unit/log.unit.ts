import '#/framework/ioc'
import { inspect } from 'util'
import { container } from '#/business/ioc/container'
import { ILogger, LogToken } from '#/business/modules/logger'

describe('log', () => {
  let _log: any
  let _stdout: any

  beforeAll(() => {
    _stdout = (console as any)._stdout
    _log = console.log;
    (console as any)._stdout = undefined
    console.log = jest.fn()
  })

  afterAll(() => {
    (console as any)._stdout = _stdout
    console.log = _log
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('text log', async () => {
    const logger = container.get<ILogger>(LogToken)
    const text = 'text log'
    logger.log(text)
    expect(console.log).toBeCalledWith(`info: ${text}`)
  })

  test('object log', async () => {
    const logger = container.get<ILogger>(LogToken)
    const obj = {
      msg: 'text log'
    }
    logger.info(obj)
    expect(console.log).toBeCalledWith(`info: ${inspect(obj, false, 5)}`)
  })

  test('error log', async () => {
    const logger = container.get<ILogger>(LogToken)
    const error = new Error('text log')
    logger.error(error)
    expect(console.log).toBeCalledWith(`error: ${inspect(error, false, 5)}`)
  })
})
