import sleep from '../../src/utils/sleep'
import mock from '../../src/mock'

const locations = {
  A: ['Earth', 'Mars', 'Sun'],
  B: ['Submaline City', 'Hanging Garden'],
  Z: ['Capsule Corporation', 'Yahhoi', 'Cell Game']
}

window.setLocation = async (location, animation) => {
  const message = `This is ${location}`
  window.catSaysLocation.src = `https://cataas.com/cat/says/${message}`
  window.catSaysLocation.alt = `Image loading...`
  window.catSaysLocation.onerror = () => {
    window.catSaysLocation.alt = `Image not found. - ${message}`
  }
  if (animation) {
    window.catSaysLocation.onload = () => {
      window.catSaysLocation.style.animation = ``
      window.catSaysLocation.style.animation = `spin 0.8s ease`
    }
  }
}

const setPlan = async (planName) => {
  await sleep(1400)
  window.planName.textContent = planName
  window.locationBox.innerHTML =
    locations[planName].reduce((html, location) =>
    `${html}<div onclick='setLocation("${location}")'>${location}</div>`,
    '')
}

mock({
  setPlan,
  setLocation: window.setLocation,
  goLocation () {
    console.warn('go location')
  },
  click (selector) {
    console.warn('click', selector)
  }
})
