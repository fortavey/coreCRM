let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let HTMLWebpackPlugin = require("html-webpack-plugin");
let {CleanWebpackPlugin} = require("clean-webpack-plugin");

let conf = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/",
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "."),
        },
        proxy: {
            "/core/wp-admin": {
                target: "http://localhost:8888",
                logLevel: "debug",
                changeOrigin: true,
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        new HTMLWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
    ],
};

module.exports = (env, options) => {
    let isProd = options.mode === "production";
    conf.devtool = isProd ? false : "eval-cheap-module-source-map";
    conf.output.filename = isProd ? "[contenthash].[name].js" : "main.js";
    return conf;
};
