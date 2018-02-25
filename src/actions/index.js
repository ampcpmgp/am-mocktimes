import { Action } from 'dob'
import state from '../state'
import {
  isReservedKey,
  getMockUrl
} from '../utils/pattern'

export const openActionBox = action => {
  action.isOpen = true
}

export const closeActionBox = action => {
  action.isOpen = false
}

export const toggleActionBox = action => {
  action.isOpen = !action.isOpen
}

const setRecursivelyMdAction = ({
  name,
  url,
  mdAction,
  pattern,
  isSelectedSwitchName,
  coffeeTimeActions = [],
  level = 0
}) => {
  const {
    description,
    func,
    funcs
  } = pattern

  Object.assign(mdAction, {
    url,
    description,
    func,
    funcs,
    switch: pattern.switch,
    isOpen: level === 0,
    level,
    name,
    actions: []
  })

  // set selected switch name
  if (isSelectedSwitchName) {
    mdAction.isSelectedSwitchName = isSelectedSwitchName
  } else if (pattern.switch) {
    mdAction.isSelectedSwitchName = Object.keys(pattern.switch)[0]
  } else {
    mdAction.isSelectedSwitchName = null
  }

  mdAction.coffeeTimeActions = coffeeTimeActions.concat([{
    name,
    func: (pattern.switch ? pattern.switch[mdAction.isSelectedSwitchName] : mdAction).func
  }])

  mdAction.mockUrl = getMockUrl(url, mdAction.coffeeTimeActions)

  for (const key of Object.keys(pattern)) {
    const currentPattern = pattern[key]
    if (typeof currentPattern !== 'object' || isReservedKey(key)) continue
    mdAction.actions.push({})
    const currentAction = mdAction.actions[mdAction.actions.length - 1]

    setRecursivelyMdAction({
      name: key,
      url: currentPattern.url || url,
      mdAction: currentAction,
      level: level + 1,
      coffeeTimeActions: mdAction.coffeeTimeActions,
      pattern: currentPattern
    })
  }
}

export const setPattern = pattern => Action(() => {
  Object.assign(state.mock.pattern, pattern)
  setRecursivelyMdAction({
    name: '',
    url: pattern.url || '/',
    mdAction: state.mock.mdAction,
    level: 0,
    pattern
  })
})

export const openHelp = () => {
  state.help.isOpen = true
}

export const closeHelp = () => {
  state.help.isOpen = false
}
