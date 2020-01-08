const devServer = require('../cbm-test-environment/scripts/dev-server');

module.exports = function() {
    devServer(process.cwd()); // use the default empty cbm
}