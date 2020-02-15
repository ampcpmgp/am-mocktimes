import { withKnobs, select } from '@storybook/addon-knobs'
import MockView from './MockView.svelte'

export default {
  title: 'MockView',
  component: MockView,
  decorators: [withKnobs],
}

export const Main = () => {
  return {
    Component: MockView,
    props: {
      target: select('target', ['browser', 'electron', 'other'], 'browser'),
      src: '?path=/story/header--main',
    },
  }
}
