const path = require('path');

/**
 * Generates new dynamic paths required for the cli on execution.
 * @param cwd the current working directory for detecting the cbm root
 * @returns {{appSrcIndex: string, appSrc: string, appRoot: string, appPkg: string}} the generated paths
 */
module.exports = function(cwd) {
    const appRoot = path.resolve(cwd);
    const appPkg = path.join(appRoot, 'package.json');
    const appSrc = path.join(appRoot, 'src');
    const appSrcIndex = path.join(appSrc, 'index.js');

    return ({
        appRoot,
        appPkg,
        appSrc,
        appSrcIndex
    });
};
