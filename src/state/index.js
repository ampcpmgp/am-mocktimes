import { observable } from 'dob'

const state = observable({
  mock: {
    url: '',
    patterns: {},
    patternInfo: new Map()
  },
  help: {
    isOpen: false
  }
})

export default state
