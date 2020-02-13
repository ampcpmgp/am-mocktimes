import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import Header from './Header.svelte'

export default {
  title: 'Header',
  component: Header,
  decorators: [withKnobs],
}

export const Main = () => ({
  Component: Header,
  on: {
    helpclick: action('clicked'),
  },
})
