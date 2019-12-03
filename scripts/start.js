const fs = require('fs');
const cli = require('cli');
const WebpackDevServer = require('webpack-dev-server');

const paths = require('../configs/paths');
const webpackConfig = require('../configs/webpack.config');
const webServerConfig = require('../configs/webpackDevServer.config');

const clearConsole = require('./utils/clear-console');
const createCompiler = require('./utils/create-compiler');

const isInteractive = process.stdout.isTTY;
const HOST = '127.0.0.1';
const PORT = 3001;

module.exports = function() {
    cli.debug('AppRoot: ' + paths.appRoot);
    cli.debug('AppSrc: ' + paths.appSrc);
    cli.debug('ModuleRoot: ' + paths.moduleRoot);


    cli.debug('Check existence of required files');
    if (!fs.existsSync(paths.testEnvironmentJS)) {
        cli.fatal('Missing entry file: ' + paths.testEnvironmentJS);
    }
    if (!fs.existsSync(paths.testEnvironmentHTML)) {
        cli.fatal('Missing entry file: ' + paths.testEnvironmentHTML);
    }
    cli.ok('Found all required files');

    cli.debug('Create webpack compiler');
    cli.debug('Webpack config: ' + JSON.stringify(webpackConfig, null, 2));
    const compiler = createCompiler(webpackConfig);
    cli.ok('Webpack compiler created');

    cli.debug('Create webpack dev server');
    cli.debug('Webpack dev server config: ' + JSON.stringify(webServerConfig, null, 23));
    const devServer = new WebpackDevServer(compiler, webServerConfig);
    cli.ok('Webpack dev server created');

    cli.debug('Start debug server');
    devServer.listen(PORT, HOST, err => {
        if (err) {
            clearConsole();
        }
        if (isInteractive) {
            console.log('\033[2J'); // clears console
        }

        console.log('\x1b[1;33m%s\x1b[0m', 'Starting CBM test environment ...');
    });
};