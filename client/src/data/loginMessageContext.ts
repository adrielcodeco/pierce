import { observable } from 'mobx'

export const loginMessageContext = observable({
  messages: [] as string[]
})
