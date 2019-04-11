'use strict';

const path = require('path');
const fs = require('fs');


const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);
const pluginV7 = resolveApp('packages/pluginV7');
const pluginV2 = resolveApp('packages/pluginV2');
module.exports = {
    pluginV7: {
        packageJson: path.join(pluginV7, 'package.json'),
        path: pluginV7,
        appSrc: path.join(pluginV7, 'src'),
        appPublic: path.join(pluginV7, 'src', 'public'),
        appTsConfig: path.join(pluginV7, 'tsconfig.json'),
        entry: path.join(pluginV7, 'src', 'index.ts')
    },
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveModule(resolveApp, 'src/setupTests'),
    proxySetup: resolveApp('src/setupProxy.js'),
    appNodeModules: resolveApp('node_modules'),
    // These properties only exist before ejecting:
    ownPath: resolveOwn('.'),
    ownNodeModules: resolveOwn('node_modules'), // This is empty on npm 3
    appTypeDeclarations: resolveApp('src/react-app-env.d.ts'),
    ownTypeDeclarations: resolveOwn('lib/react-app.d.ts'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
