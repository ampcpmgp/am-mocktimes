const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/testbed/patterns.js'),
  src: `import { generateList } from 'am-mocktimes/lib/main'
import patterns from '../patterns.yml'

generateList(patterns)
`,
}
