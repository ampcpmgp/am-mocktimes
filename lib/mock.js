import { getActions } from './utils/pattern'
import { FINISHED_ATTR } from './const/dom'

const actions = getActions()

'bcc' + 1

export default async function() {
  for (const action of actions) {
    const [actionName, ...args] = action
    let actionFunc
    try {
      actionFunc = eval(`mockAction.${actionName}`) // eslint-disable-line
    } catch (e) {
      const errorMsg = `cannot find action - "${actionName}" `
      console.warn(errorMsg)
      continue
    }
    if (!actionName) continue
    if (!actionFunc) {
      const errorMsg = `"${actionName}" is undefined`
      console.warn(errorMsg)
      continue
    }

    const result = actionFunc(...args)
    if (result && result.then) {
      await result
    }
  }

  let finishedElm = document.querySelector(`[${FINISHED_ATTR}]`)
  if (finishedElm) finishedElm.remove()

  finishedElm = document.createElement('span')
  finishedElm.setAttribute(FINISHED_ATTR, '')
  finishedElm.style.display = 'none'
  document.body.append(finishedElm)
}
