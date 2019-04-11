const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const paths = require('./paths');
const packageJson = require(paths.pluginV7.packageJson);
const distFolder = path.join(paths.pluginV7.path, "/dist");

module.exports = (env, options) => {
    return {
        entry: paths.pluginV7.entry,
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: { "@plugin/core": paths.pluginV7.appSrc },
            modules: [path.resolve(paths.pluginV7.path, "node_modules")],
            symlinks: false
        },
        output: {
            path: distFolder,
            filename: `${packageJson.name}.min.js`
        },
        devtool: options.mode == "development" ? "eval-source-map" : "source-map",
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    include: paths.pluginV7.appSrc,
                    loader: require.resolve('babel-loader'),
                    options: {
                        customize: require.resolve(
                            'babel-preset-react-app/webpack-overrides'
                        ),
                        babelrc: false,
                        configFile: false,
                        presets: [require.resolve('babel-preset-react-app')],
                        plugins: [
                            [
                                require.resolve('babel-plugin-named-asset-import'),
                                {
                                    loaderMap: {
                                        svg: {
                                            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                                        },
                                    },
                                },
                            ],
                        ],
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        // cacheDirectory: true,
                        // TODO: replace with production value
                        // cacheCompression: true,
                        compact: true,
                    },
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: path.join(distFolder, "index.html"),
                template: path.join(paths.pluginV7.appSrc, "test.ejs"),
                inject: true,
                hash: true
            }),
            new CopyPlugin([
                { from: paths.pluginV7.appPublic, to: distFolder }
            ])
        ],
        devServer: {
            contentBase: distFolder,
            historyApiFallback: true,
            hot: false,
            inline: true,
            publicPath: "/",
            index: "test.html",
            port: 8007
        }

    };
}