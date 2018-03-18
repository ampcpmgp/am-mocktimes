import 'babel-polyfill'
import '../mock/config.js'
import '../src/app.js'

if (module.hot) {
  module.hot.dispose(() => {
    location.reload()
  })
}
