const util = require('util');
const childProcess = require('child_process');

const exec = util.promisify(childProcess.exec);

async function asyncExec(command, ...args) {
	await exec(command, ...args);
}

module.exports = asyncExec;
