module.exports = function executeNodeScript({ cwd, args }, data, source) {
    return new Promise((resolve, reject) => {
        const child = spawn(
            process.execPath,
            [...args, '-e', source, '--', JSON.stringify(data)],
            { cwd, stdio: 'inherit' }
        );

        child.on('close', code => {
            if (code !== 0) {
                reject({
                    command: `node ${args.join(' ')}`,
                });
                return;
            }
            resolve();
        });
    });
}