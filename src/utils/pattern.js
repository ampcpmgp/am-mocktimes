import ReservedKey from '../const/reserved-key'

const {
  PATTERN
} = ReservedKey

export const isReservedKey = key => PATTERN.some(reservedKey => reservedKey === key)
export const isActionKey = key => !isReservedKey(key)

export const getActionPatternList = pattern => Object.keys(pattern).filter(isActionKey).map(key => ({key, pattern: pattern[key]}))
