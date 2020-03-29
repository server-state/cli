const path = require('path');
const cli = require('cli');

const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
const serverStateCBM = require('./rollup-plugin-server-state-cbm');

const BUILD_FILE_NAME = 'index';
const BUILD_FILE_ENDING = 'cbm';

module.exports = {
    /**
     * Generates the input options file for rollup.
     * @param paths dynamic generated paths object
     * @returns {{input: string, external: [string, string, string, string, string], plugins: [*, Plugin]}} input options
     */
    genInputOptions: (paths) => {
        const packageJSON = require(paths.appPkg);
        let input = '';

        // allow overwriting rollup entry file with the main key in the package.json
        if (typeof packageJSON.main === 'string') {
            input = path.resolve(packageJSON.main);
        } else {
            cli.debug('\'main\' is not specified or not of type \'string\' in package.json. Using default path.');
            input = paths.appSrcIndex;
        }

        // noinspection JSUnusedGlobalSymbols
        return ({
            external: ['react', 'prop-types', '@material-ui/core', '@material-ui/styles', '@material-ui/icons'],
            input,
            plugins: [
                resolve(),
                babel({
                    exclude: 'node_modules/**',
                    presets: [ '@babel/preset-env', '@babel/preset-react' ]
                }),
                commonjs({
                    namedExports: {
                        // add not found but there exports here
                        // see also: https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
                        'node_modules/react-dom/index.js': [ 'createPortal', 'findDOMNode' ]
                    }
                })
            ],
            onwarn ({ loc, frame, message }) {
                if (loc) {
                    cli.error(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
                    if (frame) console.warn(frame);
                } else {
                    cli.error(message);
                }
            }
        });
    },

    /**
     * Generates the output options file for rollup.
     * @param paths dynamic generated paths object
     * @returns {{file: *, format: string}} output options
     */
    genOutputOptions: (paths) => {
        const packageFilter = [ 'id', 'name', 'description', 'version' ];
        const packageJSON = require(paths.appPkg);

        // filter useful information out of cbm package.json
        const cbmInfos = Object.keys(packageJSON)
            .filter(key => packageFilter.includes(key))
            .reduce((obj, key) => {
                obj[key] = packageJSON[key];
                return obj;
            }, {});

        // convert non identical information to specification
        cbmInfos['support_url'] = packageJSON.bugs || null;
        cbmInfos['website'] = packageJSON.homepage || null;

        cbmInfos['repo_url'] = packageJSON.repository && packageJSON.repository.url
            ? packageJSON.repository.url.split('+')[1] || null
            : null;

        // additional debug output
        cli.debug('Extracted cbmInfos: ' + JSON.stringify(cbmInfos, null, 2));

        return ({
            file: path.join(paths.appRoot, BUILD_FILE_NAME + '.' + BUILD_FILE_ENDING),
            format: 'cjs',
            plugins: [
                terser(),
                serverStateCBM(cbmInfos)
            ]
        });
    }
};
