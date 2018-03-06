module.exports = (patternFile) => {
  return `import 'am-coffee-time/lib/main.css'
import {generateList} from 'am-coffee-time/lib/main'
import pattern from '../${patternFile}'

generateList(pattern)
`
}
