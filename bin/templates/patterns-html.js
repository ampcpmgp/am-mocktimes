const path = require("path");

module.exports = {
  filePath: path.join(process.cwd(), "mock/testbed/index.html"),
  src: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>am-mocktimes Pattern List</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./index.js"></script>
  </body>
</html>
`,
};
