const debug = require('debug')('build');

const { error } = require('../lib/logger');

const command = ['build [options]', 'b'];
const desc = 'Builds the front-end module into the transportable .fem format';

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
