import { observable } from 'mobx'

export const layoutContext = observable({
  clean: false,
  cleanMode (clean: boolean) {
    if (clean !== layoutContext.clean) {
      layoutContext.clean = clean
    }
  }
})
