const { describe, it, before } = require('kocha')
const waitOn = require('wait-on')
const fs = require('fs-extra')
const util = require('util')
const { exec } = require('child_process')

const execAsync = util.promisify(exec)

describe('screenshot', () => {
  const url = 'http://localhost:1234/.am-mocktimes/pattern.html'

  before(async () => {
    const waitServer = new Promise((resolve, reject) => {
      waitOn(
        {
          resources: [url],
          timeout: 2000
        },
        err => {
          if (err) {
            reject(err)
          } else resolve()
        }
      )
    })

    try {
      await waitServer
    } catch (error) {
      throw new Error(error.message)
    }
  })

  it('画像フォルダ内が空っぽになり、新規画像が撮られていること', async () => {
    const job = execAsync(`node ./bin screenshot --url ${url}`)
    const imgDir = './am-mocktimes-img'

    // 画像削除の確認
    const checkIfImgFilesRemoved = new Promise((resolve, reject) => {
      const timeout = 5000
      const now = Date.now()

      const intervalId = setInterval(async () => {
        const files = await fs.readdir(imgDir)
        const isEmpty = files.length === 0

        if (isEmpty) {
          clearInterval(intervalId)
          resolve()
        }

        const elapsedTime = Date.now() - now
        if (elapsedTime > timeout) {
          reject(new Error('timeout'))
        }
      }, 100)
    })

    try {
      await checkIfImgFilesRemoved
    } catch (error) {
      throw new Error('画像ファイルの削除が確認できません。')
    }

    // 新規画像が撮られていることの確認
    const checkIfImgFilesExists = new Promise((resolve, reject) => {
      const timeout = 5000
      const now = Date.now()

      const intervalId = setInterval(async () => {
        const files = await fs.readdir(imgDir)
        const isEmpty = files.length === 0

        if (!isEmpty) {
          clearInterval(intervalId)
          resolve()
        }

        const elapsedTime = Date.now() - now
        if (elapsedTime > timeout) {
          reject(new Error('timeout'))
        }
      }, 100)
    })

    try {
      await checkIfImgFilesExists
    } catch (error) {
      throw new Error('新規画像が撮られていることを確認できません。')
    }

    try {
      await job
    } catch (error) {
      throw new Error('job error')
    }
  })
})
