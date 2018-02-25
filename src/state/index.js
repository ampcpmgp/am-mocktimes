import { observable } from 'dob'

const state = observable({
  mock: {
    url: '',
    pattern: {},
    mdAction: {}
  },
  help: {
    isOpen: false
  }
})

export default state
