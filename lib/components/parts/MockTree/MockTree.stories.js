import { withKnobs, object } from '@storybook/addon-knobs'
import MockTree from './MockTree.svelte'

const patterns = {
  settings: {
    url: '_mock.html',
  },
  'Travel Plan A': {
    func: ['setPlan', 'A'],
    description: 'top plan\nmost expensive plan\n',
    settings: {
      url: 'other-page.html',
    },
    planet: {
      switch: {
        Earth: {
          func: ['setLocation', 'earth'],
          description: 'less capacity, fullfilled water',
        },
        Mars: [['setLocation', 'mars']],
        Sun: ['setLocation', 'sun'],
      },
      'view statistics': ['view.displayStatistics'],
    },
  },
  'Travel Plan B': ['setPlan', 'B'],
  'Travel Plan Z and set Special Location': {
    funcs: [
      ['setPlan', 'Z'],
      ['setLocation', 'Cell Game', true],
    ],
  },
}

export default {
  title: 'MockTree',
  component: MockTree,
  decorators: [withKnobs],
}

export const Text = () => ({
  Component: MockTree,
  props: {
    patterns: object('patterns', patterns),
    url: patterns.settings.url,
  },
  on: {
    actionclick: console.info,
  },
})
