const cli = require('cli');
const jest = require('jest');

const genJestConfig = require('../configs/genJestConfig');

/**
 * Do unit tests with Jest.
 * @param options arguments passed to Jest
 */
module.exports = function(options) {
    cli.debug('Start unit testing with Jest');

    // generate args for jest with given options (parsed down initially)
    const argv = [];
    for (const elem in options) {
        argv.push('--' + elem);
    }

    // append the self generated jest config to override possible transform issues
    argv.push('--config', JSON.stringify(genJestConfig()));

    // start jest environment
    jest.run(argv)
        .then(() => cli.ok('Jest exited successfully.'))
        .catch(err => cli.error('Jest exited with error: ' + err));
};
