import ReservedKey from '../const/reserved-key'
import queryString from 'query-string'

const {
  PATTERN
} = ReservedKey

export const isReservedKey = key => PATTERN.some(reservedKey => reservedKey === key)

export const isActionKey = key => !isReservedKey(key)

export const getActionKeys = pattern => Object.keys(pattern).filter(isActionKey)

export const isFunc = actionValue => Array.isArray(actionValue) && !Array.isArray(actionValue[0])

export const isFuncs = actionValue => Array.isArray(actionValue) && isFunc(actionValue[0])

export const getPatternInfo = pattern => {
  if (isFuncs(pattern)) {
    return {
      funcs: pattern
    }
  } else if (isFunc(pattern)) {
    return {
      func: pattern
    }
  }
  return pattern
}

export const getMockUrl = (url, mdActions) => {
  const parsed = queryString.parseUrl(url)
  parsed.query.__amCoffeeTime__ = encodeURIComponent(JSON.stringify(mdActions))
  return `${parsed.url}?${queryString.stringify(parsed.query)}`
}

export const getSwitchAction = switchItem => {
  if (!switchItem) return

  return getActionKeys(switchItem).filter(isActionKey).map(name => {
    const {
      func,
      funcs,
      url,
      description
    } = getPatternInfo(switchItem[name])

    return {
      name,
      func,
      funcs,
      url,
      description
    }
  })
}
