#!/usr/bin/env node
/**
 * Copyright (c) 2020, Server State
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

const debug = require('debug')('cli');
const yargs = require('yargs');

debug('Build yargs parser');
yargs
  .commandDir('../src/actions')
  .epilog(
    'For more specific information, call the help for the sub-commands:\n' +
      '$0 <command> --help\n' +
      'Or check out our project page at https://server-state.tech/'
  )
  .demandCommand()
  .recommendCommands()
  .showHelpOnFail(false, 'Specify --help for available options')
  .help()
  .parse();
