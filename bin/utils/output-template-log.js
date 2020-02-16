module.exports = () => {
  console.log(`
# モック
mock/
  mock-config.js # モック画面 - 設定ファイル
  patterns.yml # パターン一覧画面 - 設定ファイル

  testbed/
    mock.html # モック画面
    mock.js # モック画面js
    patterns.html # パターン一覧画面
    patterns.js # パターン一覧画面js

# アプリケーション本体
src/
  index.html
  main.js

## docs
mock/mock-config.js:  https://github.com/ampcpmgp/am-mocktimes#config-mockmockconfigjs
mock/patterns.yml:  https://github.com/ampcpmgp/am-mocktimes#config-mockpatternyml
`)
}
