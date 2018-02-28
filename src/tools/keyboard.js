import keyboardjs from 'keyboardjs'
import * as Actions from '../actions'

export default () => {
  for (let i = 1; i < 9; i++) {
    keyboardjs.bind(`${i}`, () => Actions.closeByLevel(i))
  }
  keyboardjs.bind('0', Actions.openAll)
  keyboardjs.bind('9', Actions.closeAll)
  keyboardjs.bind('?', Actions.openHelp)
  keyboardjs.bind('esc', Actions.closeHelp)
}

export const removeEvent = () => {
  keyboardjs.reset()
}
