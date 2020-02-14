import 'modern-css-reset'
import setKeyboardEvent from './utils/keyboard'
import { treeData } from './states/mock'
import { transformTreeData } from './utils/patterns'
import App from './components/App'

export function generateList(ymlData) {
  treeData.set(transformTreeData(ymlData))
  setKeyboardEvent()
  new App({
    target: document.getElementById('app'),
  })
}
