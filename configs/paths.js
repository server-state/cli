const path = require('path');

const appRoot = path.resolve(process.cwd());
const moduleRoot = path.resolve('../');

const testEnvironment = path.join(moduleRoot, 'test-environment');
const appSrc = path.join(appRoot, 'src');

const testEnvironmentJS = path.join(testEnvironment, 'index.js');
const testEnvironmentHTML = path.join(testEnvironment, 'public/index.html');
const testEnvironmentContentBase = path.join(testEnvironment, 'public');

const appSrcJS = path.join(appSrc, 'index.js');

const outputPath = path.join(appRoot, 'dist/');

module.exports = {
    appRoot,
    moduleRoot,
    testEnvironment,
    testEnvironmentJS,
    testEnvironmentHTML,
    testEnvironmentContentBase,
    appSrcJS,
    outputPath
};