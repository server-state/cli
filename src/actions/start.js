// Dangerous, check if all dependencies from @server-state/cbm-test-environment are installed.
// Otherwise, it may fail.
const devServer = require('../../cbm-test-environment/scripts/dev-server');

module.exports = function(paths) {
    devServer(paths.appRoot);
};
