const chalk = require('chalk');

function info(...messages) {
  console.log(chalk.blue.bold('INFO:'), messages.shift());
  messages.forEach((message) => console.log('     ', message));
}

function success(...messages) {
  console.log(chalk.green.bold('SUCCESS:'), messages.shift());
  messages.forEach((message) => console.log('         ', message));
}

function warn(...messages) {
  console.log(chalk.yellow.bold('WARN:'), messages.shift());
  messages.forEach((message) => console.log('     ', message));
}

function error(...messages) {
  console.log(chalk.red.bold('ERROR:'), messages.shift());
  messages.forEach((message) => console.log('      ', message));
}

function fatal(...messages) {
  console.log(
    chalk.white.bgRed.bold('FATAL:'),
    chalk.white.bold(messages.shift())
  );
  messages.forEach((message) => console.log('      ', message));
  process.exit(1);
}

module.exports = {
  info,
  warn,
  error,
  fatal,
};
