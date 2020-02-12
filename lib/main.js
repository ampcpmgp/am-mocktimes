import 'modern-css-reset/dist/reset.min.css'
import setKeyboardEvent from './utils/keyboard'
import { patterns } from './states/mock'
import App from './components/App'

export function generateList(ymlData) {
  if (!patterns) return

  patterns.set(ymlData)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
