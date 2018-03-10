import sleep from '../../src/utils/sleep'
import mock from '../../src/mock'

const locations = {
  A: ['Earth', 'Mars', 'Sun'],
  B: ['Submaline City', 'Hanging Garden'],
  Z: ['Capsule Corporation', 'Yahhoi', 'Cell Game']
}

window.setLocation = async (location) => {
  const message = `This is ${location}`
  window.catSaysLocation.src = ''
  window.catSaysLocation.src = `https://cataas.com/cat/says/${message}`
  window.catSaysLocation.alt = `Image loading...`
  window.catSaysLocation.onerror = () => {
    window.catSaysLocation.alt = `Image not found. - ${message}`
  }
  if (location === 'Cell Game') {
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
    `${html}
      <section>
        <span class='location' onclick='setLocation("${location}")'>${location}</span>
        <span class='statistics'></span>
      </section>`,
    '')
}

window.displayStatistics = () => {
  const elementList = document.querySelectorAll('.statistics')
  elementList.forEach(element => {
    element.textContent = `visitors: ${Math.floor(Math.random() * 100)}`
  })
}

mock({
  setPlan,
  setLocation: window.setLocation,
  view: {
    displayStatistics: window.displayStatistics
  }
})
