import { observable } from 'dob'

const state = observable({
  mock: {
    url: ''
  },
  help: {
    isOpen: false,
    open () {
      state.help.isOpen = true
    },
    close () {
      state.help.isOpen = false
    }
  }
})

export default state
