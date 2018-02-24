import 'babel-polyfill'
import riot from 'riot'
import 'normalize.css'
import './main.css'
import './app/root'
import { setPattern } from './actions'

export const generateList = pattern => {
  pattern && setPattern(pattern)
  riot.mount('app-root')
}
