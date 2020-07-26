const chalk = require('chalk');

function messageChecker(message) {
	if (!process.env['DEBUG'] && message instanceof Error)
		return `${message.name}: ${message.message}`;
	return message;
}

function info(...messages) {
	console.log(chalk.blue.bold('INFO:'), messageChecker(messages.shift()));
	messages.forEach((message) => console.log('     ', messageChecker(message)));
}

function success(...messages) {
	console.log(chalk.green.bold('SUCCESS:'), messageChecker(messages.shift()));
	messages.forEach((message) =>
		console.log('         ', messageChecker(message))
	);
}

function warn(...messages) {
	console.log(chalk.yellow.bold('WARN:'), messageChecker(messages.shift()));
	messages.forEach((message) => console.log('     ', messageChecker(message)));
}

function error(...messages) {
	console.log(chalk.red.bold('ERROR:'), messageChecker(messages.shift()));
	messages.forEach((message) => console.log('      ', messageChecker(message)));
}

function fatal(...messages) {
	console.log(
		chalk.white.bgRed.bold('FATAL:'),
		chalk.white.bold(messageChecker(messages.shift()))
	);
	messages.forEach((message) => console.log('      ', messageChecker(message)));
	process.exit(1);
}

module.exports = {
	info,
	success,
	warn,
	error,
	fatal,
};
