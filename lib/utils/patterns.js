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

export function getDescription(patterns, actionKey) {
  return patterns[actionKey].description || ''
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
