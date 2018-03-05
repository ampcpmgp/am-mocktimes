import {
  Action
} from 'dob'
import state from '../state'
import {
  getInitialPath,
  getActionKeys,
  getPatternInfo,
  getSwitchAction,
  getMockUrl
} from '../utils/pattern'

export const getParentMdAction = (mdAction) => {
  let parentAction
  handleMdActionRecursively(state.mock.mdAction, (currentMdAction) => {
    currentMdAction.mdActions.forEach(currentChildMdAction => {
      if (mdAction === currentChildMdAction) parentAction = currentMdAction
    })
  })

  return parentAction
}

export const setCurrentUrl = url => {
  state.mock.currentUrl = url
}

export const handleMdActionRecursively = (mdAction, handler) => {
  handler(mdAction)
  mdAction.mdActions.forEach(mdAction => {
    handleMdActionRecursively(mdAction, handler)
  })
}

export const openAll = () => Action(() => {
  handleMdActionRecursively(state.mock.mdAction, mdAction => {
    mdAction.isOpen = true
  })
})

export const closeAll = () => Action(() => {
  handleMdActionRecursively(state.mock.mdAction, mdAction => {
    if (mdAction.level !== 0) mdAction.isOpen = false
  })
})

export const closeByLevel = (level) => Action(() => {
  handleMdActionRecursively(state.mock.mdAction, mdAction => {
    if (mdAction.level === level) mdAction.isOpen = false
    else mdAction.isOpen = true
  })
})

export const setMockUrl = (mdAction) => {
  mdAction.mockUrl = getMockUrl(mdAction.url, mdAction.coffeeTimeActions)
}

export const addCoffeeTimeFuncs = (coffeeTimeActions, { func, funcs }) => {
  func && coffeeTimeActions.push(func)
  funcs && funcs.forEach(func => coffeeTimeActions.push(func))
}

export const setCoffeeTimeAction = (mdAction, parentCoffeeTimeActions) => {
  const { selectedSwitchName, switchs } = mdAction

  const currentCoffeeTimeActions = []
  addCoffeeTimeFuncs(currentCoffeeTimeActions, mdAction)

  if (selectedSwitchName) {
    const selectedCoffeeTimeAction = getPatternInfo(
      switchs.find(switchItem => switchItem.name === selectedSwitchName)
    )
    addCoffeeTimeFuncs(currentCoffeeTimeActions, selectedCoffeeTimeAction)
  }

  mdAction.coffeeTimeActions = parentCoffeeTimeActions
    ? parentCoffeeTimeActions.concat(currentCoffeeTimeActions)
    : currentCoffeeTimeActions
}

export const setSwitchNameRecursively = (currentMdAction, parentCoffeeTimeActions) => {
  setCoffeeTimeAction(currentMdAction, parentCoffeeTimeActions)
  setMockUrl(currentMdAction)

  currentMdAction.mdActions.forEach(childMdAction => {
    setSwitchNameRecursively(childMdAction, currentMdAction.coffeeTimeActions)
  })
}

export const setSelectedSwitchName = (mdAction, selectedSwitchName) => Action(() => {
  mdAction.selectedSwitchName = selectedSwitchName
  const parentMdAction = getParentMdAction(mdAction)

  setSwitchNameRecursively(mdAction, parentMdAction.coffeeTimeActions)
})

export const openActionBox = mdAction => {
  mdAction.isOpen = true
}

export const closeActionBox = mdAction => {
  mdAction.isOpen = false
}

export const toggleActionBox = mdAction => {
  mdAction.isOpen = !mdAction.isOpen
}

export const setRecursivelyMdAction = ({
    name,
    url,
    mdAction,
    pattern,
    selectedSwitchName,
    coffeeTimeActions = [],
    level = 0
  }) => {
  const {
    description,
    func,
    funcs
  } = getPatternInfo(pattern)

  const levelName = `level-${level}`

  Object.assign(mdAction, {
    url: url || getInitialPath(),
    description,
    func,
    funcs,
    switchs: getSwitchAction(pattern.switch),
    isOpen: level === 0,
    level,
    levelName,
    name,
    mdActions: []
  })

  // set selected switch name
  if (selectedSwitchName) {
    mdAction.selectedSwitchName = selectedSwitchName
  } else if (pattern.switch) {
    mdAction.selectedSwitchName = Object.keys(pattern.switch)[0]
  } else {
    mdAction.selectedSwitchName = null
  }

  // set coffee time mdActions
  setCoffeeTimeAction(mdAction, coffeeTimeActions)
  setMockUrl(mdAction)

  if (typeof pattern !== 'object' || Array.isArray(pattern)) return

  getActionKeys(pattern).forEach(mdActionKey => {
    const currentPattern = pattern[mdActionKey]
    mdAction.mdActions.push({})
    const currentAction = mdAction.mdActions[mdAction.mdActions.length - 1]

    setRecursivelyMdAction({
      name: mdActionKey,
      url: currentPattern.url || url,
      mdAction: currentAction,
      level: level + 1,
      coffeeTimeActions: mdAction.coffeeTimeActions,
      pattern: currentPattern
    })
  })
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
