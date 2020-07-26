const debug = require('debug')('test');

const { error } = require('../lib/logger');

const command = ['test [options]', 't'];
const desc = 'Tests the front-end module with unit tests';

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
