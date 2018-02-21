import { observable } from 'dob'

const state = observable({
  mock: {
    url: '',
    patterns: {}
  },
  help: {
    isOpen: false
  }
})

export default state
