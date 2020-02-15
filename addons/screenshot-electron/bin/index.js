const rimraf = require('rimraf')
const filenamify = require('filenamify')
const electron = require('electron')
const yargs = require('yargs')
const fs = require('fs-extra')
const path = require('path')
// am-mocktimes と共通化したい
const { DEFAULT_URL, FINISHED_ATTR } = require('./const')

const { argv } = yargs.options({
  pattern: {
    alias: 'p',
    describe:
      'Filter patter name. Specify the same as file name. eg: `pattern1!pattern2!pattern3`',
    default: '',
    type: 'string',
  },
  width: {
    alias: 'w',
    describe: 'Set viewport width.',
    default: 1440,
    type: 'number',
  },
  height: {
    alias: 'h',
    describe: 'Set viewport height.',
    default: 900,
    type: 'number',
  },
  url: {
    alias: 'u',
    describe: "Set port for am-mocktimes's pattern url.",
    default: DEFAULT_URL,
    type: 'string',
  },
  'out-dir': {
    alias: 'd',
    default: './.am-mocktimes-img',
    describe: 'Set output directory for mock images.',
  },
})

const { app, BrowserWindow, ipcMain } = electron

async function createWindow(url) {
  let mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: argv.width,
    height: argv.height,
    webPreferences: {
      preload: path.resolve(path.join(__dirname, 'preload.js')),
    },
  })

  mainWindow.loadURL(url)

  return new Promise(resolve => {
    mainWindow.webContents.once('did-fail-load', () => {
      console.error('ERROR', `${url} - not connected.`)
      process.exit()
    })

    mainWindow.webContents.once('did-finish-load', () => {
      resolve(mainWindow)
    })
  })
}

async function start() {
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

  const mainWindow = await createWindow(argv.url)
  const imgDir = path.join(process.cwd(), argv.outDir)

  await fs.ensureDir(imgDir)
  rimraf.sync(`${imgDir}/*`)

  const linkInfoStr = await mainWindow.webContents.executeJavaScript(`
    new Promise(resolve => {
      const linkInfo = Array.from(
        document.querySelectorAll("[data-mock-links]")
      ).map(elm => ({
        href: elm.href,
        name: elm.textContent
      }))

      resolve(JSON.stringify(linkInfo))
    })
  `)

  const linkInfo = JSON.parse(linkInfoStr)

  for (const item of linkInfo) {
    const fileName = filenamify(`${item.name}`)

    if (argv.pattern && fileName.indexOf(argv.pattern) === -1) {
      continue
    }

    ipcMain.on('errorInWindow', (event, data) => {
      console.error('Pattern: ', item.name, '\n', data, '\n')
    })

    mainWindow.loadURL(item.href)

    await new Promise(resolve => {
      mainWindow.webContents.once('did-finish-load', resolve)
    })

    await mainWindow.webContents.executeJavaScript(`
      new Promise(resolve => {
        setInterval(() => {
          if (document.querySelector("[${FINISHED_ATTR}]")) {
            resolve()
          }
        }, 100)
      })
    `)

    // electron@4 にした時にpromiseを返す関数を利用する
    const image = await new Promise(resolve => mainWindow.capturePage(resolve))
    const filePath = path.join(process.cwd(), argv.outDir, `${fileName}.jpg`)

    await fs.writeFile(filePath, image.toPNG())
    ipcMain.removeAllListeners('errorInWindow')
  }

  app.quit()
}

app.on('ready', start)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
