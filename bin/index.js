#!/usr/bin/env node
const ip = require('ip')
const opn = require('opn')
const rimraf = require('rimraf')
const fs = require('fs-extra')
const path = require('path')
const chokidar = require('chokidar')
const { exec } = require('child_process')
const patternHtml = require('./lib/pattern-html')
const patternJs = require('./lib/pattern-js')
const templateYml = require('./lib/template-yml')
const templateConfig = require('./lib/template-config')
const templateHtml = require('./lib/template-html')
const templateSrc = require('./lib/template-src')
const mockJs = require('./lib/mock-js')
const outputTemplateLog = require('./lib/output-template-log')

const { PATTERN_HTML, PATTERN_JS, MOCK_HTML, MOCK_JS } = require('./lib/const')
const DEFAULT_PORT = 1234

const getDefaultUrl = (port = DEFAULT_PORT, subFiles = null) =>
  `http://${ip.address()}:${port}/${
    subFiles && subFiles.length ? `${outDir}/` : ''
  }${PATTERN_HTML}`

const argv = require('yargs')
  .command(
    'screen-shot',
    'Capture all mock pages. Make sure to access the mock page.',
  {
    url: {
      alias: 'u',
      describe: "Set port for am-mocktimes's pattern list server.",
      default: getDefaultUrl()
    },
    'out-dir': {
      alias: 'd',
      default: './am-mocktimes-img',
      describe: 'Set output directory for mock images.'
    }
  }
  )
  .command('watch', 'Watch and output pattern & mock pages.')
  .command('build', 'Output pattern & mock pages.')
  .command(
    'generate-template',
    'Generate page files. Mock and application sources.'
  )
  .option('p', {
    alias: 'port',
    default: DEFAULT_PORT,
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
  .option('app', {
    alias: 'a',
    default: 'src/index.html',
    describe: 'Set product html file.',
    type: 'string'
  })
  .option('script-src', {
    alias: 's',
    default: 'app.js',
    describe: 'Set main script src in product html file.',
    type: 'string'
  })
  .option('sub-files', {
    alias: 'ss',
    default: [],
    describe:
      'Set sub html files. If you want to set multiple files, please set like this. `-ss src/demo/*.html -ss doc/*.html`',
    type: 'array'
  })
  .option('out-dir', {
    alias: 'd',
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
const url = argv.url

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
    case 'screen-shot':
      const { Chromeless } = require('chromeless')

      const chromeless = new Chromeless()
      const { FINISHED_ATTR } = require('../src/const/dom')

      const linkInfoStr = await chromeless.goto(url).evaluate(() => {
        // this will be executed in Chrome
        const linkInfo = Array.from(
          document.querySelectorAll(`[data-mock-links]`)
        ).map(elm => ({ href: elm.href }))
        return JSON.stringify(linkInfo)
      })
      const linkInfo = JSON.parse(linkInfoStr)

      const imgDir = path.join(process.cwd(), outDir)
      await fs.ensureDir(imgDir)

      let i = 0
      for (const linkInfoItem of linkInfo) {
        await chromeless
          .goto(linkInfoItem.href)
          .wait(`[${FINISHED_ATTR}]`)
          .screenshot({
            filePath: path.join(process.cwd(), outDir, `${++i}.png`)
          })
      }

      await chromeless.end()
      return
    case 'watch':
      rimraf.sync(outDir)
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
        const parcelJob = exec(
          `npx parcel ${path.join(outDir, PATTERN_HTML)} ${path.join(
            outDir,
            MOCK_HTML
          )} ${getSubFilesPath(subFiles)} -p ${patternPort} -d ${patternOutDir}`
        )

        parcelJob.stdout.on('data', (...args) => {
          console.log(...args)
        })
        parcelJob.stderr.on('data', console.error)

        setTimeout(() => {
          opn(getDefaultUrl(port, subFiles))
        }, 3000)
      }
      break
    case 'build':
      rimraf.sync(outDir)
      await buildMocktimesFiles()
      if (useParcel) {
        const publicUrlArg = publicUrl ? `--public-url ${publicUrl}` : ''
        const patternHtmlPath = path.join(outDir, PATTERN_HTML)
        const parcelJobStr = `npx parcel build ${path.join(
          outDir,
          MOCK_HTML
        )} ${patternHtmlPath} ${getSubFilesPath(subFiles)} -d ${path.join(
          outDir
        )} ${publicUrlArg}`
        const parcelJob = exec(parcelJobStr)
        parcelJob.stdout.on('data', console.log)
        parcelJob.stderr.on('data', console.error)
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
