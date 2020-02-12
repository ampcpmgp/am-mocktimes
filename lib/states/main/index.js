import { observable } from 'dob'

const state = observable({
  mock: {
    lastExecutedUrl: '',
    url: '',
    pattern: {},
    mdAction: {},
  },
  help: {
    isOpen: false,
  },
})

export default state
