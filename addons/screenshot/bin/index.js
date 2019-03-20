const fs = require('fs-extra')
const rimraf = require('rimraf')
const filenamify = require('filenamify')
const puppeteer = require('puppeteer')
const yargs = require('yargs')
const path = require('path')
// am-mocktimes と共通化したい
const { DEFAULT_URL, FINISHED_ATTR } = require('../src/const')

const { argv } = yargs.options({
  pattern: {
    alias: 'p',
    describe:
      'Filter patter name. Specify the same as file name. eg: `pattern1!pattern2!pattern3`',
    default: '',
    type: 'string'
  },
  width: {
    alias: 'w',
    describe: 'Set viewport width.',
    default: 1440,
    type: 'number'
  },
  height: {
    alias: 'h',
    describe: 'Set viewport height.',
    default: 900,
    type: 'number'
  },
  url: {
    alias: 'u',
    describe: "Set port for am-mocktimes's pattern url.",
    default: DEFAULT_URL,
    type: 'string'
  },
  'out-dir': {
    alias: 'd',
    default: './.am-mocktimes-img',
    describe: 'Set output directory for mock images.'
  }
})

async function start () {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true
  })
  const page = await browser.newPage()

  page.setViewport({
    width: argv.width,
    height: argv.height
  })

  try {
    await page.goto(argv.url)
  } catch (error) {
    console.error('ERROR', `${argv.url} - not connected.`)
    process.exit()
  }

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

start()
