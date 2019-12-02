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
const options = cli.parse({}, commands);

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
        require('../scripts/test')(options, args);
        break;
    default:
        cli.error('Undefined command.');
}
//
// const script = process.argv.slice(2)[0];
//
// if (['build', 'start', 'test', 'test-cli'].includes(script)) {
//     const returnValue = require('../scripts/' + script)() || 0;
//     process.exit(returnValue);
// } else {
//     console.log('Unknown script: ' + script);
//     console.log('Valid options are: \'build\', \'start\', \'test\', \'test-cli\'');
// }