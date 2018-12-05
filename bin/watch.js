const chokidar = require('chokidar')
const rimraf = require('rimraf')
const opn = require('opn')
const path = require('path')
const { exec } = require('child_process')
const {
  getDefaultUrl,
  getUserFiles,
  buildMocktimesFiles,
  generateMockHtml,
  getSubFilesPath
} = require('./lib/util')
const { PATTERN_HTML, MOCK_HTML } = require('./lib/const')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async argv => {
  rimraf.sync(argv.outDir)
  await buildMocktimesFiles(argv)

  if (!argv.onlyPattern) {
    chokidar
      .watch(getUserFiles(argv).SRC_HTML)
      .on('change', async () => {
        await sleep(0)
        generateMockHtml(argv)
      })
      .on('error', console.error)
  }

  if (argv.useParcel) {
    const getPort = require('get-port')
    const patternPort = await getPort({ port: argv.port })

    if (patternPort !== argv.port) {
      throw new Error(`Cannot use port: ${argv.port}`)
    }

    const patternOutDir = path.join(argv.outDir, 'dev-pattern')
    const parcelJob = exec(
      `npx parcel ${path.join(argv.outDir, PATTERN_HTML)} ${path.join(
        argv.outDir,
        MOCK_HTML
      )} ${getSubFilesPath(
        argv.subFiles
      )} -p ${patternPort} -d ${patternOutDir} ${argv.https ? '--https' : ''}`
    )

    let isOpened = false

    parcelJob.stdout.on('data', (...args) => {
      if (!isOpened && argv.open && args[0].indexOf('√  Built in') > -1) {
        opn(getDefaultUrl(argv))
        isOpened = true
      }

      console.log(...args)
    })
    parcelJob.stderr.on('data', console.error)
  }
}
