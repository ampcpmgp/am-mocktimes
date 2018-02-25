import Test from 'am-coffee-time/browser/Test'
import pattern from './data/pattern.yml'
import {
  setPattern
} from '../src/actions'
import sleep from '../src/utils/sleep'

export default () => {
  Test.start({
    ヘルプを開く: async () => {
      await sleep(1000)
      const el = document.querySelector('parts-header > .question')
      const evt = new window.MouseEvent('click')
      el.dispatchEvent(evt)
    },
    フル設定 () {
      setPattern(pattern)
    }
  })
}
