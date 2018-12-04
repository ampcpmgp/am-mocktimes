const normalize = require('normalize-path')

module.exports = patternFile => {
  return `import {generateList} from 'am-mocktimes/src/main'
import pattern from '${normalize(patternFile)}'

generateList(pattern)
`
}
