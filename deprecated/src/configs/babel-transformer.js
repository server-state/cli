const { transform } = require('@babel/core');
const envPreset = require('@babel/preset-env');
const reactPreset = require('@babel/preset-react');

/**
 * Generates a transform process for Jest testing.
 * Based on: https://jestjs.io/docs/en/tutorial-react#custom-transformers
 * @type {{process(*=, *): (string | null | undefined)}}
 */
module.exports = {
    process(src, filename) {
        const result = transform(src, {
            filename,
            presets: [envPreset, reactPreset]
        });

        return result ? result.code : src;
    }
};