import { Action } from 'dob'
import state from '../state'
import {
  isReservedKey
} from '../utils/pattern'

const setRecursivelyMockPatternInfo = (pattern, level = 1) => {
  for (const key of Object.keys(pattern)) {
    const patternData = pattern[key]
    if (typeof patternData !== 'object' || isReservedKey(key)) continue
    state.mock.patternInfo.set(patternData, {
      isOpen: false,
      level: level
    })
    setRecursivelyMockPatternInfo(patternData, level + 1)
  }
}

export const setPattern = pattern => Action(() => {
  Object.assign(state.mock.pattern, pattern)
  setRecursivelyMockPatternInfo(pattern)
})

export const openHelp = () => {
  state.help.isOpen = true
}

export const closeHelp = () => {
  state.help.isOpen = false
}
