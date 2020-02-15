import keyboardjs from 'keyboardjs'
import { isOpen } from '../states/help'
import { closeByDepth, openAll, closeAll } from '../states/mock'

export default () => {
  for (let i = 1; i < 9; i++) {
    keyboardjs.bind(`${i}`, () => closeByDepth(i))
  }
  keyboardjs.bind('0', openAll)
  keyboardjs.bind('9', closeAll)
  keyboardjs.bind('?', () => isOpen.set(true))
  keyboardjs.bind('esc', () => isOpen.set(false))
}

export const removeEvent = () => {
  keyboardjs.reset()
}
