import mock from '../lib/mock'
import pattern from './sample-app/pattern.yml'
import * as Actions from '../lib/actions'
import state from '../lib/state'
import sleep from '../lib/utils/sleep'

const mockAction = {
  selectMars() {
    const mdAction = state.mock.mdAction.mdActions[0].mdActions[0]
    Actions.setSelectedSwitchName(mdAction, mdAction.switchs[1].name)
  },
  async openHelp() {
    Actions.setPattern({ url: pattern.url })
    await sleep(1000)
    console.log('openHelp')
    const el = document.querySelector('parts-header > .question')
    const evt = new window.MouseEvent('click')
    el.dispatchEvent(evt)
  },
  log() {
    console.log('log')
  },
  async sleepLog() {
    await sleep(1000)
    console.log('sleep log')
  },
  setFullSettings() {
    Actions.setPattern(pattern)
  },
  async openFirst2Level() {
    await sleep(0)
    Actions.openActionBox(state.mock.mdAction.mdActions[0])
    Actions.openActionBox(state.mock.mdAction.mdActions[0].mdActions[0])
  },
  async openFirstLink3level() {
    await sleep(0)
    const mockUrl =
      state.mock.mdAction.mdActions[0].mdActions[0].mdActions[0].mockUrl
    Actions.setCurrentUrl(mockUrl)
  },
  async openFirst() {
    await sleep(0)
    Actions.openActionBox(state.mock.mdAction.mdActions[0])
  },
}

mock(mockAction)
