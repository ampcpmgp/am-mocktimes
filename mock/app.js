import { generateList } from '../src/main'
import state from '../src/state'
import pattern from '../mock/sample-app/pattern.yml'

generateList(state.mock.pattern || pattern)
