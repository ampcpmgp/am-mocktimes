import ReservedKey from '../const/reserved-key'
import queryString from 'query-string'

const {
  PATTERN
} = ReservedKey

export const isReservedKey = key => PATTERN.some(reservedKey => reservedKey === key)

export const isActionKey = key => !isReservedKey(key)

export const getActionKeys = pattern => Object.keys(pattern).filter(isActionKey)

export const isFunc = actionValue => Array.isArray(actionValue) && !Array.isArray(actionValue[0])

export const isFuncs = actionValue => isFunc(actionValue) && isFunc(actionValue[0])

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

export const getMockUrl = (url, actions) => {
  const parsed = queryString.parseUrl(url)
  parsed.query.__amCoffeeTime__ = encodeURIComponent(JSON.stringify(actions))
  return `${parsed.url}?${queryString.stringify(parsed.query)}`
}

export const getSwitchAction = switchData => {
  if (!switchData) return

  return getActionKeys(switchData).filter(isActionKey).map(name => {
    const {
      func,
      funcs,
      url,
      description
    } = getPatternInfo(switchData[name])

    return {
      name,
      func,
      funcs,
      url,
      description
    }
  })
}
