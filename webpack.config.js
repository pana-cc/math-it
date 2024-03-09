const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
    entry: './index.ts',
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Math Generator',
            template: "index.html",
            filename: "index.html"
        }),
    ],
    devtool: 'source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, argv.mode === 'production' ? 'docs' : 'dist'),
        clean: true,
    },
});