const fs = require('fs'),
    readline = require('linebyline');


function fileExist(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (err) => {
            resolve(!err);
        })
    });
}


<<<<<<< HEAD
function readFileRange(path, buffer, start, length) {
    return new Promise((resolve, reject) => {
        fs.open(path, 'r', function (err, fd) {
=======
function readFileRange(buffer, start, length) {
    return new Promise((resolve, reject) => {
        fs.open(this.databaseFileName, 'r', function (err, fd) {
>>>>>>> e2f051d... Initial commit
            if (err) {
                return reject()
            }
            fs.read(fd, buffer, 0, length, start, (err, bytesRead, buffer) => {
                if (err) {
                    return reject()
                }
                resolve(buffer.toString());
            })
        })
    });
}

class HashMapDB {
    constructor(databaseFileName) {
        this.databaseFileName = databaseFileName;
        this.hashMap = new Map();
    }

    init() {
        return new Promise(async (resolve, reject) => {

<<<<<<< HEAD
            if (!await fileExist(this.databaseFileName)) {
                return resolve()
            }

            const rl = readline(this.databaseFileName, {});

            rl.on('line', (line, lineCount, bytesReadIncludingLine) => {

                let key = line.split(":")[0],
                    dataStartsAt = bytesReadIncludingLine - line.length + key.length + 1,
                    length = bytesReadIncludingLine - dataStartsAt;

                this.hashMap.set(key, [dataStartsAt, length]);
            })
                .on('close', resolve)
                .on('error', reject);
=======
            if (await fileExist(this.databaseFileName)) {

                const rl = readline(this.databaseFileName, {});

                rl.on('line', (line, lineCount, bytesReadIncludingLine) => {

                    let key = line.split(":")[0],
                        dataStartsAt = bytesReadIncludingLine - line.length + key.length + 1,
                        length = bytesReadIncludingLine - dataStartsAt;

                    this.hashMap.set(key, [dataStartsAt, length]);
                })
                    .on('close', resolve)
                    .on('error', reject);

            }
>>>>>>> e2f051d... Initial commit
        });
    }

    async get(key) {
        key = encodeURIComponent(key);
        if (this.hashMap.has(key) && await fileExist(this.databaseFileName)) {
            let [start, length] = this.hashMap.get(key);
            let buffer = Buffer.alloc(length);

<<<<<<< HEAD
            let data = await readFileRange(this.databaseFileName, buffer, start, length);
=======
            let data = await readFileRange(buffer, start, length);
>>>>>>> e2f051d... Initial commit

            return decodeURIComponent(data);
        } else {
            return null;
        }
    }

    async set(key, value) {
        let nextIndex = 0;
        if (await fileExist(this.databaseFileName)) {
            let fileSize = await new Promise((resolve, reject) => {
                fs.stat(this.databaseFileName, (err, stats) => {
                    if (err) {
                        reject();
                        return;
                    }
                    resolve(stats);
                });
            });

            nextIndex = fileSize.size;
        }

        let dataKey = encodeURIComponent(key);
        let dataValue = encodeURIComponent(value);
        let dataLine = dataKey + ":" + dataValue + "\n";

        fs.appendFile(this.databaseFileName, dataLine, err => {
            if (err) throw err;

            let dataStartsAt = nextIndex + dataKey.length + 1;
            this.hashMap.set(dataKey, [dataStartsAt, dataValue.length])
        });
    }
}

module.exports = HashMapDB;