module.exports = scriptSrc => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    App
    <script src="${scriptSrc}"></script>
  </body>
</html>`
}
