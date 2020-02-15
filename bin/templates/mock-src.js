const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/_mock.js'),
  src: `import './mock-config.js'
import '../src/main.js'
`,
}
