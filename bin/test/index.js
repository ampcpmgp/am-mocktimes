const { describe, it } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const assert = require('assert')
const util = require('util')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)

describe('watch & screenshot', () => {
  it('画像フォルダ内が空っぽになり、新規画像が撮られていること', async () => {
    const waitServer = new Promise((resolve, reject) => {
      waitOn(
        {
          resources: ['http://localhost:1234/.am-mocktimes/pattern.html'],
          timeout: 2000
        },
        err => {
          if (err) {
            assert(
              0,
              'サーバーを起動(npm start)した状態で、テストを回してください。'
            )
            reject(err)
          } else resolve()
        }
      )
    })

    await waitServer

    const job = execAsync(
      'node ./bin screenshot --url http://localhost:1234/.am-mocktimes/pattern.html'
    )
    const imgDir = './am-mocktimes-img'
    let isRemovedImgFiles = false
    let isCapturedImgFiles = false

    // 画像削除の確認
    const checkIfImgFilesRemoved = () => {
      const intervalId = setInterval(async () => {
        const files = await fs.readdir(imgDir)
        const isEmpty = files.length === 0

        if (isEmpty) {
          isRemovedImgFiles = true
          clearInterval(intervalId)
          checkIfImgFilesExists()
        }
      }, 100)
    }

    // 新規画像が撮られていることの確認
    const checkIfImgFilesExists = () => {
      const intervalId = setInterval(() => {
        const files = fs.readdirSync(imgDir)
        const isEmpty = files.length === 0

        if (!isEmpty) {
          isCapturedImgFiles = true
          clearInterval(intervalId)
        }
      }, 100)
    }

    checkIfImgFilesRemoved()

    await job

    assert(isRemovedImgFiles && isCapturedImgFiles)
  })
})
