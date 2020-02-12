import 'modern-css-reset/dist/reset.min.css'
// TODO: App.svelte に組み込んで除去
import './main.css'
import setKeyboardEvent from './tools/keyboard'
import { setPattern } from './actions'
import App from './components/App'

export function generateList(pattern) {
  if (!pattern) return

  setPattern(pattern)
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
