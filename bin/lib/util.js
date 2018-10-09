const ip = require('ip')
const fs = require('fs-extra')
const path = require('path')
const { PATTERN_HTML, PATTERN_JS, MOCK_HTML, MOCK_JS } = require('./const')
const patternHtml = require('./pattern-html')
const patternJs = require('./pattern-js')
const mockJs = require('./mock-js')

exports.getUserFiles = argv => ({
  MOCK_PATTERN: argv.pattern,
  MOCK_CONFIG: argv.config,
  SRC_HTML: argv.app,
  SRC_JS: path.join(argv.app, '..', argv.scriptSrc)
})

const getFilePath = (exports.getFilePath = argv => ({
  PATTERN_HTML: path.join(process.cwd(), argv.outDir, PATTERN_HTML),
  PATTERN_JS: path.join(process.cwd(), argv.outDir, PATTERN_JS),
  MOCK_HTML: path.join(process.cwd(), argv.outDir, MOCK_HTML),
  MOCK_JS: path.join(process.cwd(), argv.outDir, MOCK_JS)
}))

exports.buildMocktimesFiles = async argv => {
  await generatePatternHtml(argv)
  await generatePatternJs(argv)
  await generateMockHtml(argv)
  await generateMockJs(argv)
}

const generatePatternHtml = (exports.generatePatternHtml = async (
  argv,
  mockPath = MOCK_HTML
) => {
  const html = patternHtml(mockPath)
  try {
    await fs.outputFile(getFilePath(argv).PATTERN_HTML, html)
  } catch (e) {
    throw e
  }
})

const generatePatternJs = async argv => {
  const js = patternJs(argv.pattern)
  try {
    await fs.outputFile(getFilePath(argv).PATTERN_JS, js)
  } catch (e) {
    throw e
  }
}

const generateMockHtml = (exports.generateMockHtml = async argv => {
  try {
    const appFilePath = path.join(process.cwd(), argv.app)
    const isExistsFile = await fs.pathExists(appFilePath)
    if (!isExistsFile) {
      throw new Error(`--app '${argv.app}', file not found.`)
    }

    const baseHtml = await fs.readFile(appFilePath, 'utf-8')
    let html = baseHtml.replace(
      `src='${argv.scriptSrc}'`,
      `src="${MOCK_JS}" data-replaced`
    )
    html = html.replace(
      `src='./${argv.scriptSrc}'`,
      `src="${MOCK_JS}" data-replaced`
    )
    html = html.replace(
      `src="${argv.scriptSrc}"`,
      `src="${MOCK_JS}" data-replaced`
    )
    html = html.replace(
      `src="./${argv.scriptSrc}"`,
      `src="${MOCK_JS}" data-replaced`
    )

    if (baseHtml === html) {
      console.warn(`warning: --script-src '${argv.scriptSrc}', not found.`)
    }

    await fs.outputFile(getFilePath(argv).MOCK_HTML, html)
  } catch (e) {
    throw e
  }
})

const generateMockJs = async argv => {
  const js = mockJs(
    argv.outDir,
    argv.config,
    path.join(argv.app, '../'),
    argv.scriptSrc,
    argv.mockReload
  )
  try {
    await fs.outputFile(getFilePath(argv).MOCK_JS, js)
  } catch (e) {
    throw e
  }
}

exports.getSubFilesPath = subFiles => {
  return subFiles.join(' ')
}

exports.getDefaultUrl = argv =>
  `${argv.https ? 'https' : 'http'}://${ip.address()}:${argv.port}/${
    argv.subFiles && argv.subFiles.length ? `${argv.outDir}/` : ''
  }${PATTERN_HTML}`
