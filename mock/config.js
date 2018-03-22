import mock from '../lib/mock'
import pattern from './sample-app/pattern.yml'
import * as Actions from '../src/actions'
import state from '../src/state'
import sleep from '../src/utils/sleep'
import { removeEvent } from '../src/tools/keyboard'

removeEvent()

const mockAction = {
  selectMars () {
    const mdAction = state.mock.mdAction.mdActions[0].mdActions[0]
    Actions.setSelectedSwitchName(mdAction, mdAction.switchs[1].name)
  },
  async openHelp () {
    await sleep(1000)
    console.log('openHelp')
    const el = document.querySelector('parts-header > .question')
    const evt = new window.MouseEvent('click')
    el.dispatchEvent(evt)
  },
  log () {
    console.log('log')
  },
  async sleepLog () {
    await sleep(1000)
    console.log('sleep log')
  },
  setFullSettings () {
    Actions.setPattern(pattern)
  },
  openFirst2Level () {
    Actions.openActionBox(state.mock.mdAction.mdActions[0])
    Actions.openActionBox(state.mock.mdAction.mdActions[0].mdActions[0])
  },
  openFirstLink3level () {
    const mockUrl = state.mock.mdAction.mdActions[0].mdActions[0].mdActions[0].mockUrl
    Actions.setCurrentUrl(mockUrl)
  },
  openFirst () {
    Actions.openActionBox(state.mock.mdAction.mdActions[0])
  }
}

mock(mockAction)
