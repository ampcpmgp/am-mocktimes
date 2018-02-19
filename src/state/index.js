import { observable } from 'dob'

// non obserbable object
let mockPatterns = {}

const state = observable({
  mock: {
    url: '',
    patterns: null,
    test_array: [],
    getPatterns () {
      return mockPatterns
    },
    setPatterns (patterns) {
      mockPatterns = patterns
    }
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
