#!/usr/bin/env node
const cli = require('cli');

const packageJSON = require('../package.json');
const commands = {
    'init': 'Initialize a new server base module and/or a client base module',
    'build': 'Build the client base module for production use',
    'start': 'Build the client base module and start the development server',
    'test': 'Start the unit test with defined tests',
    'test-e2e': 'Start the e2e test with cypress and defined tests'
};

cli.enable('status', 'version', 'status');
cli.setApp(Object.keys(packageJSON.bin)[0], packageJSON.version);
const options = cli.parse(null, commands);

const { command, args } = cli;

switch (command.toLowerCase()) {
    case 'init':
        require('./init')(options, args);
        break;
    case 'build':
        require('./build')(options, args);
        break;
    case 'start':
        require('./start')(options, args);
        break;
    case 'test':
        require('./test')(options, args);
        break;
    case 'test-e2e':
        require('./test-e2e')(options, args);
        break;
    default:
        cli.fatal('Undefined command: ' + command);
}
