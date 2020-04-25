const cli = require('cli');

// Dangerous, check if all dependencies from @server-state/cbm-test-environment are installed.
// Otherwise, it may fail. -> write tests
const devServer = require('../../cbm-test-environment/scripts/dev-server');

/**
 * Starts the development server for the cbm.
 */
module.exports = function() {
    cli.debug("Start the cbm development server");

    // generate new paths
    const genPaths = require('../configs/genPaths');
    const paths = genPaths(process.cwd());

    // start the development server
    devServer(paths.appRoot);
};
