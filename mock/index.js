import './setup'
import '../src/main'

if (module.hot) {
  module.hot.accept(() => {
    window.location.reload()
  })
}

console.info('finished')
