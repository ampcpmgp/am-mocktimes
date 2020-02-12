const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/_pattern.js'),
  src: `import { generateList } from 'am-mocktimes/src/main'
import pattern from './pattern.yml'

generateList(pattern)
`,
}
