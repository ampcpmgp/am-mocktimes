import { withKnobs } from '@storybook/addon-knobs'
import Help from './Help.svelte'

export default {
  title: 'Help',
  component: Help,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Help,
  on: {
    overlayclick: console.info,
  },
})
