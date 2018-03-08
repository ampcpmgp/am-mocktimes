import 'babel-polyfill'
import riot from 'riot'
import 'normalize.css'
import './main.css'
import './app/root'
import setKeyboardEvent from './tools/keyboard'
import { setPattern } from './actions'

export const generateList = pattern => {
  if (window.app) return
  if (pattern) setPattern(pattern)
  setKeyboardEvent()
  window.app = riot.mount('app-root')
}
