const path = require('path');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');

module.exports = {
    /**
     * Generates the input options file for rollup.
     * @param paths dynamic generated paths object
     * @returns {{input: string, external: [string, string, string, string, string], plugins: [*, Plugin]}} input options
     */
    genInputOptions: (paths) => ({
        external: ['react', 'prop-types', '@material-ui/core', '@material-ui/styles', '@material-ui/icons'],
        input: paths.appSrcIndex,
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: [ '@babel/preset-env', '@babel/preset-react' ]
            }),
            resolve(),
            commonjs(),
            terser(),
        ]
    }),

    /**
     * Generates the output options file for rollup.
     * @param paths dynamic generated paths object
     * @returns {{file: *, format: string}} output options
     */
    genOutputOptions: (paths) => ({
        file: path.join(paths.appRoot, require(paths.appPkg).main),
        format: 'cjs'
    })
};
