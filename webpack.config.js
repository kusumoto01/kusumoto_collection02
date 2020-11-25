const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

const development = {
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0',
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 80,
        useLocalIp: true
    }
}

const analyzer = {
    plugins: [
        new BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: true
        })
    ]
}

const debug = {
    plugins: [new DuplicatePackageCheckerPlugin()]
}

const webpack = {
    entry: __dirname + '/src/index.tsx',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: [
                        ['@babel/env'],
                        ['@babel/react'],
                        ['@babel/typescript'],
                        ['@emotion/babel-preset-css-prop']
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-class-properties'],
                        ['@babel/proposal-object-rest-spread']
                    ]
                },
                test: /\.(ts|tsx)$/
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    output: {
        chunkFilename: '[contenthash].js',
        filename: '[contenthash].js',
        path: __dirname + '/build'
    },
    performance: {
        maxEntrypointSize: 614400,
        maxAssetSize: 1048576
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build']
        }),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        symlinks: false
    },
    target: 'web'
}

switch (process.env.NODE_ENV) {
    case 'development':
        module.exports = { ...development, ...webpack }
        break
    case 'production':
        module.exports = {
            ...webpack,
            plugins: [...webpack.plugins, ...analyzer.plugins]
        }
        break
    default:
        console.error('Not set to a NODE_ENV.')
}
