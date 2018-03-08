import {generateList} from './main'
import state from './state'
import pattern from '../mock/sample-app/pattern.yml'

generateList(state.mock.pattern || pattern)
