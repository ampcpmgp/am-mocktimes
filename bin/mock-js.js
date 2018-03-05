const path = require('path')
const normalize = require('normalize-path')

module.exports = (outputDir, configFile, appFilePath, scriptSrc) => {
  const configFilePath = path.relative(outputDir, configFile)
  const productionFilePath = path.relative(outputDir, path.join(appFilePath, scriptSrc))

  return `import '${normalize(configFilePath)}'
import '${normalize(productionFilePath)}'
`
}
