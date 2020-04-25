const path = require('path');
const cli = require('cli');

/**
 * Generates the Jest configuration file later passed to Jest.
 * @returns {{transform: {"^.+\\.(js|jsx)$": string}}} Jest configuration object
 */
module.exports = function () {
    // generate the babel transformer path
    const babelTransformerPath = path.join(__dirname, '../configs/babel-transformer.js');
    cli.debug('babelTransformerPath: ' + babelTransformerPath);

    return ({
        // https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/scripts/utils/createJestConfig.js
        transform: {
            '^.+\\.(js|jsx)$': babelTransformerPath}
    });
};
