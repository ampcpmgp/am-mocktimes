const Const = require('./const')
const { PATH_ATTR, TARGET_ATTR } = require('../../src/const/dom')
const { PATTERN_JS } = Const

module.exports = (mockPath, target) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <app-root></app-root>
    <script src="${PATTERN_JS}"
      charset="utf-8"
      ${PATH_ATTR}="${mockPath}"
      ${TARGET_ATTR}="${target}"
      >
    </script>
  </body>
</html>
`
}
