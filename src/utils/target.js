import { TARGET_ATTR } from '../const/dom'

export function getTarget () {
  return document.querySelector(`[${TARGET_ATTR}]`).getAttribute(TARGET_ATTR)
}
