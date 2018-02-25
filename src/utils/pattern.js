import ReservedKey from '../const/reserved-key'
import queryString from 'query-string'

const {
  PATTERN
} = ReservedKey

export const isReservedKey = key => PATTERN.some(reservedKey => reservedKey === key)

export const isActionKey = key => !isReservedKey(key)

export const getActionPatternList = pattern => Object.keys(pattern).filter(isActionKey).map(key => ({key, pattern: pattern[key]}))

export const getMockUrl = (url, actions) => {
  const parsed = queryString.parseUrl(url)
  parsed.query.__amCoffeeTime__ = encodeURIComponent(JSON.stringify(actions))
  return `${parsed.url}?${queryString.stringify(parsed.query)}`
}
