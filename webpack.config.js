const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/pages/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        // добавьте объект options
                        options: { importLoaders: 1 }
                    },
                    "postcss-loader"
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource",
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             esModule: false,
                //         }
                //     },
                // ],
            },
        ],
    },
};
