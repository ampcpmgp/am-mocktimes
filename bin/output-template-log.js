module.exports = () => {
  console.log(`
以下のファイルを生成しました

# モック
mock/
  pattern.yml # モック一覧画面/設定用
  config.js # アプリケーションモック/設定用

# アプリケーション本体
src/
  index.html
  app.js

## docs
mock/pattern.yml:  https://github.com/ampcpmgp/am-mocktimes#config-mockpatternyml
mock/config.js:  https://github.com/ampcpmgp/am-mocktimes#config-mockconfigjs
`)
}
