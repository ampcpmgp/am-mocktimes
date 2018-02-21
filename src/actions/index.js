import state from '../state'

export const setPatterns = patterns => {
  state.mock.patterns = patterns
}

export const openHelp = () => {
  state.help.isOpen = true
}

export const closeHelp = () => {
  state.help.isOpen = false
}
