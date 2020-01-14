const path = require('path');
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
                presets: [ '@babel/preset-env', '@babel/preset-react' ]
            }),
            terser()
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
