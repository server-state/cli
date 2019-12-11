const path = require('path');

const appRoot = path.resolve(process.cwd());
const moduleRoot = path.dirname(require.resolve('@server-state/cbm-cli/package.json'));

const testEnvironment = path.join(moduleRoot, 'test-environment');

const testEnvironmentJS = path.join(testEnvironment, 'index.js');
const testEnvironmentHTML = path.join(testEnvironment, 'public/index.html');
const testEnvironmentContentBase = path.join(testEnvironment, 'public');

const appSrc = path.join(appRoot, 'src');
const appSrcJS = path.join(appSrc, 'index.js');
const appSamples = path.join(appSrc, 'sample-data.js');

const appTest = path.join(appRoot, 'tests');
const appBuildConfig = path.join(appRoot, 'webpack.config.js');

const outputPath = path.join(appRoot, 'dist/');

module.exports = {
    appRoot,
    moduleRoot,
    testEnvironment,
    testEnvironmentJS,
    testEnvironmentHTML,
    testEnvironmentContentBase,
    appSrc,
    appSrcJS,
    appSamples,
    appTest,
    appBuildConfig,
    outputPath
};