const fs = require('fs-extra')
const outputTemplateLog = require('./lib/output-template-log')
const templateYml = require('./lib/template-yml')
const templateConfig = require('./lib/template-config')
const templateHtml = require('./lib/template-html')
const templateSrc = require('./lib/template-src')
const { getUserFiles } = require('./lib/util')

const makeFileIfNotExist = async (filePath, content = '') => {
  const isExistsFile = await fs.pathExists(filePath)
  if (isExistsFile) {
    console.warn(`${filePath} is existed.`)
    return
  }

  await fs.outputFile(filePath, content)
}

const generateTemplate = async argv => {
  await makeFileIfNotExist(getUserFiles(argv).MOCK_PATTERN, templateYml())
  await makeFileIfNotExist(getUserFiles(argv).MOCK_CONFIG, templateConfig())
  await makeFileIfNotExist(
    getUserFiles(argv).SRC_HTML,
    templateHtml(argv.scriptSrc)
  )
  await makeFileIfNotExist(getUserFiles(argv).SRC_JS, templateSrc())
}

module.exports = async argv => {
  await generateTemplate(argv)
  outputTemplateLog()
}
