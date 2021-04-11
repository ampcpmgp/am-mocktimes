const path = require('path')

module.exports = {
  filePath: path.join(process.cwd(), 'mock/testbed/mock.html'),
  src: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
  </head>
  <body>
    App
    <script src="./mock.js"></script>
  </body>
</html>
`,
}
