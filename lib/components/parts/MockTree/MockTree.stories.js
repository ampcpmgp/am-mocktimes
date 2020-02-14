import { withKnobs } from '@storybook/addon-knobs'
import { transformTreeData, openAll } from '../../../utils/patterns'
import MockTree from './MockTree.svelte'
import patterns from './patterns-simple.js'

export default {
  title: 'MockTree',
  component: MockTree,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: MockTree,
  props: {
    treeData: transformTreeData(patterns()),
  },
  on: {
    actionclick: console.info,
  },
})

export const AllOpen = () => ({
  Component: MockTree,
  props: {
    treeData: openAll(transformTreeData(patterns())),
  },
  on: {
    actionclick: e => console.info(decodeURIComponent(e.detail.mockUrl)),
  },
})
