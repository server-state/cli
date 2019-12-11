const path = require('path');
const cli = require('cli');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./config/webpack.config');
const webServerConfig = require('./config/webpackDevServer.config');

const clearConsole = require('./utils/clear-console');
const createCompiler = require('./utils/create-compiler');

const isInteractive = process.stdout.isTTY;
const HOST = '127.0.0.1';
const PORT = 3001;
const cwd = path.resolve(process.cwd());

module.exports = function() {
    cli.debug('AppRoot: ' + cwd);

    // built in with Webpack Compiler
    // cli.debug('Check existence of required files');
    // if (!fs.existsSync(paths.testEnvironmentJS)) {
    //     cli.fatal('Missing entry file: ' + paths.testEnvironmentJS);
    // }
    // if (!fs.existsSync(paths.testEnvironmentHTML)) {
    //     cli.fatal('Missing entry file: ' + paths.testEnvironmentHTML);
    // }
    // cli.ok('Found all required files');

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
            console.log('\x1b[1;31m%s\x1b[0m', 'Can not compile.');
            console.log(err);
        }
        if (isInteractive) {
            clearConsole();
        }

        console.log('\x1b[1;33m%s\x1b[0m', 'Starting CBM test environment ...');
    });
};