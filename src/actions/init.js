const path = require('path');
const fs = require('fs');
const tmp = require('tmp');
const debug = require('debug')('init');
const inquirer = require('inquirer');
const { Spinner } = require('clui');

const { info, success, error, fatal } = require('../lib/logger');

const normalize = require('../lib/normalizeModuleName');
const downloadFile = require('../lib/downloadFile');
const extractIntoDir = require('../lib/extractIntoDir');
const editPackageJSON = require('../lib/editPackageJSON');
const exec = require('../lib/asyncExec');
const deleteDir = require('../lib/deleteDirRecursive');
const printEpilogue = require('../lib/printEpilogue');

const spinner = new Spinner('', ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']);

const serverModule = ['sm', 'Server Module'];
const frontendModule = ['fem', 'Front-end Module'];

const installCommand = 'npm ci';

// yargs defs
const command = ['init [type] [name]', 'i'];
const desc = 'Initializes a new module for the server state project';

function builder(yargs) {
	return yargs
		.option('type', {
			alias: 't',
			describe: 'Type of the new module',
			choices: [...serverModule, ...frontendModule],
		})
		.option('name', {
			alias: 'n',
			describe: 'Name for new module',
			type: 'string',
		})
		.option('template', {
			alias: 'd',
			describe: 'URL to download the module template from',
			type: 'string',
		})
		.option('keep', {
			alias: 'k',
			describe: 'Keeps the module directory on errors',
			type: 'boolean',
			default: false,
		});
}

async function handler(argv) {
	// gathering information
	debug('Arguments:', argv);
	if (!argv['type']) {
		try {
			const answers = await inquirer.prompt({
				type: 'list',
				name: 'type',
				message: 'Which module type you would like to develop?',
				choices: [serverModule[1], frontendModule[1]],
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
					if (input !== path.basename(input))
						return 'Please provide a valid name for your module';
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
	const moduleName = normalize(argv['name']);
	const modulePath = path.join(process.cwd(), moduleName);
	let downloadURL = argv['template'];

	if (!downloadURL) {
		switch (moduleType) {
			case serverModule[0]:
			case serverModule[1]:
				downloadURL =
					'https://codeload.github.com/server-state/template-module/zip/master';
				break;
			case frontendModule[0]:
			case frontendModule[1]:
				downloadURL =
					'https://codeload.github.com/server-state/template-cbm/zip/master';
				break;
			default:
				error(
					'Invalid module type.',
					'Please open an issue to help to fix this error:',
					'https://github.com/server-state/cli/issues'
				);
		}
	}

	// setup
	info('Your module will be installed to:', modulePath);

	if (fs.existsSync(modulePath)) {
		error(
			'The module installation path already exists.',
			'Please remove any files from the installation path before continue.'
		);
		process.exit(1);
	}

	debug('Generating temporary file for download and extract');
	const tmpFile = tmp.fileSync();
	debug('File name:', tmpFile.name);
	debug('File descriptor:', tmpFile.fd);

	try {
		// download template
		spinner.message('Download template ...');
		spinner.start();
		await downloadFile(downloadURL, tmpFile.fd);
		spinner.stop();
		info('Template downloaded');

		// extract template into new module
		info('Setup module ...');
		debug('Extracting downloaded archive');
		await extractIntoDir(tmpFile.name, modulePath);

		// edit package.json in new module
		debug('Edit package.json');
		const changes = {
			name: moduleName,
		};
		editPackageJSON(modulePath, changes);

		// install dependencies in new project
		spinner.message('Installing dependencies ...');
		spinner.start();
		debug('Exec command:', installCommand);
		await exec(installCommand, { cwd: modulePath });
		spinner.stop();
		info('Dependencies installed');
	} catch (err) {
		spinner.stop();
		error(err);

		debug('Clean up dirty state');
		tmpFile.removeCallback();
		if (!argv['keep']) deleteDir(modulePath);

		process.exit(1);
	}

	debug('Clean up temporary files');
	tmpFile.removeCallback();

	// print epilogue
	success('Module initialized');
	printEpilogue(moduleType, serverModule, moduleName, modulePath);
}

module.exports = {
	command,
	desc,
	builder,
	handler,
};
