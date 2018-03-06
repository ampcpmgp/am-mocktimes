const Const = require('./const')
const {
  MOCK_HTML,
  PATTERN_JS
} = Const

module.exports = (appFile) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <app-root></app-root>
    ${appFile
    ? (
      `<!-- don't remove next line, until parcel support multiple entry points. -->
    <a href="${MOCK_HTML}" data-am-coffee-time-path style="display: none;"></a>`
    )
    : ''}
    <script src="${PATTERN_JS}" charset="utf-8"></script>
  </body>
</html>
`
}
