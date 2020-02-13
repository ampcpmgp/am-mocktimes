import { withKnobs, object } from '@storybook/addon-knobs'
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
    patterns: object('patterns', patterns),
    url: patterns.settings.url,
    actions: [],
  },
  on: {
    actionclick: console.info,
  },
})
