const path = require('path');

const appRoot = path.resolve(process.cwd());
const moduleRoot = path.dirname(require.resolve('@server-state/cbm-cli/package.json'));

const testEnvironment = path.join(moduleRoot, 'test-environment');
const appSrc = path.join(appRoot, 'src');

const testEnvironmentJS = path.join(testEnvironment, 'index.js');
const testEnvironmentHTML = path.join(testEnvironment, 'public/index.html');
const testEnvironmentContentBase = path.join(testEnvironment, 'public');

const appSrcJS = path.join(appSrc, 'index.js');
const appSamples = path.join(appSrc, 'sample-data.js');

const outputPath = path.join(appRoot, 'dist/');

module.exports = {
    appRoot,
    appSrc,
    moduleRoot,
    testEnvironment,
    testEnvironmentJS,
    testEnvironmentHTML,
    testEnvironmentContentBase,
    appSrcJS,
    appSamples,
    outputPath
};