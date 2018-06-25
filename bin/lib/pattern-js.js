module.exports = patternFile => {
  return `import {generateList} from 'am-mocktimes/src/main'
import pattern from '../${patternFile}'

generateList(pattern)
`
}
