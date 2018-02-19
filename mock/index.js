import Test from 'am-coffee-time/browser/Test'
import './setup'
import '../src/main'
import sleep from '~/src/utils/sleep'

if (module.hot) {
  module.hot.accept(() => {
    window.location.reload()
  })
}
Test.start({
  ヘルプを開く: async () => {
    await sleep(1000)
    const el = document.querySelector('parts-header > .question')
    const evt = new window.MouseEvent('click')
    el.dispatchEvent(evt)
  }
})
