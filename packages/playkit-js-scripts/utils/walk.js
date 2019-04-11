const path = require('path');
const fs = require('fs');

function walk(dir, excluded) {
    excluded = Array.isArray(excluded) ? excluded : [excluded];
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (error, files) => {
            if (error) {
                return reject(error);
            }
            Promise.all(files.map((file) => {
                return new Promise((resolve, reject) => {
                    const filepath = path.join(dir, file);
                    fs.stat(filepath, (error, stats) => {
                        if (error) {
                            return reject(error);
                        }
                        if (stats.isDirectory()) {
                            let shouldSkip = false;
                            excluded.forEach((exclude) => {
                                const re = new RegExp(exclude,"g");
                                if (filepath.match(re)) {
                                    shouldSkip = true;
                                }
                            })
                            if (shouldSkip) {
                                resolve(filepath);
                            }
                            walk(filepath, excluded).then(resolve);
                        } else if (stats.isFile()) {
                            resolve(filepath);
                        }
                    });
                });
            }))
                .then((foldersContents) => {
                    resolve(foldersContents.reduce((all, folderContents) => all.concat(folderContents), []));
                });
        });
    });
}


module.exports = walk;