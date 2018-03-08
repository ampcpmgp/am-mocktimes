import 'babel-polyfill'
import {getActions} from './utils/pattern'

console.clear()

const actions = getActions()

export default async (mockAction) => {
  for (const action of actions) {
    const [actionName, ...args] = action
    let actionFunc
    try {
      actionFunc = eval(`mockAction.${actionName}`) // eslint-disable-line
    } catch (e) {
      const errorMsg = `cannot use action - "${actionName}" `
      throw errorMsg
    }
    if (!actionFunc) {
      const errorMsg = `"${actionName}" is undefined`
      throw errorMsg
    }
    await actionFunc(...args)
  }
}
