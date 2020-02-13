const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/patterns.yml'),
  // TODO: settings.url の設定
  src: `pattern 1: [action, 1]
`,
}
