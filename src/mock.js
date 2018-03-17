import 'babel-polyfill'
import {getActions} from './utils/pattern'

const actions = getActions()

console.clear()

export default async (mockAction) => {
  for (const action of actions) {
    const [actionName, ...args] = action
    let actionFunc
    try {
      actionFunc = eval(`mockAction.${actionName}`) // eslint-disable-line
    } catch (e) {
      const errorMsg = `cannot find action - "${actionName}" `
      throw errorMsg
    }
    if (!actionName) continue
    if (!actionFunc) {
      const errorMsg = `"${actionName}" is undefined`
      throw errorMsg
    }
    await actionFunc(...args)
  }
}
