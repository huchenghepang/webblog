require('dotenv').config();  // 加载环境变量
module.exports = {
    "jwtSecretKey": "huchenghe and sky of city", // JWT密钥
    "SessionKey": "huchenghe",// session的名字
    "SessionSecretKey": "huchenghe1021",// session的密钥
    expiresIn: "1d", // token的保留时间,  '1h' '2d' ‘1d 设置为数字则为毫秒 
    serverPort: 5797,
    webSiteName: "Sky of City",
    hostname: "huchenghe.site", // 服务器的域名或地址
    urlADDRESS: process.env.NODE_ENV === 'production' ? "https://huchenghe.site" : "http://localhost:5797", // 根据环境调整URL
    REDIS_HOST: process.env.NODE_ENV === 'production' ? "127.0.0.1" : "127.0.0.1", // 连接的服务器地址
    REDIS_PORT: 6379,
    REDIS_PASSWORD: 123456,// 远程连接为了安全性需要有  默认为123456 改动这里需要同时改动redis文件夹下docker-compose.yml下的密码
    REDIS_DB: 0, //数据库索引
    // 设置数据库的连接信息
    mysqlConfig: {
        // 连接主机
        host:process.env.NODE_ENV === 'production' ? "127.0.0.1" : "127.0.0.1", // 连接主机
        // 连接端口
        port: 3306,     // 连接端口
        password: "123456", // 连接密码 如果开源就是123456 改动这同时需要改动mysql文件夹下docker-compose.yml下的密码
        user: "my_admin", // 连接用户名     改动这同时需要改动mysql文件夹下docker-compose.yml下的用户名
        database: "my_store",   // 连接的数据库
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
    // 允许跨域的域名 这里根据需要需要添加本机的公网IP地址 此处没有添加需要自行添加 
    allowCorsOrigins:process.env.NODE_ENV === 'production' ?[
        "http://huchenghe.site",
        "https://huchenghe.site",
        'http://blog.huchenghe.site',
        'https://blog.huchenghe.site',
        'http://www.huchenghe.site',
        'https://www.huchenghe.site', 
        "http://127.0.0.1:5143",
        "http://127.0.0.1",
    ]: [
        "http://huchenghe.site",
        "http://localhost:5143",
        "http://localhost:3000",
        "http://127.0.0.1",
    ]
}