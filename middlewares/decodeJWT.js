const jwt = require('jsonwebtoken');
const config = require('../config'); // 包含 jwtSecretKey 和 expiresIn 的配置文件

// Token 解密中间件
function verifyToken(req, res, next) {
    // 从请求头中获取 Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token 缺失或格式错误',code:401 });
    }

    const token = authHeader.split(' ')[1]; // 提取 "Bearer " 后的部分

    try {
        // 验证并解密 Token
        const decoded = jwt.verify(token, config.jwtSecretKey);

        // 将解密后的数据挂载到 req 对象上，供后续使用
        req.user = decoded;

        next(); // 继续处理请求
    } catch (err) {
        // Token 无效或已过期
        return res.status(401).json({ message: '无效的 Token 或 Token 已过期' });
    }
}


module.exports = verifyToken