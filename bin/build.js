const rimraf = require('rimraf')
const path = require('path')
const { exec } = require('child_process')
const { buildMocktimesFiles, getSubFilesPath } = require('./lib/util')
const { PATTERN_HTML, MOCK_HTML } = require('./lib/const')

module.exports = async argv => {
  rimraf.sync(argv.outDir)
  await buildMocktimesFiles(argv)
  if (argv.useParcel) {
    const publicUrlArg = argv.publicUrl ? `--public-url ${argv.publicUrl}` : ''
    const patternHtmlPath = path.join(argv.outDir, PATTERN_HTML)
    const parcelJobStr = `npx parcel build ${path.join(
      argv.outDir,
      MOCK_HTML
    )} ${patternHtmlPath} ${getSubFilesPath(argv.subFiles)} -d ${path.join(
      argv.outDir
    )} ${publicUrlArg}`
    const parcelJob = exec(parcelJobStr)
    parcelJob.stdout.on('data', console.log)
    parcelJob.stderr.on('data', console.error)
  }
}
