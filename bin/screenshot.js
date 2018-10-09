const rimraf = require('rimraf')
const fs = require('fs-extra')
const path = require('path')

module.exports = async argv => {
  const filenamify = require('filenamify')
  const puppeteer = require('puppeteer')
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  })
  const page = await browser.newPage()
  const { FINISHED_ATTR } = require('../src/const/dom')

  page.setViewport({
    width: argv.width,
    height: argv.height
  })

  await page.goto(argv.url)

  const imgDir = path.join(process.cwd(), argv.outDir)

  await fs.ensureDir(imgDir)

  if (argv.pattern) {
    rimraf.sync(`${imgDir}/*${argv.pattern}*`)
  } else {
    rimraf.sync(`${imgDir}/*`)
  }

  const linkInfoStr = await page.evaluate(() => {
    // this will be executed in Chrome
    const linkInfo = Array.from(
      document.querySelectorAll(`[data-mock-links]`)
    ).map(elm => ({
      href: elm.href,
      name: elm.getAttribute('data-name-tree')
    }))
    return JSON.stringify(linkInfo)
  })

  const linkInfo = JSON.parse(linkInfoStr)

  for (const linkInfoItem of linkInfo) {
    const fileName = filenamify(`${linkInfoItem.name}`)

    if (argv.pattern && fileName.indexOf(argv.pattern) === -1) {
      continue
    }

    const outputError = e => {
      console.error(linkInfoItem.name, '\n', e, '\n')
    }
    page.on('pageerror', outputError)

    await page.goto(linkInfoItem.href)
    await page.waitFor(`[${FINISHED_ATTR}]`)
    await page.screenshot({
      type: 'jpeg',
      quality: 80,
      path: path.join(process.cwd(), argv.outDir, `${fileName}.jpg`)
    })

    page.removeListener('pageerror', outputError)
  }

  await browser.close()
}
