#!/usr/bin/env node
const yargs = require('yargs')
const argv = yargs
  .command(
    'template',
    'Generate template files. Mock and application sources.',
    {
      force: {
        alias: 'f',
        describe: 'If file exists, overwrite file.',
        type: 'boolean',
        default: false,
      },
    }
  )
  .help().argv

const [command] = argv._

switch (command) {
  case 'template':
    require('./template')(argv)
    break
  default:
    yargs.showHelp()
}
