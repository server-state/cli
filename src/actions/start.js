const debug = require('debug')('start');

const { error } = require('../lib/logger');

const command = ['start [options]', 's'];
const desc =
	'Starts the FEM test environment and compiles the front-end module in the current project';

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
