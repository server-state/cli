const path = require('path');

// noinspection WebpackConfigHighlighting,WebpackConfigHighlighting,WebpackConfigHighlighting,WebpackConfigHighlighting,WebpackConfigHighlighting,WebpackConfigHighlighting,WebpackConfigHighlighting
module.exports = {
    // log messages
    noInfo: true,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    overlay: true,

    // server configuration
    compress: true,
    hot: true,
    contentBase: path.join(path.dirname(require.resolve('@server-state/cbm-test-environment')), 'public'),
    publicPath: '/'
};