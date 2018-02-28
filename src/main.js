import 'babel-polyfill'
import riot from 'riot'
import 'normalize.css'
import './main.css'
import './app/root'
import setKeyboardEvent from './tools/keyboard'
import { setPattern } from './actions'

export const generateList = pattern => {
  pattern && setPattern(pattern)
  setKeyboardEvent()
  riot.mount('app-root')
}
