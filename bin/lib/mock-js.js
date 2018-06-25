const path = require('path')
const normalize = require('normalize-path')

const descriptionForReload = `
if (module.hot) {
  module.hot.dispose(() => {
    location.reload()
  })
}
`

module.exports = (
  outputDir,
  configFile,
  appFilePath,
  scriptSrc,
  mockReload
) => {
  const configFilePath = path.relative(outputDir, configFile)
  const productionFilePath = path.relative(
    outputDir,
    path.join(appFilePath, scriptSrc)
  )

  return `import 'babel-polyfill'
import '${normalize(configFilePath)}'
import '${normalize(productionFilePath)}'
${mockReload ? descriptionForReload : ''}
`
}
