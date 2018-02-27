import {
  Action
} from 'dob'
import state from '../state'
import {
  getActionKeys,
  getPatternInfo,
  getSwitchAction,
  getMockUrl
} from '../utils/pattern'

export const setMockUrl = (mdAction) => {
  mdAction.mockUrl = getMockUrl(mdAction.url, mdAction.coffeeTimeActions)
}

export const setCoffeeTimeAction = (mdAction, coffeeTimeActions) => {
  const { name, selectedSwitchName, switchs } = mdAction

  mdAction.coffeeTimeActions = coffeeTimeActions.concat([{
    name,
    func: mdAction.func,
    funcs: mdAction.funcs
  }])
  if (selectedSwitchName) {
    const selectedCoffeeTimeAction = getPatternInfo(
      switchs.find(switchItem => switchItem.name === selectedSwitchName)
    )
    mdAction.coffeeTimeActions.push({
      name: mdAction.selectedSwitchName,
      func: selectedCoffeeTimeAction.func,
      funcs: selectedCoffeeTimeAction.funcs
    })
  }
}

export const setSwitchNameRecursively = (mdAction, coffeeTimeActions) => {
  mdAction.mdActions.forEach(mdAction => {
    setCoffeeTimeAction(mdAction, coffeeTimeActions)
    setMockUrl(mdAction)
    setSwitchNameRecursively(mdAction, mdAction.coffeeTimeActions)
  })
}

export const setSelectedSwitchName = (mdAction, selectedSwitchName) => Action(() => {
  mdAction.selectedSwitchName = selectedSwitchName

  const {
    func,
    funcs
  } = mdAction.switchs
    .find(switchItem => switchItem.name === selectedSwitchName)

  // 現状、switchActionは、配列最後に入るため、この取得方法で良いが、今後特定方法を考えたほうが良い
  const mdActionLength = mdAction.coffeeTimeActions.length - 1
  Object.assign(mdAction.coffeeTimeActions[mdActionLength], {
    selectedSwitchName,
    func,
    funcs
  })

  mdAction.mockUrl = getMockUrl(mdAction.url, mdAction.coffeeTimeActions)

  setSwitchNameRecursively(mdAction, mdAction.coffeeTimeActions)
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
    url,
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
