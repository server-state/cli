const path = require('path');
const chalk = require('chalk');

function printEpilogue(moduleType, serverModule, moduleName, modulePath) {
	if (serverModule.includes(moduleType)) {
		console.log();
		console.log(
			`Your ${chalk.bold('server module')} is installed and ready to go at:`
		);
		console.log(`  ${chalk.blue(modulePath)}`);
		console.log();

		console.log(`  ${chalk.green('npm run lint')}`);
		console.log('    Lints your source files.');
		console.log();

		console.log(`  ${chalk.green('npm run build')}`);
		console.log(
			'    Minifies and bundles the server module into a single file'
		);
		console.log();

		console.log(`  ${chalk.green('npm run test')}`);
		console.log('    Starts the test runner.');
		console.log();
	} else {
		console.log();
		console.log(
			`Your ${chalk.bold('frontend module')} is installed and ready to go at:`
		);
		console.log(`  ${chalk.blue(modulePath)}`);
		console.log();

		console.log('Inside the directory, you can run several commands:');
		console.log();

		console.log(`  ${chalk.green('npm run start')}`);
		console.log('    Starts the frontend module test environment.');
		console.log();

		console.log(`  ${chalk.green('npm run build')}`);
		console.log('    Bundles the fem into the ready-to-publish .fem format');
		console.log();

		console.log(`  ${chalk.green('npm run test')}`);
		console.log('    Starts the test runner.');
		console.log();

		console.log(`  ${chalk.green('npm run test-e2e')}`);
		console.log('    Starts the end-to-end test runner.');
		console.log();

		console.log(`  ${chalk.green('npm run publish')}`);
		console.log(
			'    Bundles the fem into a fem-package and publish it at a given registry.'
		);
		console.log();

		console.log(`  ${chalk.green('npm run eject')}`);
		console.log('    Ejects the server-state cli into the project.');
		console.log();

		console.log('You can just start by typing:');
		console.log();

		console.log(`  ${chalk.green('cd')} ${path.basename(modulePath)}`);
		console.log(`  ${chalk.green('npm run start')}`);
		console.log();
	}

	console.log('Happy hacking!');
	console.log('Your Server State team');
}

module.exports = printEpilogue;
