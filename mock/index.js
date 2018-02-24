import 'babel-polyfill'
import './config'
import { generateList } from '../src/main'

if (module.hot) {
  module.hot.accept(() => {
    // window.location.reload()
  })
}

generateList()
