#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const patternHtml = require('./pattern-html')
const patternJs = require('./pattern-js')
const mockJs = require('./mock-js')

const {
  PATTERN_HTML,
  PATTERN_JS,
  MOCK_HTML,
  MOCK_JS
} = require('./const')

const argv = require('yargs')
  .command('watch', 'Watch and output pattern & mock pages.')
  .command('build', 'Output pattern & mock pages.')
  .command('generate-template', 'Generate page files. Mock and application sources.')
  .option('p', {
    alias: 'pattern',
    default: 'mock/pattern.yml',
    describe: 'Set mock pattern file (.yml | .js | .json) for am-coffee-time\'s display.',
    type: 'string'
  })
  .option('c', {
    alias: 'config',
    default: 'mock/config.js',
    describe: 'Set js file with mock action is defined.',
    type: 'string'
  })
  .option('a', {
    alias: 'app',
    default: 'src/index.html',
    describe: 'Set product html file.',
    type: 'string'
  })
  .option('s', {
    alias: 'script-src',
    default: 'app.js',
    describe: 'Set main script src in product html file.',
    type: 'string'
  })
  .option('d', {
    alias: 'out-dir',
    default: '.am-coffee-time',
    describe: 'Set output directory for am coffee time.',
    type: 'string'
  })
  .argv

const patternFile = argv.pattern
const configFile = argv.config
const appFile = argv.app
const scriptSrc = argv.scriptSrc
const outputDir = argv.outDir

const Path = {
  PATTERN_HTML: path.join(process.cwd(), outputDir, PATTERN_HTML),
  PATTERN_JS: path.join(process.cwd(), outputDir, PATTERN_JS),
  MOCK_HTML: path.join(process.cwd(), outputDir, MOCK_HTML),
  MOCK_JS: path.join(process.cwd(), outputDir, MOCK_JS)
}

const [ command ] = argv._

const makeFileIfNotExist = async (filePath, content = '') => {
  const isExistsFile = await fs.pathExists(filePath)
  if (isExistsFile) {
    console.warn(`${filePath} is existed.`)
    return
  }

  await fs.outputFile(filePath, content)
}

const generateTemplate = async () => {
  const UserFiles = {
    MOCK_PATTERN: patternFile,
    MOCK_CONFIG: configFile,
    SRC_HTML: appFile,
    SRC_JS: path.join(appFile, '..', scriptSrc)
  }

  await makeFileIfNotExist(UserFiles.MOCK_PATTERN)
  await makeFileIfNotExist(UserFiles.MOCK_CONFIG)
  await makeFileIfNotExist(UserFiles.SRC_HTML, `<script src="${scriptSrc}"></script>\n`)
  await makeFileIfNotExist(UserFiles.SRC_JS)
}

const generatePatternHtml = async () => {
  const html = patternHtml(appFile)
  try {
    await fs.outputFile(Path.PATTERN_HTML, html)
  } catch (e) {
    throw e
  }
}

const generatePatternJs = async () => {
  const js = patternJs(patternFile)
  try {
    await fs.outputFile(Path.PATTERN_JS, js)
  } catch (e) {
    throw e
  }
}

const generateMockHtml = async () => {
  try {
    const appFilePath = path.join(process.cwd(), appFile)
    const isExistsFile = await fs.pathExists(appFilePath)
    if (!isExistsFile) {
      throw new Error(`--app '${appFile}', file not found.`)
    }

    const baseHtml = await fs.readFile(appFilePath, 'utf-8')
    let html = baseHtml.replace(`src='${scriptSrc}'`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src='./${scriptSrc}'`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src="${scriptSrc}"`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src="./${scriptSrc}"`, `src="${MOCK_JS}" data-replaced`)

    if (baseHtml === html) console.warn(`warning: --script-src '${scriptSrc}', not found.`)

    await fs.outputFile(Path.MOCK_HTML, html)
  } catch (e) {
    throw e
  }
}

const generateMockJs = async () => {
  const js = mockJs(outputDir, configFile, path.join(appFile, '../'), scriptSrc)
  try {
    await fs.outputFile(Path.MOCK_JS, js)
  } catch (e) {
    throw e
  }
}

const buildCoffeeTimeFiles = async () => {
  await generatePatternHtml()
  await generatePatternJs()
  await generateMockHtml()
  await generateMockJs()
}

process.on('unhandledRejection', console.dir)

switch (command) {
  case 'watch':
    require('./parcel')()
    break
  case 'build':
    buildCoffeeTimeFiles()
    break
  case 'generate-template':
    generateTemplate()
    break
  default:
    throw new Error(`command not support: '${command}'`)
}
