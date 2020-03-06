import { withKnobs } from '@storybook/addon-knobs'
import { transformTreeData, openAll } from '../../../utils/patterns'
import MockTree from './MockTree.svelte'
import patterns from './patterns-simple.js'

export default {
  title: 'MockTree',
  component: MockTree,
  decorators: [withKnobs],
}

function actionClick(e) {
  console.info(decodeURIComponent(e.detail.mockUrl))
  console.info(e.detail.treeItem)
}

function changeOpenStatus(e) {
  console.info(e.detail)
}

export const Main = () => {
  const treeData = transformTreeData(patterns())

  return {
    Component: MockTree,
    props: {
      treeData,
    },
    on: {
      actionClick,
      changeOpenStatus,
    },
  }
}

export const AllOpen = () => {
  const treeData = openAll(transformTreeData(patterns()))
  treeData[0].lastExecuted = true

  return {
    Component: MockTree,
    props: {
      treeData,
    },
    on: {
      actionClick,
      changeOpenStatus,
    },
  }
}
