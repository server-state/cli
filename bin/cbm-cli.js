#!/usr/bin/env node
const cli = require('cli');

const packageJSON = require('../package.json');
const commands = {
    'build': 'Build the client base module for production use',
    'start': 'Build the client base module and start the development server',
    'test': 'Start the unit test with defined tests',
    'test-cli': 'Start the e2e test with cypress and defined tests'
};

cli.enable('status', 'version', 'status');
cli.setApp(packageJSON.name, packageJSON.version);
const options = cli.parse(null, commands);

const { command, args } = cli;

switch (command.toLowerCase()) {
    case 'build':
        require('../scripts/build')(options, args);
        break;
    case 'start':
        require('../scripts/start')(options, args);
        break;
    case 'test':
        require('../scripts/test')(options, args);
        break;
    case 'test-cli':
        require('../scripts/test-cli')(options, args);
        break;
    default:
        cli.fatal('Undefined command: ' + command);
}
