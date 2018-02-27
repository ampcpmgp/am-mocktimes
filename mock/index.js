import 'babel-polyfill'
import config from './config'
import { generateList } from '../src/main'

if (module.hot) {
  module.hot.accept(() => {
    // window.location.reload()
  })
}

console.clear()
config()
generateList()
