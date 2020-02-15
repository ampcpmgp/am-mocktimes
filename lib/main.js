import 'modern-css-reset'
import setKeyboardEvent from './utils/keyboard'
import { init } from './states/mock'
import App from './components/App'

export function generateList(patterns) {
  init(patterns)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
