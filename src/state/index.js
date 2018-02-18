import { observable } from 'dob'

const state = observable({
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
