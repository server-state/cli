const webpack = require('webpack');
const cli = require('cli');

const clearConsole = require('./clear-console');

const isInteractive = process.stdout.isTTY;

module.exports = function(config) {
    let compiler;
    try {
        compiler = webpack(config);
    } catch (err) {
        cli.fatal('Can not compile.');
    }

    compiler.hooks.beforeCompile.tap('invalid', () => {
        // nice user output, so no usage of cli tool
        if (isInteractive) {
            clearConsole();
        }
        console.log('\x1b[1;33m%s\x1b[0m', 'Compiling ...');
    });

    compiler.hooks.done.tap('done', stats => {
        // nice user output, so no usage of cli tool
        if (isInteractive) {
            clearConsole();
        }

        const statsRes = stats.toJson({
            all: false,
            warnings: true,
            errors: true
        });

        // nice user output, so no usage of cli tool
        if (statsRes.errors.length > 0) {
            console.log('\x1b[1;31m%s\x1b[0m', 'Can not compile.');
            console.log(JSON.stringify(statsRes.errors, null, 2));
        } else if (statsRes.warnings.length > 0) {
            console.log('\x1b[1;33m%s\x1b[0m', 'Compiled with warnings.');
            console.log(JSON.stringify(statsRes.warnings, null, 2));
        } else {
            console.log('\x1b[1;32m%s\x1b[0m', 'Successfully compiled.');
        }
    });

    return compiler;
};