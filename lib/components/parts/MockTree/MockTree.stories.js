import { withKnobs } from '@storybook/addon-knobs'
import { transformTreeData } from '../../../utils/patterns'
import MockTree from './MockTree.svelte'
import patterns from './patterns-simple.js'

const treeData = transformTreeData(patterns)

export default {
  title: 'MockTree',
  component: MockTree,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: MockTree,
  props: {
    treeData,
  },
  on: {
    actionclick: console.info,
  },
})
