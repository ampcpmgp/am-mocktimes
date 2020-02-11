const fs = require('fs-extra')
const templates = require('./templates')
const outputTemplateLog = require('./utils/output-template-log')

const makeFileIfNotExist = async ({ filePath, src }) => {
  const isExistsFile = await fs.pathExists(filePath)
  if (isExistsFile) {
    console.warn(`${filePath} is existed.`)
    return
  }

  await fs.outputFile(filePath, src)
}

module.exports = async () => {
  await makeFileIfNotExist(templates.appHtml)
  await makeFileIfNotExist(templates.appSrc)
  await makeFileIfNotExist(templates.mockConfig)
  await makeFileIfNotExist(templates.mockHtml)
  await makeFileIfNotExist(templates.mockSrc)
  await makeFileIfNotExist(templates.patternHtml)
  await makeFileIfNotExist(templates.patternJs)
  await makeFileIfNotExist(templates.patternYml)
  outputTemplateLog()
}
