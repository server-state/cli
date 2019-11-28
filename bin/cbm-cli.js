#!/usr/bin/env node

const script = process.argv.slice(2)[0];

if (['build', 'start', 'test', 'test-cli'].includes(script)) {
    const returnValue = require('../scripts/' + script)() || 0;
    process.exit(returnValue);
} else {
    console.log('Unknown script: ' + script);
    console.log('Valid options are: \'build\', \'start\', \'test\', \'test-cli\'');
}