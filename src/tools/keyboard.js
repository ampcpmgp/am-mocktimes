import { closeAll, openAll } from '../actions'

export default () => {
  document.addEventListener('keydown', (e) => {
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
  })
}
