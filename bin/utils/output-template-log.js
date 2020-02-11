module.exports = () => {
  console.log(`
以下のファイルを生成しました

# モック
mock/
  _mock.html # モック画面
  _mock.js # モック画面js
  _pattern.html # パターン一覧画面
  _pattern.js # パターン一覧画面js
  mock-config.js # モック画面 - 設定ファイル
  pattern.yml # パターン一覧画面 - 設定ファイル

# アプリケーション本体
src/
  index.html
  main.js

## docs
mock/pattern.yml:  https://github.com/ampcpmgp/am-mocktimes#config-mockpatternyml
mock/config.js:  https://github.com/ampcpmgp/am-mocktimes#config-mockconfigjs
`)
}
