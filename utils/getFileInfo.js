const fs = require('fs');
const path = require('path');



/**
 * 获取文件信息
 * @param {string} filePath - 文件路径
 * @returns {Promise<object>} 文件信息对象
 */
function getFileInfo(filePath) {
    // 返回一个 Promise
    return fs.promises.access(filePath)
        .then(() => {
            // 检查文件是否存在成功，获取文件基础信息
            return fs.promises.stat(filePath);
        })
        .then((stats) => {
            // 解析文件路径
            const parsedPath = path.parse(filePath);

            // 构造文件信息对象
            const fileInfo = {
                file_name: parsedPath.name, // 文件名（无扩展名）
                file_fullname: parsedPath.base, // 文件全名（含扩展名）
                file_path: path.join(parsedPath.dir,parsedPath.base), // 文件目录路径
                file_ext: parsedPath.ext, // 文件扩展名
                file_createtime: stats.birthtime.getTime(), // 创建时间
                file_type: getFileType(parsedPath.ext), // 文件类型
                file_size: stats.size, // 文件大小（字节）
            };
            return fileInfo; // 返回文件信息对象
        })
        .catch((error) => {
            // 捕获并处理错误
            console.error("获取文件信息失败：", error);
            throw error; // 继续抛出错误以便调用方处理
        });
}

/**
 * 根据扩展名判断文件类型
 * @param {string} ext - 文件扩展名（如 .txt）
 * @returns {string} 文件类型
 */
function getFileType(ext) {
    const types = {
        image: ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp'],
        video: ['.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv'],
        audio: ['.mp3', '.wav', '.ogg', '.flac', '.aac'],
        document: ['.txt', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'],
        archive: ['.zip', '.rar', '.7z', '.tar', '.gz'],
        code: ['.js', '.ts', '.py', '.java', '.c', '.cpp', '.html', '.css'],
        'application/md': ['.md']
    };

    for (const [type, extensions] of Object.entries(types)) {
        if (extensions.includes(ext.toLowerCase())) {
            return type;
        }
    }

    return 'unknown'; // 未知类型
}

module.exports = {
    getFileInfo
}