#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const chokidar = require('chokidar')
const { exec } = require('child_process')
const patternHtml = require('./pattern-html')
const patternJs = require('./pattern-js')
const mockHtml = require('./mock-html')
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
    alias: 'port',
    default: 1234,
    describe: 'Set port for am-coffee-time\'s pattern list server.',
    type: 'number'
  })
  .option('mock-port', {
    default: 8400,
    describe: 'Set port for application mock server',
    type: 'number'
  })
  .option('pattern', {
    default: 'mock/pattern.yml',
    describe: 'Set location of mock pattern file (.yml | .js | .json) for am-coffee-time\'s display.',
    type: 'string'
  })
  .option('config', {
    default: 'mock/config.js',
    describe: 'Set location of js file with mock action is defined.',
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
  .option('public-url', {
    describe: 'Set the public URL to serve on. defaults to the same as the --out-dir option',
    type: 'string'
  })
  .option('use-parcel', {
    default: true,
    describe: 'Use parcel.',
    type: 'boolean'
  })
  .argv

const patternFile = argv.pattern
const configFile = argv.config
const appFile = argv.app
const scriptSrc = argv.scriptSrc
const outDir = argv.outDir
const publicUrl = argv.publicUrl
const useParcel = argv.useParcel
const port = argv.port
const mockPort = argv.mockPort

const FilePath = {
  PATTERN_HTML: path.join(process.cwd(), outDir, PATTERN_HTML),
  PATTERN_JS: path.join(process.cwd(), outDir, PATTERN_JS),
  MOCK_HTML: path.join(process.cwd(), outDir, MOCK_HTML),
  MOCK_JS: path.join(process.cwd(), outDir, MOCK_JS)
}

const UserFiles = {
  MOCK_PATTERN: patternFile,
  MOCK_CONFIG: configFile,
  SRC_HTML: appFile,
  SRC_JS: path.join(appFile, '..', scriptSrc)
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
  await makeFileIfNotExist(UserFiles.MOCK_PATTERN)
  await makeFileIfNotExist(UserFiles.MOCK_CONFIG)
  await makeFileIfNotExist(UserFiles.SRC_HTML, mockHtml(scriptSrc))
  await makeFileIfNotExist(UserFiles.SRC_JS)
}

const generatePatternHtml = async (mockPath = MOCK_HTML) => {
  const html = patternHtml(mockPath)
  try {
    await fs.outputFile(FilePath.PATTERN_HTML, html)
  } catch (e) {
    throw e
  }
}

const generatePatternJs = async () => {
  const js = patternJs(patternFile)
  try {
    await fs.outputFile(FilePath.PATTERN_JS, js)
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

    await fs.outputFile(FilePath.MOCK_HTML, html)
  } catch (e) {
    throw e
  }
}

const generateMockJs = async () => {
  const js = mockJs(outDir, configFile, path.join(appFile, '../'), scriptSrc)
  try {
    await fs.outputFile(FilePath.MOCK_JS, js)
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

const start = async () => {
  switch (command) {
    case 'watch':
      await buildCoffeeTimeFiles()
      chokidar.watch(UserFiles.SRC_HTML)
        .on('change', generateMockHtml)
        .on('error', console.error)

      if (useParcel) {
        const ip = require('ip')
        const getPort = require('get-port')
        const patternPort = await getPort({port})
        const parcelMockPort = await getPort({port: mockPort})

        if (patternPort !== port) throw new Error(`Cannot use port: ${port}`)
        if (parcelMockPort !== mockPort) console.warn(`Mockport: ${mockPort} is used, changed ${parcelMockPort}`)

        // parcelが複数エントリをサポートしたら、１プロセスにまとめる。
        // https://github.com/parcel-bundler/parcel/issues/189
        const mockOutDir = path.join(outDir, 'dev-mock')
        const parcelMock = exec(
          `npx parcel ${path.join(outDir, MOCK_HTML)} -p ${parcelMockPort} -d ${mockOutDir}`
        )
        parcelMock.stdout.on('data', (data) => console.log(data.replace(/\n/g, '')))
        parcelMock.stderr.on('data', console.error)
        await generatePatternHtml(`//${ip.address()}:${parcelMockPort}`)

        const patternOutDir = path.join(outDir, 'dev-pattern')
        const parcelPattern = exec(
          `npx parcel ${path.join(outDir, PATTERN_HTML)} -p ${patternPort} -d ${patternOutDir}`
        )
        parcelPattern.stdout.on('data', (data) => console.log(data.replace(/\n/g, '')))
        parcelPattern.stderr.on('data', console.error)
      }
      break
    case 'build':
      await buildCoffeeTimeFiles()
      if (useParcel) {
        const publicUrlArg = publicUrl ? `--public-url ${publicUrl}` : ''
        const parcelMock = exec(
          `npx parcel build ${path.join(outDir, MOCK_HTML)} -d ${path.join(outDir)} ${publicUrlArg}`
        )
        parcelMock.stdout.on('data', (data) => console.log(data.replace(/\n/g, '')))
        parcelMock.stderr.on('data', console.error)

        const parcelPattern = exec(
          `npx parcel build ${path.join(outDir, PATTERN_HTML)} -d ${path.join(outDir)} ${publicUrlArg}`
        )
        parcelPattern.stdout.on('data', (data) => console.log(data.replace(/\n/g, '')))
        parcelPattern.stderr.on('data', console.error)
      }
      break
    case 'generate-template':
      generateTemplate()
      break
    default:
      throw new Error(`command not support: '${command}'`)
  }
}

start()
