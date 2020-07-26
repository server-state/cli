const debug = require('debug')('publish');

const { error } = require('../lib/logger');

const command = ['publish [options]', 'p'];
const desc = 'Publish a front-end module to a fem registry';

function builder(yargs) {
	return yargs
		.option('path', {
			alias: 'p',
			describe: 'Path to front-end module root',
		})
		.option('registry', {
			alias: 'r',
			describe: 'Base URL to a specific fem registry',
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
