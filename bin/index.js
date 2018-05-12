#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const chokidar = require('chokidar')
const { exec } = require('child_process')
const patternHtml = require('./pattern-html')
const patternJs = require('./pattern-js')
const templateYml = require('./template-yml')
const templateConfig = require('./template-config')
const templateHtml = require('./template-html')
const templateSrc = require('./template-src')
const mockJs = require('./mock-js')
const outputTemplateLog = require('./output-template-log')

const { PATTERN_HTML, PATTERN_JS, MOCK_HTML, MOCK_JS } = require('./const')

const argv = require('yargs')
  .command('watch', 'Watch and output pattern & mock pages.')
  .command('build', 'Output pattern & mock pages.')
  .command(
    'generate-template',
    'Generate page files. Mock and application sources.'
  )
  .option('p', {
    alias: 'port',
    default: 1234,
    describe: "Set port for am-mocktimes's pattern list server.",
    type: 'number'
  })
  .option('pattern', {
    default: 'mock/pattern.yml',
    describe:
      "Set location of mock pattern file (.yml | .js | .json) for am-mocktimes's display.",
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
  .option('ss', {
    alias: 'sub-files',
    default: [],
    describe:
      'Set sub html files. If you want to set multiple files, please set like this. `-ss src/demo/*.html -ss doc/*.html`',
    type: 'array'
  })
  .option('d', {
    alias: 'out-dir',
    default: '.am-mocktimes',
    describe: 'Set output directory for am MockTimes.',
    type: 'string'
  })
  .option('public-url', {
    describe:
      'Set the public URL to serve on. defaults to the same as the --out-dir option',
    type: 'string'
  })
  .option('use-parcel', {
    default: true,
    describe: 'Use parcel.',
    type: 'boolean'
  })
  .option('r', {
    alias: 'mock-reload',
    default: false,
    describe: 'Mock html reload when hot module replacement.',
    type: 'boolean'
  }).argv

const patternFile = argv.pattern
const configFile = argv.config
const appFile = argv.app
const scriptSrc = argv.scriptSrc
const subFiles = argv.subFiles
const outDir = argv.outDir
const publicUrl = argv.publicUrl
const useParcel = argv.useParcel
const port = argv.port
const mockReload = argv.mockReload

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

const [command] = argv._

const makeFileIfNotExist = async (filePath, content = '') => {
  const isExistsFile = await fs.pathExists(filePath)
  if (isExistsFile) {
    console.warn(`${filePath} is existed.`)
    return
  }

  await fs.outputFile(filePath, content)
}

const generateTemplate = async () => {
  await makeFileIfNotExist(UserFiles.MOCK_PATTERN, templateYml())
  await makeFileIfNotExist(UserFiles.MOCK_CONFIG, templateConfig())
  await makeFileIfNotExist(UserFiles.SRC_HTML, templateHtml(scriptSrc))
  await makeFileIfNotExist(UserFiles.SRC_JS, templateSrc())
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
    let html = baseHtml.replace(
      `src='${scriptSrc}'`,
      `src="${MOCK_JS}" data-replaced`
    )
    html = html.replace(
      `src='./${scriptSrc}'`,
      `src="${MOCK_JS}" data-replaced`
    )
    html = html.replace(`src="${scriptSrc}"`, `src="${MOCK_JS}" data-replaced`)
    html = html.replace(
      `src="./${scriptSrc}"`,
      `src="${MOCK_JS}" data-replaced`
    )

    if (baseHtml === html) {
      console.warn(`warning: --script-src '${scriptSrc}', not found.`)
    }

    await fs.outputFile(FilePath.MOCK_HTML, html)
  } catch (e) {
    throw e
  }
}

const generateMockJs = async () => {
  const js = mockJs(
    outDir,
    configFile,
    path.join(appFile, '../'),
    scriptSrc,
    mockReload
  )
  try {
    await fs.outputFile(FilePath.MOCK_JS, js)
  } catch (e) {
    throw e
  }
}

const buildMocktimesFiles = async () => {
  await generatePatternHtml()
  await generatePatternJs()
  await generateMockHtml()
  await generateMockJs()
}

const getSubFilesPath = subFiles => {
  return subFiles.join(' ')
}

process.on('unhandledRejection', console.dir)

const start = async () => {
  switch (command) {
    case 'watch':
      await buildMocktimesFiles()
      chokidar
        .watch(UserFiles.SRC_HTML)
        .on('change', generateMockHtml)
        .on('error', console.error)

      if (useParcel) {
        const getPort = require('get-port')
        const patternPort = await getPort({ port })

        if (patternPort !== port) throw new Error(`Cannot use port: ${port}`)

        await generatePatternHtml()

        const patternOutDir = path.join(outDir, 'dev-pattern')
        const parcelPattern = exec(
          `npx parcel ${path.join(outDir, PATTERN_HTML)} ${path.join(
            outDir,
            MOCK_HTML
          )} ${getSubFilesPath(subFiles)} -p ${patternPort} -d ${patternOutDir}`
        )
        parcelPattern.stdout.on('data', console.log)
        parcelPattern.stderr.on('data', console.error)
      }
      break
    case 'build':
      await buildMocktimesFiles()
      if (useParcel) {
        const publicUrlArg = publicUrl ? `--public-url ${publicUrl}` : ''
        const parcelPattern = exec(
          `npx parcel build ${path.join(outDir, MOCK_HTML)} ${path.join(
            outDir,
            PATTERN_HTML
          )} ${getSubFilesPath(subFiles)} -d ${path.join(
            outDir
          )} ${publicUrlArg}`
        )
        parcelPattern.stdout.on('data', console.log)
        parcelPattern.stderr.on('data', console.error)
      }
      break
    case 'generate-template':
      await generateTemplate()
      outputTemplateLog()
      break
    default:
      throw new Error(`command not support: '${command}'`)
  }
}

start()
