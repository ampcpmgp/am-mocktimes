import 'modern-css-reset/dist/reset.min.css'
import setKeyboardEvent from './utils/keyboard'
// import { setPattern } from './actions'
import App from './components/App'

export function generateList(pattern) {
  if (!pattern) return

  // setPattern(pattern)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
