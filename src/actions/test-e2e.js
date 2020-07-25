const debug = require('debug')('test-e2e');

const { error } = require('../lib/logger');

const command = ['test-e2e [options]', 'e'];
const desc = 'Tests the front-end module with end-to-end tests';

function builder(yargs) {
  return yargs.option('path', {
    alias: 'p',
    describe: 'Path to front-end module root',
  });
}

async function handler(argv) {
  debug('Arguments:', argv);
  error('Not implemented');
}

module.exports = {
  command,
  desc,
  builder,
  handler,
};
