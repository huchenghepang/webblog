
const Redis = require('ioredis');
const config = require('../config');

class RedisClient {
  constructor() {
    this.redis = new Redis({
      host: config.REDIS_HOST || '127.0.0.1',  // 从环境变量读取 Redis 服务器地址
      port: config.REDIS_PORT || 6379,        // 从环境变量读取 Redis 服务器端口
      password: config.REDIS_PASSWORD || '',  // 从环境变量读取 Redis 密码
      db: config.REDIS_DB || 0,               // 从环境变量读取数据库索引
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);  // 自定义重试间隔
        return delay;
      },
      maxRetriesPerRequest: 5,       // 每个请求的最大重试次数
      connectTimeout: 10000,         // 连接超时时间（毫秒）
    });

    // 绑定连接事件
    this.handleEvents();
  }

  // 处理 Redis 连接相关事件
  handleEvents() {
    this.redis.on('connect', () => console.log('Redis connected successfully.'));
    this.redis.on('error', (err) => console.error('Redis connection error:', err));
    this.redis.on('reconnecting', () => console.log('Redis reconnecting...'));
    this.redis.on('end', () => console.log('Redis connection closed.'));
  }

  // 通用的错误处理方法
  handleError(operation, error) {
    console.error(`Error during ${operation}:`, error);
    // 判断是否是 Redis 超时错误或连接失败错误
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      throw new Error('Redis connection timeout or refused');
    }
    return { success: false, error: error.message || 'Unknown error' };
  }

  /**
   * 设置一个键值对
   * @param {string} key 键
   * @param {string} value 值
   * @param {number} [expireTimeInSeconds] 可选的过期时间（秒）
  */
  async setKey(key, value, expireTimeInSeconds) {
    try {
      /* 
        如果 value 是数组或对象，先转换成 JSON 字符串
      */
      const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;

      if (expireTimeInSeconds) {
        await this.redis.setex(key, expireTimeInSeconds, valueToStore);
      } else {
        await this.redis.set(key, valueToStore);
      }
      return { success: true };
    } catch (err) {
      return this.handleError('setKey', err);
    }
  }

  /**
   * 获取键的值
   * @param {string} key 键
   */
  async getKey(key) {
    try {
      const value = await this.redis.get(key);

      // 检查是否是有效的 JSON 字符串，如果是则转换回来
      try {
        return JSON.parse(value); // 尝试将字符串转换为对象
      } catch (e) {
        return value; // 如果不能转换，则返回原始字符串
      }
    } catch (err) {
      return this.handleError('getKey', err);
    }
  }

  /**
   * 删除键
   * @param {string} key 键
  */
  async delKey(key) {
    try {
      await this.redis.del(key);
      return { success: true };
    } catch (err) {
      return this.handleError('delKey', err);
    }
  }

  /**
   * 检查键是否存在
   * @param {string} key 键
  
  */

  async existsKey(key) {
    try {
      const exists = await this.redis.exists(key);
      return { success: true, exists: Boolean(exists) };
    } catch (err) {
      return this.handleError('existsKey', err);
    }
  }

  /**
   * 获取所有键
   */
  async getAllKeys() {
    try {
      const keys = await this.redis.keys('*');
      return { success: true, keys };
    } catch (err) {
      return this.handleError('getAllKeys', err);
    }
  }

  /**
 * 根据模式匹配并删除所有符合的键
 * @param {string} pattern 匹配模式 (如 "role:123:permissions:*")
 */
  async deleteKeysByPattern(pattern) {
    try {
      let cursor = '0';
      let keysToDelete = [];

      do {
        // 使用 SCAN 获取匹配的键
        const [newCursor, keys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = newCursor;

        if (keys.length > 0) {
          keysToDelete = keysToDelete.concat(keys);
        }
      } while (cursor !== '0'); // 当 cursor 返回 0 时，表示扫描结束

      if (keysToDelete.length > 0) {
        // 批量删除所有匹配的键
        await this.redis.del(...keysToDelete);
        console.log(`Deleted keys: ${keysToDelete}`);
        return { success: true, deletedKeys: keysToDelete };
      } else {
        console.log('No keys found for the given pattern.');
        return { success: false, message: 'No keys matched the pattern.' };
      }
    } catch (err) {
      return this.handleError('deleteKeysByPattern', err);
    }
  }


  /**
   * 发布消息
   * @param {string} channel 频道名称
   * @param {string} message 消息内容
   */
  async publishMessage(channel, message) {
    try {
      await this.redis.publish(channel, message);
      return { success: true };
    } catch (err) {
      return this.handleError('publishMessage', err);
    }
  }

  /**
 * 判断键是否存在，如果存在则返回键的值
 * @param {string} key 键
 */
  async getKeyIfExists(key) {
    try {
      // 检查键是否存在
      const exists = await this.redis.exists(key);

      if (exists) {
        // 键存在，返回其值
        const value = await this.redis.get(key);

        // 尝试将值解析为 JSON，如果是 JSON 格式，返回解析后的对象
        try {
          return { success: true, value: JSON.parse(value) };
        } catch (e) {
          return { success: true, value }; // 如果值不是 JSON，直接返回原始字符串
        }
      } else {
        // 键不存在，返回提示信息
        return { success: false, message: `Key "${key}" does not exist.` };
      }
    } catch (err) {
      return this.handleError('getKeyIfExists', err);
    }
  }

  /**
   * 订阅频道
   * @param {string} channel 频道名称
   * @param {function} callback 回调函数
   */
  subscribeToChannel(channel, callback) {
    this.redis.subscribe(channel)
      .then(() => {
        console.log(`Subscribed to ${channel}`);
        this.redis.on('message', (subscribedChannel, message) => {
          if (subscribedChannel === channel) {
            callback(subscribedChannel, message);
          }
        });
      })
      .catch((err) => this.handleError('subscribeToChannel', err));
  }

  /**
   * 关闭 Redis 连接
   */
  async quit() {
    try {
      await this.redis.quit();
      console.log('Redis connection closed.');
      return { success: true };
    } catch (err) {
      return this.handleError('quit', err);
    }
  }
}



const redisClient = new RedisClient();
module.exports = redisClient;
