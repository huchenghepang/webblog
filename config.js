require('dotenv').config();  // 加载环境变量
module.exports = {
    "jwtSecretKey": "huchenghe and sky of city", // JWT密钥
    "SessionKey": "huchenghe",// session的名字
    "SessionSecretKey": "huchenghe1021",// session的密钥
    expiresIn: "1d", // token的保留时间,  '1h' '2d' ‘1d 设置为数字则为毫秒 
    serverPort: 5797,
    webSiteName: "Sky of City",
    hostname: "175.178.195.144",
    urlADDRESS: process.env.NODE_ENV === 'production' ? "https://huchenghe.site" : "http://localhost:5797", // 根据环境调整URL
    REDIS_HOST: process.env.NODE_ENV === 'production' ? "127.0.0.1" : "175.178.195.144",
    REDIS_PORT: 6379,
    REDIS_PASSWORD: 15970460916,// 远程连接为了安全性需要有
    REDIS_DB: 0, //数据库索引
    // 设置数据库的连接信息
    mysqlConfig: {
        // 连接主机
        host:process.env.NODE_ENV === 'production' ? "127.0.0.1" : "175.178.195.144",
        // 连接端口
        port: 3306,
        password: "@Aa292767", // 连接密码 如果开源就是123456
        user: "jeff",
        database: "my_store",
    },
    // 需要排除权限验证的接口
    excludePermissionVerification: [
        /^\/api/,
        /^\/static/,
        /^\/api\/upload/,
        /^\/api\/merge/,
        /^\/comment\/get/,
        /^\/socket.io/,

    ],
    // 允许跨域的域名
    allowCorsOrigins:process.env.NODE_ENV === 'production' ?[
        "http://huchenghe.site",
        "https://huchenghe.site",
        'http://blog.huchenghe.site',
        'https://blog.huchenghe.site',
        'http://www.huchenghe.site',
        'https://www.huchenghe.site',
        "http://175.178.195.144",
        "http://175.178.195.144:5143",
        "http://127.0.0.1",
    ]: [
        "http://huchenghe.site",
        "http://175.178.195.144",
        "http://localhost:5143",
        "http://localhost:3000",
        "http://127.0.0.1",
    ]
}