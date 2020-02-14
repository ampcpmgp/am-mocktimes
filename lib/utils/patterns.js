import queryString from 'query-string'
import ReservedKey from '../const/reserved-key'

const { PATTERN } = ReservedKey

export function isReservedKey(key) {
  return PATTERN.some(reservedKey => reservedKey === key)
}

export function isActionKey(key) {
  return !isReservedKey(key)
}

export function getActionKeys(patterns) {
  if (isFunc(patterns) || isFuncs(patterns)) return []

  return Object.keys(patterns).filter(isActionKey)
}

export function hasChild(patterns) {
  const keys = getActionKeys(patterns)

  return keys.length > 0
}

export const getActions = patterns => {
  if (isFuncs(patterns)) {
    return patterns
  }

  if (isFunc(patterns)) {
    return [patterns]
  }

  if (isFuncs(patterns.funcs)) {
    return patterns.funcs
  }

  if (isFunc(patterns.func)) {
    return [patterns.func]
  }

  return []
}

export function isFunc(actionValue) {
  return Array.isArray(actionValue) && !Array.isArray(actionValue[0])
}

export function isFuncs(actionValue) {
  return Array.isArray(actionValue) && isFunc(actionValue[0])
}

export function reflectSwitchData(treeItem, selected) {
  if (selected.settings && selected.settings.url) {
    treeItem.url = selected.settings.url
  }

  treeItem.description = selected.description || ''
  treeItem.selected = selected
  treeItem.actions = [...selected.actions]

  const { patterns, url, actions, depth } = treeItem
  treeItem.treeData = transformTreeData(patterns, url, actions, depth)
}

export function transformTreeData(
  patterns,
  url = patterns.settings.url,
  actions = [],
  depth = 0
) {
  const actionKeys = getActionKeys(patterns)

  return actionKeys.map(key => {
    const itemPatterns = patterns[key]
    const { settings } = itemPatterns
    const itemActions = [...actions, ...getActions(itemPatterns)]
    const hasSwitch = !!itemPatterns.switch
    const itemUrl = (settings && settings.url) || url
    const description = itemPatterns.description || ''
    const switchData = hasSwitch
      ? transformTreeData(itemPatterns.switch, itemUrl, itemActions, depth)
      : []
    const itemDepth = depth + 1

    const treeData = {
      patterns: itemPatterns,
      name: key,
      url: itemUrl,
      description,
      actions: itemActions,
      isOpen: false,
      hasChild: hasChild(itemPatterns),
      treeData: [],
      hasSwitch,
      switchData,
      selected: {},
      depth: itemDepth,
      lastExecuted: false,
    }

    // スイッチ項目があればデータを上書きする
    if (hasSwitch) {
      reflectSwitchData(treeData, switchData[0])
    } else {
      treeData.treeData = transformTreeData(
        itemPatterns,
        itemUrl,
        itemActions,
        itemDepth
      )
    }

    return treeData
  })
}

export function openAll(treeData) {
  treeData.forEach(item => {
    item.isOpen = true
    item.treeData && openAll(item.treeData)
  })

  return treeData
}

export function resetLastExecuted(treeData) {
  treeData.forEach(item => {
    item.lastExecuted = false
    item.treeData && resetLastExecuted(item.treeData)
  })

  return treeData
}

// TODO: 以下要確認
export const getPatternInfo = pattern => {
  if (isFuncs(pattern)) {
    return {
      funcs: pattern,
    }
  } else if (isFunc(pattern)) {
    return {
      func: pattern,
    }
  }
  return pattern
}

export const getInitialPath = () => {
  const mockTimesElm = document.querySelector('[data-am-mocktimes-path]')
  if (mockTimesElm) {
    return mockTimesElm.dataset.amMocktimesPath || mockTimesElm.href
  }
}

export const getMockUrl = (url, mockTimesActions) => {
  const parsed = queryString.parseUrl(url)
  parsed.query.__amMocktimes__ = encodeURIComponent(
    JSON.stringify(mockTimesActions)
  )
  return `${parsed.url}?${queryString.stringify(parsed.query)}`
}

export const getSwitchAction = switchItem => {
  if (!switchItem) return

  return getActionKeys(switchItem)
    .filter(isActionKey)
    .map(name => {
      const { func, funcs, url, description } = getPatternInfo(switchItem[name])

      return {
        name,
        func,
        funcs,
        url,
        description,
      }
    })
}

export const getRoutePath = mockUrl => {
  return encodeURIComponent(JSON.stringify({ mockUrl }))
}

// export const getActions = () => {
//   const { __amMocktimes__ } = queryString.parse(location.search)
//   if (!__amMocktimes__) return []
//   return JSON.parse(decodeURIComponent(__amMocktimes__))
// }
