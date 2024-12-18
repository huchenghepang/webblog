const express = require("express")
const router = express.Router()
const iconv = require('iconv-lite'); // 处理中文乱码的问题

const fs = require("fs-extra");
const path = require("path");
const multer = require("multer");
const SparkMD5 = require('spark-md5');
const { saveFileInfo, getFolderByFileType } = require("../router_handler/uploadfile");
const config = require("../config");




const upload = multer({ dest: "../uploads/" });
const crypto = require('crypto');
// 确定上传文件的最终存储目录
const UPLOAD_DIR = path.resolve(__dirname, "../uploads");



// 处理文件的上传
router.post("/upload", upload.single("chunk"), async (req, res) => {
  // 相隔5秒请求
  try {
    // 从请求体中获取分片的索引和文件信息
    //   const { chunkIndex, fileInfo, start, end, chunkSize, hash } = req.body;
    const { chunkIndex, fileInfo } = req.body;
    // 将文件信息解析为 JSON 格式
    const parsedFileInfo = JSON.parse(fileInfo);

    // 确定文件的存储目录，使用文件名作为子目录名
    const fileDir = path.join(UPLOAD_DIR, parsedFileInfo.fileName);

    // 确保存储目录存在 存在则不创建 不存在则创建目录
    await fs.ensureDir(fileDir);

    // 确定当前分片的保存路径
    const chunkPath = path.join(fileDir, chunkIndex);
    // 将分片文件从临时目录移动到最终目录
    if (!fs.pathExistsSync(chunkPath)) {
      await fs.move(req.file.path, chunkPath);
    }

    // 删除临时文件
    await fs.remove(req.file.path);

    // 返回成功状态码
    res.send({
      code: 200,
      msg: "成功",
    });
  } catch (error) {

    res.send({
      cdoe: 200,
      msg: "失败",
    });
  }
});


// 处理文件的合并 注意upload.single会对请求头进行劫持
router.post("/merge", upload.single(""), async (req, res) => {
  try {
    const { fileName, totalChunks, fileInfo } = await JSON.parse(req.body.fileInfo);
    // console.log(req.body.fileInfo)
    // console.log("开始合并文件:" + fileName);

    // 确定文件存储的子目录路径
    const fileDir = path.join(UPLOAD_DIR, fileName);

    // 确定文件后缀名
    const ext = path.extname(fileName);

    const fileFolder = getFolderByFileType(ext);

    // 最终文件的路径
    const fileSavePath = path.join(__dirname, "../files", fileFolder);
    await fs.ensureDir(fileSavePath);
    // 文件去除后续的名字
    const fileNameWithoutExt = path.basename(fileName, ext);
    const uniqueString = `${fileName}-${totalChunks}-${fileInfo.createTime}-${fileInfo.fileSize}-${fileInfo.fileType}`;
    const fileId = SparkMD5.hash(uniqueString);

    // 最终文件的路径
    const finalPath = path.join(fileSavePath, `${fileId}${ext}`);
    fileInfo.fileId = fileId;
    fileInfo.finalPath = finalPath;
    fileInfo.ext = ext;
    fileInfo.fileNameWithoutExt = fileNameWithoutExt;
    //   const finalPath = path.join(fileSavePath, fileName);

    // 创建可写流，用于将分片数据写入最终文件 注意需要保证相关文件夹存在 fs.createWriteStream会自动创建文件但是不会自动创建文件夹
    const writeStream = fs.createWriteStream(finalPath);

    // 逐个读取分片文件并写入最终文件
    for (let i = 0; i < totalChunks; i++) {
      // 分片文件的路径
      const chunkPath = path.join(fileDir, i.toString());
      // 读取分片文件的数据
      const data = await fs.readFile(chunkPath);
      // 将分片数据写入最终文件
      writeStream.write(data);
      // 删除已合并的分片文件
      await fs.remove(chunkPath);
    }

    // 关闭可写流
    writeStream.end();

    writeStream.on("finish", async () => {
      // console.log("合并成功");
      await saveFileInfo(fileInfo, res)
      await fs.remove(fileDir);
      // res.send(JSON.stringify({ code: 200, msg: "合并成功" }));
    });
    writeStream.on("error", (error) => {
      // console.log(error.message);
      res.status(500).send(JSON.stringify({ code: 500, msg: "合并失败" }));
    });
  } catch (error) {
    res.status(500).send(JSON.stringify({ code: 500, msg: "合并失败" }));
  }
});


// 处理图片资源的上传
const uploadPath = path.join(__dirname, '../uploads/static/images');
// 手动创建目录避免 重复判断浪费性能
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
} 

/* 上传头像和笔记内图片的上传时，图片名的命名放前端处理hash */


// 配置multer的存储方式和文件名 
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req)
    const uploadPath = path.join(__dirname, '../uploads/static/images');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 使用 iconv-lite 来解码文件名，确保中文字符正确处理
    const originalName = iconv.decode(Buffer.from(file.originalname, 'latin1'), 'utf8');
    cb(null, originalName); // 保持文件名不变
  }
});







// 创建图片的存储方式 大小不要超过是10MB 并且图片数量不超过10张 

// 处理图片资源的合 

// 定义图片的网络访问路径
const BASE_IMAGE_URL = new URL(process.env.NODE_ENV === 'production' ?'/blog/static/images':'/static/images', config.urlADDRESS)



const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 1024 * 1024 * 10 } })
router.post("/uploadImages", uploadImage.array('images', 10), (req, res) => {
  try {
    // 不存在文件则返回错误
    if (!req.files || req.files.length === 0) {
      return res.sendError('没有图片');
    }
    // 上传成功后返回文件信息
    const filesInfo = req.files.map(file => ({
      filename: file.filename,
      // 文件的相对路径
      relativePath: path.join('uploads/static', file.filename),
      imageURL: `${BASE_IMAGE_URL}/${file.filename}`
    }));
    res.sendResponse('图片上传成功', filesInfo);
  } catch (error) {
    // console.log(error)
    res.sendError('图片上传失败');
  }
});








// 处理单个图片上传

router.post("/uploadImage", uploadImage.single('image'), (req, res) => {
  
  try {
    // 不存在文件则返回错误
    if (!req.file) {
      return res.sendError('没有图片');
    }
    // 上传成功后返回文件信息
    const fileInfo = {
      filename: req.file.filename,
      // 文件的相对路径
      relativePath: path.join('uploads/static', req.file.filename),
      imageURL: `${BASE_IMAGE_URL}/${req.file.filename}`
    };
    res.sendResponse('图片上传成功', fileInfo);
  } catch (error) {
    res.sendError('图片上传失败');
  }
});




/* 原生二进制图片上传 */
router.post('/uploadimage/raw', (req, res) => {
  // 定义保存路径
  const uploadPath = path.join(__dirname, '../uploads/static/images');


  // 收集二进制数据
  const chunks = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', () => {
    const fileBuffer = Buffer.concat(chunks);

    // 基于文件内容生成唯一哈希值作为文件名
    const hash = crypto.createHash('md5').update(fileBuffer).digest('hex');
    const filename = `image-${hash}.jpg`;
    const filePath = path.join(uploadPath, filename);

    // 写入文件
    fs.writeFile(filePath, fileBuffer, (err) => {
      if (err) {
        return res.status(500).send({ message: '图片保存失败', error: err.message });
      }

      res.status(200).send({
        message: '图片上传成功',
        imageURL: `${BASE_IMAGE_URL}/${filename}`,
      });
    });
  });

  req.on('error', (err) => {
    res.status(500).send({ message: '上传过程中发生错误', error: err.message });
  });
});


/* 处理音频上传 */




module.exports = router