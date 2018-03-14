module.exports = () => {
  console.log(`以下ファイルを生成しました

# モック
mock/
  pattern.yml # モックパターン設定用
  config.js # アプリケーションモック設定用

# アプリケーション本体
src/
  index.html
  app.js

## docs
mock/pattern.yml:  https://github.com/ampcpmgp/am-coffee-time#config-mockpatternyml
mock/config.js:  https://github.com/ampcpmgp/am-coffee-time#config-mockconfigjs
`)
}
