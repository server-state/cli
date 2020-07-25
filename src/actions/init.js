const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const debug = require('debug')('init');

const { info, error, fatal } = require('../lib/logger');

const typeChoices = ['sm', 'fem'];

const command = ['init [type] [name]', 'i'];
const desc = 'Initializes a new module for the server state project';

function builder(yargs) {
  return yargs
    .option('type', {
      alias: 't',
      describe: 'Type of the new module',
      choices: typeChoices,
    })
    .option('name', {
      alias: 'n',
      describe: 'Name for new module',
      type: 'string',
    });
}

async function handler(argv) {
  debug('Arguments:', argv);
  if (!argv['type']) {
    try {
      const answers = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: 'Which module type you would like to develop?',
        choices: typeChoices,
      });
      debug('Inquirer type answers:', answers);
      argv['type'] = answers['type'];
    } catch (error) {
      if (error.isTtyError) {
        fatal('Prompt could not be rendered in the current environment');
      }
      throw error;
    }
  }

  if (!argv['name']) {
    try {
      const answers = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "What's the name of your new module?",
        validate: (input) => {
          if (!input) return 'Please provide a name for your module';
          return true;
        },
      });
      debug('Inquirer name answers:', answers);
      argv['name'] = answers['name'];
    } catch (error) {
      if (error.isTtyError) {
        fatal('Prompt could not be rendered in the current environment');
      }
      throw error;
    }
  }

  const moduleType = argv['type'];
  const moduleName = argv['name'];
  const installPath = path.join(process.cwd(), moduleName);
  info('Your module will be installed to:', installPath);

  if (fs.existsSync(installPath)) {
    error(
      'The module installation path already exists.',
      'Please remove any files from the installation path before continue.'
    );
    process.exit(1);
  }

  error('Not implemented');
}

module.exports = {
  command,
  desc,
  builder,
  handler,
};
