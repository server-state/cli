const path = require('path');

// mocking of paths.js module to point paths to static test objects
const paths = jest.genMockFromModule('../paths');

const appRoot = path.resolve('./tests/test-cbm-root');
const moduleRoot = path.resolve('./');

const testEnvironment = path.join(moduleRoot, 'test-environment');
const appSrc = path.join(appRoot, 'src');

const testEnvironmentJS = path.join(testEnvironment, 'index.js');
const testEnvironmentHTML = path.join(testEnvironment, 'public/index.html');
const testEnvironmentContentBase = path.join(testEnvironment, 'public');

const appSrcJS = path.join(appSrc, 'index.js');

const outputPath = path.join(appRoot, 'dist/');

const pathsMocked = {
    appRoot,
    moduleRoot,
    testEnvironment,
    testEnvironmentJS,
    testEnvironmentHTML,
    testEnvironmentContentBase,
    appSrcJS,
    outputPath
};
const pathsNew = Object.assign({}, paths, pathsMocked);

module.exports = pathsNew;