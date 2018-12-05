import { mount, storiesOf } from '@storybook/riot'
import { withKnobs, select, text } from '@storybook/addon-knobs'
import './index.tag'

storiesOf('View Mock', module)
  .addDecorator(withKnobs)
  .add('normal', () =>
    mount('parts-view-mock', {
      dataTarget: select(
        'dataTarget',
        {
          browser: 'browser',
          electron: 'electron'
        },
        'browser'
      ),
      dataSrc: text('dataSrc', '//example.com')
    })
  )
