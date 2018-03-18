module.exports = (patternFile) => {
  return `import 'am-mocktimes/lib/main.css'
import {generateList} from 'am-mocktimes/lib/main'
import pattern from '../${patternFile}'

generateList(pattern)
`
}
