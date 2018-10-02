const { describe, it, before } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const assert = require('assert')
const util = require('util')
const { exec } = require('child_process')

const execPromise = util.promisify(exec)

describe('watch & screenshot', () => {
  before(async () => {
    execPromise(
      'node ./bin watch -a mock/index.html --ss mock/sample-app/index.html --no-open'
    )

    return new Promise((resolve, reject) => {
      waitOn(
        {
          resources: ['http://localhost:1234/.am-mocktimes/pattern.html']
        },
        err => {
          if (err) reject(err)
          else resolve()
        }
      )
    })
  })

  it('画像フォルダ内が空っぽになり、新規画像が撮られていること', async () => {
    const job = execPromise(
      'node ./bin screenshot --url http://localhost:1234/.am-mocktimes/pattern.html'
    )
    let isRemovedImgFiles = false
    let isCapturedImgFiles = false

    // 画像削除の確認
    const checkIfImgFilesRemoved = () => {
      const intervalId = setInterval(() => {
        const files = fs.readdirSync('./am-mocktimes-img')
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
        const files = fs.readdirSync('./am-mocktimes-img')
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
