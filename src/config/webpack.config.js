const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const cwd = path.resolve(process.cwd());

module.exports = {
    mode: 'development',
    entry: {
        main: require.resolve('@server-state/cbm-test-environment')
    },
    output: {
        filename: 'bundle.js',
        path: path.join(cwd, 'dist'), // temporary dist folder in user repo
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // exclude: /node_modules/,  // that is important for replacement of magic vars in test env
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { modules: false }],
                            '@babel/preset-react'
                        ],
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2|jpg|jpeg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8000,
                        name: `[name].[hash].[ext]`
                    }
                }
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(path.dirname(require.resolve('@server-state/cbm-test-environment')), 'public/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __CBMPATH__: JSON.stringify(path.join(cwd, 'src/index.js')),
            __SAMPLESPATH__: JSON.stringify(path.join(cwd, 'src/sample-data.js'))
        })
    ]
};