import { closeAll, openAll } from '../actions'

const keyboardEvent = (e) => {
  switch (e.key) {
    case '0':
      openAll()
      break
    case '9':
      closeAll()
      break
    default:
    // do nothings
  }
}

export default () => {
  document.addEventListener('keydown', keyboardEvent)
}

export const removeEvent = () => {
  document.removeEventListener('keydown', keyboardEvent)
}
