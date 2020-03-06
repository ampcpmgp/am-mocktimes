import 'modern-css-reset'
import setKeyboardEvent from './utils/keyboard'
import { init } from './states/mock'
import App from './components/App'

export async function generateList(patterns) {
  await init(patterns)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
