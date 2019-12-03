const cli = require('cli');
const jest = require('jest');

module.exports = function(options, args) {
    cli.debug('Start jest test');

    // generate args for jest with given options (parsed down initially)
    const argv = [];
    for (const elem in options) {
        argv.push('--' + elem);
    }
    // start jest environment
    jest.run(argv)
        .then(() => cli.ok('Jest exited successfully.'))
        .catch(err => cli.error('Jest exited with error: ' + err));
};