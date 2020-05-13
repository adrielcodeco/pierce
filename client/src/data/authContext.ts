import { observable } from 'mobx'

export const authContext = observable({
  authirized: !!localStorage.getItem('authAToken')
})
