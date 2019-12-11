const paths = require('./paths');

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
    contentBase: paths.testEnvironmentContentBase,
    publicPath: '/'
};