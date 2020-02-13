// TODO: 不要なものは全て削除する。
import queryString from 'query-string'
import ReservedKey from '../const/reserved-key'

const { PATTERN } = ReservedKey

export const isReservedKey = key =>
  PATTERN.some(reservedKey => reservedKey === key)

export const isActionKey = key => !isReservedKey(key)

export const getActionKeys = pattern => Object.keys(pattern).filter(isActionKey)

export const isFunc = actionValue =>
  Array.isArray(actionValue) && !Array.isArray(actionValue[0])

export const isFuncs = actionValue =>
  Array.isArray(actionValue) && isFunc(actionValue[0])

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

export const getActions = () => {
  const { __amMocktimes__ } = queryString.parse(location.search)
  if (!__amMocktimes__) return []
  return JSON.parse(decodeURIComponent(__amMocktimes__))
}
