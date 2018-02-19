import 'babel-polyfill'
import './config'
import '../src/main'

if (module.hot) {
  module.hot.accept(() => {
    window.location.reload()
  })
}
