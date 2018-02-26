import Test from 'am-coffee-time/browser/Test'
import pattern from './data/pattern.yml'
import * as Actions from '../src/actions'
import state from '../src/state'
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
      Actions.setPattern(pattern)
    },
    '１個目を開く' () {
      Actions.openActionBox(state.mock.mdAction.actions[0])
    }
  })
}
