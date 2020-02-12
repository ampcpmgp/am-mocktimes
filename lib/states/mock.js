import { writable } from 'svelte/store'

export const lastExecutedUrl = writable('')
export const url = writable('')
export const pattern = writable({})
export const mdAction = writable({})

// import {
//   getInitialPath,
//   getActionKeys,
//   getPatternInfo,
//   getSwitchAction,
//   getMockUrl,
// } from '../utils/pattern'

// const { mock } = state

// export const getParentMdAction = mdAction => {
//   let parentAction
//   handleMdActionRecursively(state.mock.mdAction, currentMdAction => {
//     currentMdAction.mdActions.forEach(currentChildMdAction => {
//       if (mdAction === currentChildMdAction) parentAction = currentMdAction
//     })
//   })

//   return parentAction
// }

// export const setCurrentUrl = url => {
//   mock.currentUrl = url
//   if (url) mock.lastExecutedUrl = url
// }

// export const handleMdActionRecursively = (mdAction, handler) => {
//   handler(mdAction)
//   mdAction.mdActions.forEach(mdAction => {
//     handleMdActionRecursively(mdAction, handler)
//   })
// }

// export const openAll = () =>
//   Action(() => {
//     handleMdActionRecursively(state.mock.mdAction, mdAction => {
//       mdAction.isOpen = true
//     })
//   })

// export const closeAll = () =>
//   Action(() => {
//     handleMdActionRecursively(state.mock.mdAction, mdAction => {
//       if (mdAction.level !== 0) mdAction.isOpen = false
//     })
//   })

// export const closeByLevel = level =>
//   Action(() => {
//     handleMdActionRecursively(state.mock.mdAction, mdAction => {
//       if (mdAction.level === level) mdAction.isOpen = false
//       else mdAction.isOpen = true
//     })
//   })

// export const setMockUrl = mdAction => {
//   mdAction.mockUrl = getMockUrl(mdAction.url, mdAction.mockTimesActions)
// }

// export const addMocktimesFuncs = (mockTimesActions, { func, funcs }) => {
//   func && mockTimesActions.push(func)
//   funcs && funcs.forEach(func => mockTimesActions.push(func))
// }

// export const setMocktimesAction = (mdAction, parentMocktimesActions) => {
//   const { selectedSwitchName, switchs } = mdAction

//   const currentMocktimesActions = []
//   addMocktimesFuncs(currentMocktimesActions, mdAction)

//   if (selectedSwitchName) {
//     const selectedMocktimesAction = getPatternInfo(
//       switchs.find(switchItem => switchItem.name === selectedSwitchName)
//     )
//     addMocktimesFuncs(currentMocktimesActions, selectedMocktimesAction)
//   }

//   mdAction.mockTimesActions = parentMocktimesActions
//     ? parentMocktimesActions.concat(currentMocktimesActions)
//     : currentMocktimesActions
// }

// export const setSwitchNameRecursively = (
//   currentMdAction,
//   parentMocktimesActions
// ) => {
//   setMocktimesAction(currentMdAction, parentMocktimesActions)
//   setMockUrl(currentMdAction)

//   currentMdAction.mdActions.forEach(childMdAction => {
//     setSwitchNameRecursively(childMdAction, currentMdAction.mockTimesActions)
//   })
// }

// export const setSelectedSwitchName = (mdAction, selectedSwitchName) =>
//   Action(() => {
//     mdAction.selectedSwitchName = selectedSwitchName
//     const parentMdAction = getParentMdAction(mdAction)

//     setSwitchNameRecursively(mdAction, parentMdAction.mockTimesActions)
//   })

// export const openActionBox = mdAction => {
//   mdAction.isOpen = true
// }

// export const closeActionBox = mdAction => {
//   mdAction.isOpen = false
// }

// export const toggleActionBox = mdAction => {
//   mdAction.isOpen = !mdAction.isOpen
// }

// export const setRecursivelyMdAction = ({
//   name,
//   nameTree,
//   url,
//   mdAction,
//   pattern,
//   selectedSwitchName,
//   mockTimesActions = [],
//   level = 0,
// }) => {
//   const { description, func, funcs } = getPatternInfo(pattern)

//   const levelName = `level-${level}`

//   Object.assign(mdAction, {
//     url,
//     description,
//     func,
//     funcs,
//     switchs: getSwitchAction(pattern.switch),
//     isOpen: level === 0,
//     level,
//     levelName,
//     name,
//     nameTree,
//     mdActions: [],
//   })

//   // set selected switch name
//   if (selectedSwitchName) {
//     mdAction.selectedSwitchName = selectedSwitchName
//   } else if (pattern.switch) {
//     mdAction.selectedSwitchName = Object.keys(pattern.switch)[0]
//   } else {
//     mdAction.selectedSwitchName = null
//   }

//   // set mdActions
//   setMocktimesAction(mdAction, mockTimesActions)
//   setMockUrl(mdAction)

//   if (typeof pattern !== 'object' || Array.isArray(pattern)) return

//   getActionKeys(pattern).forEach(mdActionKey => {
//     const currentPattern = pattern[mdActionKey]
//     const currentAction = {}
//     mdAction.mdActions.push(currentAction)

//     setRecursivelyMdAction({
//       name: mdActionKey,
//       nameTree: nameTree ? nameTree + '/' + mdActionKey : mdActionKey,
//       url: currentPattern.url || url,
//       mdAction: currentAction,
//       level: level + 1,
//       mockTimesActions: mdAction.mockTimesActions,
//       pattern: currentPattern,
//     })
//   })
// }

// export const setPattern = pattern =>
//   Action(() => {
//     state.mock.pattern = {}
//     Object.assign(state.mock.pattern, pattern)
//     setRecursivelyMdAction({
//       name: '',
//       nameTree: '',
//       url: pattern.url || getInitialPath(),
//       mdAction: state.mock.mdAction,
//       level: 0,
//       pattern,
//     })
//   })

// export const openHelp = () => {
//   state.help.isOpen = true
// }

// export const closeHelp = () => {
//   state.help.isOpen = false
// }
