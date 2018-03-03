import mock from '../../src/mock'

// mock code
mock({
  setPlan: async (planFile) => {
    console.warn(planFile)
  },
  setLocation (location, animationName) {
    console.warn(location, animationName)
  },
  goLocation () {
    console.warn('go location')
  },
  click (selector) {
    console.warn('click', selector)
  }
})

// prodcut code
