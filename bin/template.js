const fs = require('fs-extra')
const templates = require('./templates')
const outputTemplateLog = require('./utils/output-template-log')

const makeFileIfNotExist = async ({ filePath, src }, { force }) => {
  const isExistsFile = await fs.pathExists(filePath)
  if (isExistsFile && !force) {
    console.warn(`${filePath} is existed. skipped.`)
    return
  }

  await fs.outputFile(filePath, src)
}

module.exports = async argv => {
  await makeFileIfNotExist(templates.appHtml, argv)
  await makeFileIfNotExist(templates.appSrc, argv)
  await makeFileIfNotExist(templates.mockConfig, argv)
  await makeFileIfNotExist(templates.mockHtml, argv)
  await makeFileIfNotExist(templates.mockSrc, argv)
  await makeFileIfNotExist(templates.patternsHtml, argv)
  await makeFileIfNotExist(templates.patternsJs, argv)
  await makeFileIfNotExist(templates.patternsYml, argv)
  outputTemplateLog()
}
