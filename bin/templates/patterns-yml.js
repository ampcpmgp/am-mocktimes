const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/patterns.yml'),
  src: `settings:
  url: mock.html
pattern 1: [action, 1]
`,
}
