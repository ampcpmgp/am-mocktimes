#!/usr/bin/env node
const argv = require('yargs').command(
  'generate-template',
  'Generate template files. Mock and application sources.',
  {}
).argv

const [command] = argv._

switch (command) {
  case 'generate-template':
    require('./generate-template')(argv)
    break
  default:
    throw new Error(`command not find: '${command}'`)
}
