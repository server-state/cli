const inquirer = require('inquirer');
const debug = require('debug')('eject');

const { error, fatal } = require('../lib/logger');

const command = ['eject [options]', 's'];
const desc =
  'Ejects all configurations and the test environment into the front-end module project';

function builder(yargs) {
  return yargs.option('path', {
    alias: 'p',
    describe: 'Path to front-end module root',
  });
}

async function handler(argv) {
  debug('Arguments:', argv);

  try {
    const answers = await inquirer.prompt({
      type: 'confirm',
      name: 'eject',
      message:
        'Would you really want to eject the server-state cli into your project?',
      default: false,
    });
    debug('Inquirer answers:', answers);
    if (!answers['eject']) return;
  } catch (error) {
    if (error.isTtyError) {
      fatal('Prompt could not be rendered in the current environment');
    }
    throw error;
  }

  error('Not implemented');
}

module.exports = {
  command,
  desc,
  builder,
  handler,
};
