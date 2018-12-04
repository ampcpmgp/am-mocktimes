const { describe, it } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const util = require('util')
const assert = require('assert')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)

describe('watch', () => {
  it('パターンファイルのみビルドされること', async () => {
    await fs.remove('.am-mocktimes')
    execAsync(
      `node ./bin/index.js watch --only-pattern --app mock/index.html --open false`
    )

    await waitOn({
      resources: ['.am-mocktimes/pattern.html'],
      timeout: 4000
    })

    const existsMockHtml = await fs.pathExists('.am-mocktimes/mock.html')

    assert(!existsMockHtml)
  })
})
