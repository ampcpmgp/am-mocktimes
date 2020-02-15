const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/_patterns.js'),
  src: `import { generateList } from 'am-mocktimes/lib/main'
import pattern from './patterns.yml'

generateList(pattern)
`,
}
