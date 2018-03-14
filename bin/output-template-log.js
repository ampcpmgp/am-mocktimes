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
`)
}
