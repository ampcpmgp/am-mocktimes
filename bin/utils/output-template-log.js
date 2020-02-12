module.exports = () => {
  console.log(`
# モック
mock/
  _mock.html # モック画面
  _mock.js # モック画面js
  _patterns.html # パターン一覧画面
  _patterns.js # パターン一覧画面js
  mock-config.js # モック画面 - 設定ファイル
  patterns.yml # パターン一覧画面 - 設定ファイル

# アプリケーション本体
src/
  index.html
  main.js

## docs
mock/mock-config.js:  https://github.com/ampcpmgp/am-mocktimes#config-mockconfigjs
mock/patterns.yml:  https://github.com/ampcpmgp/am-mocktimes#config-mockpatternyml
`)
}
