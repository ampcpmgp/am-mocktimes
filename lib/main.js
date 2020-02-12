import 'modern-css-reset/dist/reset.min.css'
import setKeyboardEvent from './utils/keyboard'
import { pattern } from './states/mock'
import App from './components/App'

export function generateList(ymlData) {
  if (!pattern) return

  pattern.update(ymlData)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
