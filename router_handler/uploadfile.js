const { request } = require("express");
const pool = require("../db/mysqlpool");
const path = require("path")
// 保存文件的基本信息 在完成上传文件和合并分块文件之后
async function saveFileInfo(fileInfo, res) {
    const {
        createTime,
        fileSize,
        fileType,
        fileName,
        TOTAL_CHUNK,
        fileId,
        finalPath,
        ext,
        fileNameWithoutExt,
    } = fileInfo;
    try {
        // 创建连接

        /* 保存相对路径 */

        const relativePath = path.relative(process.cwd(),finalPath)
        const connection = await pool.getConnection();
        let sql = "INSERT INTO `files_info`(`file_name`, `file_id`, `file_path`, `file_ext`,`file_createtime`,`file_type`,`file_fullname`,`file_size`) VALUES(?,?,?,?,?,?,?,?)";
        const [result] = await connection.execute(sql, [fileNameWithoutExt, fileId, relativePath, ext, createTime, fileType, fileName, fileSize]);
        // console.log(result)
        if (result.affectedRows > 0) {
            res.sendResponse('保存信息成功', { code: 200, fileId, fileName, fileNameWithoutExt, fileType, ext });
            // 释放连接
            connection.release();
        }
    } catch (error) {
        if (error.errno === 1062) {
            res.sendResponse('文件已经存在了', { code: 200, fileId, fileName, fileNameWithoutExt, fileType, ext });
        } else {
            res.sendError("保存文件失败");
        }
    }
}





const FILE_TYPES = {
    'image': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff'],
    'document': ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.pptx'],
    'video': ['.mp4', '.mkv', '.avi', '.mov'],
    'audio': ['.mp3', '.wav', '.aac', '.flac'],
    'archive': ['.zip', '.rar', '.7z', '.tar', '.gz'],
    'program': ['.exe', '.msi', '.bat', '.sh'],
    'notes': ['.md']
}

// 根据文件后缀匹配对应文件夹
// 定义文件类型与目标子文件夹的映射
function getFolderByFileType(fileType) {
    // 遍历 FILE_TYPES 对象
    for (const [folder, extensions] of Object.entries(FILE_TYPES)) {
        // 检查文件类型是否在对应的后缀数组中
        if (extensions.includes(fileType)) {
            return folder; // 返回对应的文件夹名称
        }
    }
    return 'source'; // 如果没有匹配到，返回 null
}




module.exports = {
    saveFileInfo,
    getFolderByFileType,
}