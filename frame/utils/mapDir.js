/**
 * 遍历指定目录下的文件或文件夹，执行回调
 * */

const readDir = require('./readDir');

async function mapDir (url, callback) {
    const dirList = await readDir(url);

    for (let i = 0;i < dirList.length;i++) {
        let filename = dirList[i];

        if (filename.includes('.js')) {
            filename = filename.replace('.js', '');

            const fullPath = `${url}/${filename}`;
            const Content = require(fullPath);

            callback(Content, fullPath, filename);
        } else {
            await mapDir(`${url}/${filename}`, callback);
        }
    }
}

module.exports = mapDir;
