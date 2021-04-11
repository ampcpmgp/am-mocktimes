const path = require("path");

module.exports = {
  filePath: path.join(process.cwd(), "mock/testbed/index.js"),
  src: `import { generateList } from 'am-mocktimes/dist/am-mocktimes.umd'
import 'am-mocktimes/dist/style.css'
import patterns from '../patterns.yml'

generateList(patterns)
`,
};
