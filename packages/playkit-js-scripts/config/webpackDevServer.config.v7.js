'use strict';

const ignoredFiles = require('../utils/ignoredFiles');
const paths = require('./paths');
const fs = require('fs');

module.exports = function(proxy, allowedHost) {
    return {

        compress: true,
        clientLogLevel: 'none',
        watchContentBase: true,
        inline: true,
        hot: true,
        publicPath: '/',
        quiet: true,
        watchOptions: {
            ignored: ignoredFiles(paths.pluginV7.appSrc),
        },
        // Enable HTTPS if the HTTPS environment variable is set to 'true'
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true,
        }
    };
};