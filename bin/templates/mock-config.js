const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/mock-config.js'),
  src: `import mock from 'am-mocktimes'

mock({
  action(param) {
    console.log('action', param)
  },
})
`,
}
