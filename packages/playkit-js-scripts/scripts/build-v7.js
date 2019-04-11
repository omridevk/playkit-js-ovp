'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// // Ensure environment variables are read.
// require('../config/env');
// // @remove-on-eject-begin
// // Do the preflight checks (only happens before eject).
// const verifyPackageTree = require('./utils/verifyPackageTree');
// if (process.env.SKIP_PREFLIGHT_CHECK !== 'true') {
//     verifyPackageTree();
// }
// // @remove-on-eject-end

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config.v7');
const paths = require('../config/paths');

// Generate configuration
const config = configFactory('production', {mode: 'production'});
build().then(({ stats, warnings }) => {
    if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
            '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
            'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
    } else {
        console.log(chalk.green('Compiled successfully.\n'));
    }

    console.log();
    //
    // const appPackage = require(paths.appPackageJson);
    // const publicUrl = paths.publicUrl;
    // const publicPath = config.output.publicPath;
    // const buildFolder = path.relative(process.cwd(), paths.appBuild);

});

// Create the production build and print the deployment instructions.
function build() {
    console.log('Creating an optimized production build...');

    const compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            let messages;
            if (err) {
                if (!err.message) {
                    return reject(err);
                }
                messages = {
                    errors: [err.message],
                    warnings: [],
                };
            } else {
                messages = (
                    stats.toJson({ all: false, warnings: true, errors: true })
                );
            }
            if (messages.errors.length) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== 'string' ||
                    process.env.CI.toLowerCase() !== 'false') &&
                messages.warnings.length
            ) {
                console.log(
                    chalk.yellow(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                        'Most CI servers set it automatically.\n'
                    )
                );
                return reject(new Error(messages.warnings.join('\n\n')));
            }

            return resolve({
                stats,
                warnings: messages.warnings,
            });
        });
    });
}