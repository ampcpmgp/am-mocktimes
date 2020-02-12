import { addParameters } from '@storybook/svelte'
import 'modern-css-reset/dist/reset.min.css'

addParameters({
  backgrounds: [
    { name: 'grey', value: '#ccc' },
    { name: 'lightgreen', value: 'lightgreen' },
  ],
})
