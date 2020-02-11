const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/_pattern.html'),
  src: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <app-root></app-root>
    <script src="_pattern.js"></script>
  </body>
</html>
`,
}
