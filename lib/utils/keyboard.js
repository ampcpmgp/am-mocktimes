import keyboardjs from 'keyboardjs'
import { isOpen } from '../states/help'

export default () => {
  for (let i = 1; i < 9; i++) {
    // keyboardjs.bind(`${i}`, () => Actions.closeByLevel(i))
  }
  // keyboardjs.bind('0', Actions.openAll)
  // keyboardjs.bind('9', Actions.closeAll)
  keyboardjs.bind('?', () => isOpen.set(true))
  keyboardjs.bind('esc', () => isOpen.set(false))
}

export const removeEvent = () => {
  keyboardjs.reset()
}
