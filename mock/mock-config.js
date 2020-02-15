import sleep from '../lib/utils/sleep'
import mock from '../lib/mock'
import cat from './cat.svg'

const locations = {
  A: ['Earth', 'Mars', 'Sun'],
  B: ['Submaline City', 'Hanging Garden'],
  Z: ['Capsule Corporation', 'Yahhoi', 'Cell Game'],
}

window.setLocation = async location => {
  console.log('setLocation')
  const message = `This is ${location}`
  window.catSaysLocation.src = ''
  window.catSaysLocation.alt = `Image loading...`
  window.say.textContent = ''
  await sleep(1000)
  window.catSaysLocation.src = cat
  window.say.textContent = message
  if (location === 'Cell Game') {
    window.catSaysLocation.onload = async () => {
      window.picture.style.animation = ``
      await sleep(100)
      window.picture.style.animation = `spin 0.8s ease`
    }
  } else {
    window.catSaysLocation.onload = () => {}
  }
}

const setPlan = async planName => {
  console.log('setPlan')
  await sleep(1400)
  window.planName.textContent = planName
  window.locationBox.innerHTML = locations[planName].reduce(
    (html, location) =>
      `${html}
      <section>
        <span class='location' onclick='setLocation("${location}")'>${location}</span>
        <span class='statistics'></span>
      </section>`,
    ''
  )
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
    displayStatistics: window.displayStatistics,
  },
})
