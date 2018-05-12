const Const = require('./const')
const { PATTERN_JS } = Const

module.exports = mockPath => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <app-root></app-root>
    <script src="${PATTERN_JS}" charset="utf-8" data-am-mocktimes-path="${mockPath}"></script>
  </body>
</html>
`
}
