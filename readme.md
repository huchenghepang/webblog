# 个人博客网站

>一个基于 Vue3 和 Node.js 的个人博客网站，提供完整的后台管理功能，包括 Markdown 文章呈现、文章管理、评论管理、分类管理、用户管理、权限管理等。项目支持动态路由生成、文件上传以及多种媒体格式的处理。通过 ACME 自动申请 CA 证书实现 HTTPS，并使用 Docker 集成 MySQL 和 Redis 进行数据存储与缓存。[在线访问地址](https://huchenghe.site)

---

## 📚 目录

- [项目背景](#-项目背景)
- [功能特性](#-功能特性)
- [技术栈](#️-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [API 文档](#-api-文档)
- [数据库设计](#-数据库设计)
- [支持的开源协议](#-支持的开源协议)
- [常见问题](#-常见问题)
- [未来计划](#-未来计划)

---

## 🌟 项目背景

### **项目目的**
- 为解决个人博客网站的需求而开发。
- 目标用户群体：个人博客网站用户，想要拥有个人独立网站的人群

### **适用场景**
- 该网站适合存储个人的学习笔记和生活记录。
- 浏览器本地进行音乐播放。

---

## ✨ 功能特性

- [x] 文章管理
- [x] 评论管理
- [x] 分类管理
- [x] 用户管理
- [x] 权限管理
- [x] 动态路由生成
- [x] 文件上传
- [x] 音乐播放
- [x] 实时滚动歌词同步
- [x] 支持 Markdown 格式的文章的处理
- [x] 在线创建和更新文章，支持实时预览和隐藏
- [x] HTTPS支持：通过 ACME 自动申请 CA 证书，确保网站的安全访问
- [x] 数据存储：使用 Docker 容器化部署 MySQL 和 Redis，进行高效的数据存储和缓存
- [x] 权限管理结合动态路由生成：后端提供-用户-角色-权限接口，前段根据需要动态生成前端路由，增强灵活性 
- [x] 在线匿名聊天室：用户可以在网站上进行匿名的实时聊天。

---

## 🛠️ 技术栈

### 主要技术栈

- [x] node.js
- [x] docker
- [x] mysql
- [x] redis
- [x] nginx

### 主要库
- **后端库** ： 
  - **Express** ：用于构建 Web 服务器和 API。
 
  - **MySQL2** ：用于与 MySQL 数据库交互。
 
  - **Redis** ：使用 Redis 进行缓存管理。
 
  - **jsonwebtoken** 、**express-jwt** ：用于 JWT 身份验证。
 
  - **Joi** 、**@escook/express-joi** ：用于数据验证。
 
  - **bcryptjs** 、**bcrypt** ：用于加密用户密码。
 
  - **multer** ：用于处理文件上传。
 
  - **markdown-it** ：用于 Markdown 格式文章的解析与渲染。
 
  - **socket.io** ：用于实现实时通讯（如评论实时更新）。
 
  - **moment** 、**moment-timezone** ：用于处理时间和时区。
 
- **开发与构建** ： 
  - **Typescript** ：增强类型安全的开发语言。主要方便代码提醒方便开发。
 
  - **cross-env** ：用于设置环境变量。
 
  - **pnpm** ：用于包管理，确保更快速的依赖安装。

---

## 📂 项目结构

---

- **db/** ：数据库相关文件
 
- **dist/** ：前端构建输出文件 
  - **assets/** ：静态资源文件（如图片、头像等）
 
  - **source/** ：媒体文件（如视频、图片等）
 
- **files/** ：存放上传文件 
  - **notes/** ：笔记文件
 
- **middlewares/** ：中间件文件（如错误处理、权限验证等）
 
- **mysql/** ：MySQL 数据库配置及数据存储 
  - **mysql-data/** ：MySQL 数据存储目录
 
- **public/** ：公开资源 
  - **json/** ：存放公共的 JSON 文件
 
- **redis/** ：Redis 配置及缓存管理
 
- **router/** ：路由配置文件
 
- **router_handler/** ：处理业务逻辑的文件夹
 
- **schema/** ：数据验证和 schema 定义
 
- **uploads/** ：用户上传文件存储 
  - **static/images/** ：静态图片文件
 
- **utils/** ：工具函数文件（如常用功能的封装）

---

## 🚀 快速开始

### **开发环境要求**

- Node.js >= 16.0
- npm 或 pnpm >= 7.0
- MySQL 数据库
- redis 数据库

### **本地运行步骤**

1. **克隆仓库**
   ```bash
   git clone https://github.com/huchenghepang/webblog.git
   cd webblog
   ```

2. **安装依赖**
   pnpm安装
   ```bash
   pnpm install
   ```
   npm安装
   ```bash
   npm install
   ```

3. **配置数据库** 

- **MySQL 数据库** 确保你已经安装了 **MySQL**  和 **Redis**  数据库，并正确配置了连接信息。默认情况下，项目的生产和开发环境都将数据库地址配置为 `127.0.0.1`（即本机 IP 地址），端口号分别为 **3306** （MySQL）和 **6379** （Redis）。如果你在本地运行该项目，需自行搭建数据库环境。 
 **安装 MySQL** ：
  - 如果尚未安装 MySQL，请参考官方文档安装 MySQL 服务。
 
  - 启动 MySQL 服务，并确保它监听默认端口 **3306** 。
 
 **初始化数据库** ： 
  - 在安装并启动 MySQL 后，执行 `mysql/init.sql` 文件来初始化数据库和表结构。可以通过 MySQL 命令行或数据库管理工具（如 MySQL Workbench）来执行该文件。

```sql
-- 例如：执行 init.sql 文件来创建数据库和相关表
source /path/to/mysql/init.sql;
```
 
**配置数据库连接信息** ： 
  - 创建数据库后，打开项目中的 `config.js` 文件，找到数据库连接配置部分。
 
  - 根据你的数据库环境修改连接信息。默认配置为本机 IP 地址和端口：


```js
module.exports = {
  // 其他配置...
   mysqlConfig: {
      // 连接主机
      host:process.env.NODE_ENV === 'production' ? "127.0.0.1" : "your_host", // 连接主机
      // 连接端口
      port: 3306,     // 连接端口
      password: "my_password", // 连接密码 
      user: "my_admin", // 连接用户名    
      database: "my_store",   // 连接的数据库
   },
};
```
替换 `my_admin`、`my_password`、`my_store` 和 `your_host` 为你的实际 MySQL 用户名、密码、数据库名称和主机地址。

**Redis 缓存** 
   Redis 主要用于缓存，如用户的请求权限验证，确保你已经搭建并运行了 Redis 服务，默认端口为 6379。 
**安装 Redis** ： 
  - 如果你尚未安装 Redis，请参考[官方文档](https://redis.io/)安装 Redis 服务，并确保它监听端口 6379 。
 
**启动 Redis** ：
  - 启动 Redis 服务，并确保它监听默认端口。

**使用 Docker 搭建 MySQL 和 Redis（可选）** 
   如果你希望通过 Docker 容器来搭建 MySQL 和 Redis，可以使用项目中的 `docker-compose.yml` 文件。只需要简单配置并执行该文件，即可自动完成数据库和缓存的搭建。 
**配置Docker** ： 
  - 在项目根目录下，找到 `mysql/docker-compose.yml` 和 `redis/docker-compose.yml` 文件。
  - 根据需要调整配置（如数据库密码、端口等）。

**启动容器** ：
  - 进入项目目录，执行以下命令来启动 MySQL 和 Redis 服务：

```bash
docker compose -f mysql/docker-compose.yml up -d
docker compose -f redis/docker-compose.yml up -d
```
这将自动下载相应的 MySQL 和 Redis 镜像并启动容器。

4. **启动后端服务**

   ```bash
   pnpm start # 使用pnpm运行
   npm start # 使用npm运行
   node serve # 使用node运行
   ```
4. **启动前端项目**
   下载前端项目的文件后，进入[前端项目](https://github.com/huchenghepang/frontendwebblog.git)的目录，执行以下命令来启动前端服务：

   ```bash
   pnpm dev # 使用pnpm运行
   npm run dev # 使用npm运行
   ```
5. **访问项目**
   打开浏览器并访问 `http://localhost:5143`。 端口根据前端项目自行配置。
---

### 在线部署步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/huchenghepang/webblog.git
   cd webblog
   ```
2. **安装依赖**
   pnpm安装
   ```bash
   pnpm install
   ```
   npm安装
   ```bash
   npm install
   ```
3. **配置数据库**
- Mysql 数据库      
   支持使用`docker-compose`一键搭建数据库，再配置好相关设置后允许`docker-compose`命令创建允许容器即可：
   ```bash
   docker compose -f mysql/docker-compose.yml up -d
   ```
   但是推荐在服务器自行搭建数据库，因为`docker-compose`创建容器时，可能因为容器异常退出导致数据丢失，所以推荐自行搭建数据库。
- Redis 数据库
   支持使用`docker-compose`一键搭建数据库，再配置好相关设置后允许`docker-compose`命令创建允许容器即可：
   ```bash
   docker compose -f redis/docker-compose.yml up -d
   ```
4. **配置Nginx**   
因为项目使用了ACME工具自动申请CA证书并且，并且需要反向代理后端服务器，所以需要配置Nginx，具体的Nginx配置可以查看的nginx.config文件的配置进行修改。

   nginx.config文件的配置进行修改：
   ```nginx
   location ~ ^/blog/static/ {
      rewrite ^/blog/(.*)$ /$1 break;
      proxy_pass http://127.0.0.1:5797; # 目标服务器公网IP或者局域网地址
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
   }
   ```

5. **启动服务**

   项目已经有了前端打包好的dist网站源码文件，所以只需要根据`docke-rcompose`的配置启动服务即可:
   ```bash
   docker compose up -d

   ```
   上述命令将会创建一个nginx服务器部署前端，并且自动根据ACME工具自动申请CA证书，启动后端服务器。具体的nginx配置可以查看的nginx.config文件的配置进行修改。


## 📖 API 文档

完整的接口设计参照[API文档](./API.md);或者在线[API文档](https://app.apifox.com/project/5639097),密码：cFNu7pAF。

---

## 💾 数据库设计

数据库设计文档请查看[数据库设计文档](./database.pdf)和[数据库设计图片](./database.jpg)。


## 📜 支持的开源协议

本项目基于 **MIT 协议** 开源，具体协议内容请查看 [LICENSE 文件](./LICENSE)。

---

## ❓ 常见问题

### **1. 如何解决依赖安装失败？**
请确保安装了正确版本的 Node.js 和 pnpm，或者尝试运行：
```bash
pnpm install --shamefully-hoist
```

---

## 🚧 未来计划

- 增加多种登录方式的支持，如GitHub、Google和邮箱等
- 支持更多主题样式
- 支持更多媒体格式的处理

---

## ❤️ 鸣谢

感谢以下开源项目和工具的支持：

- Node.js
- Docker
- MySQL
- Redis
- Express
- Nginx
- ACME