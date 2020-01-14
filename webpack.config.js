const webpack = require('webpack');

// noinspection WebpackConfigHighlighting
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: __dirname,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })
    ],
    externals: {
        'cli': 'cli',
        'jest': 'jest',
        'chalk': 'chalk',
        'webpack': 'webpack',
        'webpack-dev-server': 'webpack-dev-server',
        'html-webpack-plugin': 'html-webpack-plugin',
        'rollup': 'rollup',
        'rollup-plugin-babel': 'rollup-plugin-babel',
        'rollup-plugin-terser': 'rollup-plugin-terser',
        'react': 'commonjs react',
        'react-dom': 'react-dom',
        'prop-types': 'prop-types',
        '@material-ui/core': '@material-ui/core',
        '@material-ui/styles': '@material-ui/styles',
        '@material-ui/icons': '@material-ui/icons'
    },
    // weird hack based on:
    // https://github.com/webpack-contrib/css-loader/issues/447
    node: {
        fs: 'empty'
    }
};
