const cli = require('cli');
const rollup = require('rollup');

const { genInputOptions, genOutputOptions } = require('../configs/genRollupConfig');

/**
 * Builds the cbm based on given paths with rollup + plugins.
 * @returns {Promise<void>} empty promise?
 */
module.exports = async function() {
    cli.debug("Start build process with rollup");

    // generate new paths
    const genPaths = require('../configs/genPaths');
    const paths = genPaths(process.cwd());

    // generate required input and output options for rollup
    cli.debug("Generate input and output options for rollup");
    const inputOptions = genInputOptions(paths);
    const outputOptions = genOutputOptions(paths);

    cli.debug("Generated io options for rollup");
    cli.debug("inputOptions: " + JSON.stringify(inputOptions, null, 2));
    cli.debug("outputOptions: " + JSON.stringify(outputOptions, null, 2));

    // create rollup bundle which contains all detected files
    cli.debug("Create rollup bundle");
    const bundle = await rollup.rollup(inputOptions);

    cli.debug("Detected files:\n  " + bundle.watchFiles.join('\n  '));

    // generate code and write to defined output file
    cli.debug("Write bundle to output file: " + outputOptions.file);
    await bundle.write(outputOptions);
    cli.ok('Successfully built.');
};
