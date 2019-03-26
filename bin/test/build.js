const { describe, it } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const util = require('util')
const assert = require('assert')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)
const dir = '.test/build'

describe('build', () => {
  it('ビルドファイルが生成されること', async () => {
    await fs.remove(dir)

    execAsync(
      `node ./bin/index.js build --app mock/index.html --public-url . --out-dir ${dir}`
    )

    await waitOn({
      resources: [`${dir}/mock.html`],
      timeout: 4000
    })

    const existsMockHtml = await fs.pathExists(`${dir}/mock.html`)

    assert(existsMockHtml)
  })
})
