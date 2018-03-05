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

const [ command ] = argv._

if (command !== 'init') {
  throw new Error(`command not support: '${command}'`)
}

const generatePatternHtml = async () => {
  const html = patternHtml(appFile)
  try {
    fs.outputFile(path.join(process.cwd(), outputDir, PATTERN_HTML), html)
  } catch (e) {
    throw e
  }
}

const generatePatternJs = async () => {
  const js = patternJs(patternFile)
  try {
    fs.outputFile(path.join(process.cwd(), outputDir, PATTERN_JS), js)
  } catch (e) {
    throw e
  }
}

const generateMockHtml = async () => {
  try {
    const baseHtml = await fs.readFile(appFile, 'utf-8')
    if (!baseHtml) {
      throw new Error(`--app '${appFile}', file not found.`)
    }
    let html = baseHtml.replace(`src='${scriptSrc}'`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src='./${scriptSrc}'`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src="${scriptSrc}"`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(`src="./${scriptSrc}"`, `src="${MOCK_JS}" data-replaced`)

    if (baseHtml === html) console.warn(`warning: --script-src '${scriptSrc}', not found.`)

    fs.outputFile(path.join(process.cwd(), outputDir, MOCK_HTML), html)
  } catch (e) {
    throw e
  }
}

const generateMockJs = async () => {
  const js = mockJs(outputDir, configFile, path.join(appFile, '../'), scriptSrc)
  try {
    fs.outputFile(path.join(process.cwd(), outputDir, MOCK_JS), js)
  } catch (e) {
    throw e
  }
}

process.on('unhandledRejection', console.dir)

generatePatternHtml()
generatePatternJs()
generateMockHtml()
generateMockJs()
