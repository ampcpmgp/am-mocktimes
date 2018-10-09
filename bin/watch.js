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
  generatePatternHtml,
  getSubFilesPath
} = require('./lib/util')
const { PATTERN_HTML, MOCK_HTML } = require('./lib/const')

module.exports = async argv => {
  rimraf.sync(argv.outDir)
  await buildMocktimesFiles(argv)
  chokidar
    .watch(getUserFiles(argv).SRC_HTML)
    .on('change', () => generateMockHtml(argv))
    .on('error', console.error)

  if (argv.useParcel) {
    const getPort = require('get-port')
    const patternPort = await getPort({ port: argv.port })

    if (patternPort !== argv.port) {
      throw new Error(`Cannot use port: ${argv.port}`)
    }

    await generatePatternHtml(argv)

    const patternOutDir = path.join(argv.outDir, 'dev-pattern')
    const parcelJob = exec(
      `npx parcel ${path.join(argv.outDir, PATTERN_HTML)} ${path.join(
        argv.outDir,
        MOCK_HTML
      )} ${getSubFilesPath(
        argv.subFiles
      )} -p ${patternPort} -d ${patternOutDir} ${argv.https ? '--https' : ''}`
    )

    if (argv.open) {
      setTimeout(() => {
        opn(getDefaultUrl(argv))
      }, 5000)
    }

    parcelJob.stdout.on('data', (...args) => {
      console.log(...args)
    })
    parcelJob.stderr.on('data', console.error)
  }
}
