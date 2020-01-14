const cli = require('cli');
const jest = require('jest');

const genJestConfig = require('../configs/genJestConfig');

module.exports = function(paths, options) {
    cli.debug('Start jest testing');

    // generate args for jest with given options (parsed down initially)
    const argv = [];
    for (const elem in options) {
        argv.push('--' + elem);
    }

    // append our self generated jest config to override possible transform issues
    argv.push('--config', JSON.stringify(
        genJestConfig()
    ));

    // start jest environment
    jest.run(argv)
        .then(() => cli.ok('Jest exited successfully.'))
        .catch(err => cli.error('Jest exited with error: ' + err));
};
