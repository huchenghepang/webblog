const mysql = require('mysql2/promise');
const config = require('../config');

// 创建连接池，设置连接池的参数

const pool = mysql.createPool({
  // host: '127.0.0.1',
  host: config.mysqlConfig.host,
  port: config.mysqlConfig.port,
  user: config.mysqlConfig.user,
  password: config.mysqlConfig.password,
  database: config.mysqlConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 5, // 最大空闲连接数，默认等于 `connectionLimit`
  idleTimeout: 30000, // 调整为30秒      // 空闲连接超时，以毫秒为单位，默认值为 60000 ms
  queueLimit: 20,
  enableKeepAlive: true, // 心跳保持连接
  keepAliveInitialDelay: 0,
});

(async () => {
  try {
    const [rows, fields] = await pool.query('SELECT 1');
    if (rows.length === 1) {
      console.log("数据库连接正常");
      // 释放连接
    }
  } catch (err) {
    console.error("数据库连接测试失败：", err);
  }
})();
module.exports = pool