const { describe, it } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const util = require('util')
const assert = require('assert')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)
const dir = '.test'

describe('watch', () => {
  it('パターンファイルのみビルドされること', async () => {
    await fs.remove(dir)
    execAsync(
      `node ./bin/index.js watch --only-pattern --app mock/index.html --open false --out-dir ${dir}`
    )

    await waitOn({
      resources: [`${dir}/pattern.html`],
      timeout: 4000
    })

    const existsMockHtml = await fs.pathExists(`${dir}/mock.html`)

    assert(!existsMockHtml)
  })
})
