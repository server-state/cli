#!/usr/bin/env node
const cli = require('cli');

// prepare the cli tool
const packageJSON = require('../package.json');
const commands = {
    'init': 'Initialize a new server base module and/or a client base module',
    'build': 'Build the client base module for production use',
    'start': 'Build the client base module and start the development server',
    'test': 'Start the unit test with defined tests',
    'test-e2e': 'Start the e2e test with cypress and defined tests'
};

// register package binary name and version
cli.enable('status', 'version', 'status');
cli.setApp(Object.keys(packageJSON.bin)[0], packageJSON.version);

// extract options and arguments for the following actions
const options = cli.parse(null, commands);
const { command, args } = cli;

// generate new paths
const genPaths = require('./configs/genPaths');
const paths = genPaths(process.cwd());

// execute specified command
switch (command.toLowerCase()) {
    case 'init':
        require('./actions/init')(paths, options, args);
        break;
    case 'build':
        require('./actions/build')(paths, options, args);
        break;
    case 'start':
        require('./actions/start')(paths, options, args);
        break;
    case 'test':
        require('./actions/test')(paths, options, args);
        break;
    case 'test-e2e':
        require('./actions/test-e2e')(paths, options, args);
        break;
    default:
        cli.fatal('Undefined command: ' + command);
}
