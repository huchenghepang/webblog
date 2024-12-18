---
title: 个人博客
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# 个人博客

Base URLs:

# Authentication

* API Key (apikey-undefined-Authorization)
    - Parameter Name: **Authorization**, in: header. 



# Default

## GET 获取验证码

GET /api/captcha

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 笔记管理

## POST 添加笔记

POST /api/addarticle

> Body 请求参数

```yaml
noteName: 小朋友fdf分手大师
Tags: 真心,加大,不要,还好
datetime: 2024-11-03 18:00:00
fileId: ac3bab3c90e2fa71157bca6ef0e9d7ee
isArchive: "true"
category: "1"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» noteName|body|string| 是 |none|
|» Tags|body|string| 是 |none|
|» datetime|body|string| 是 |none|
|» fileId|body|string| 是 |none|
|» isArchive|body|string| 是 |none|
|» category|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取笔记

GET /api/getarticles

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|pageSize|query|string| 是 |none|
|page|query|string| 是 |none|
|keyword|query|string| 否 |none|
|tagName|query|string| 否 |none|
|datetimeStart|query|string| 否 |none|
|datetimeEnd|query|string| 否 |none|
|categoryName|query|string| 否 |none|

> 返回示例

> 200 Response

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取笔记统计数据

GET /api/getArticleAnalyzeData

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取文章分析数据成功",
  "data": {
    "tagCounts": [
      {
        "tag_name": "Vue",
        "note_count": 7
      },
      {
        "tag_name": "测试",
        "note_count": 4
      },
      {
        "tag_name": "Linux",
        "note_count": 3
      },
      {
        "tag_name": "JavaScript",
        "note_count": 2
      },
      {
        "tag_name": "分析",
        "note_count": 1
      },
      {
        "tag_name": "github",
        "note_count": 1
      },
      {
        "tag_name": "Nano编辑器",
        "note_count": 1
      },
      {
        "tag_name": "Vim编辑器",
        "note_count": 1
      },
      {
        "tag_name": "电脑",
        "note_count": 1
      },
      {
        "tag_name": "页面通讯",
        "note_count": 1
      },
      {
        "tag_name": "Docker",
        "note_count": 1
      },
      {
        "tag_name": "Nodejs",
        "note_count": 1
      },
      {
        "tag_name": "socket",
        "note_count": 1
      },
      {
        "tag_name": "状态管理",
        "note_count": 1
      },
      {
        "tag_name": "Pinia",
        "note_count": 1
      },
      {
        "tag_name": "前端项目",
        "note_count": 1
      },
      {
        "tag_name": "API",
        "note_count": 1
      },
      {
        "tag_name": "Git",
        "note_count": 1
      },
      {
        "tag_name": "前端",
        "note_count": 1
      }
    ],
    "categoryCounts": [
      {
        "note_count": 7,
        "category_name": "Vue.js"
      },
      {
        "note_count": 3,
        "category_name": "前端"
      },
      {
        "note_count": 3,
        "category_name": "编程语言"
      },
      {
        "note_count": 2,
        "category_name": "Linux"
      },
      {
        "note_count": 2,
        "category_name": "后端开发"
      },
      {
        "note_count": 1,
        "category_name": "JavaScript"
      },
      {
        "note_count": 1,
        "category_name": "Node.js"
      },
      {
        "note_count": 1,
        "category_name": "Windows"
      },
      {
        "note_count": 1,
        "category_name": "前端开发"
      },
      {
        "note_count": 0,
        "category_name": "Java"
      },
      {
        "note_count": 0,
        "category_name": "Python"
      },
      {
        "note_count": 0,
        "category_name": "React"
      },
      {
        "note_count": 0,
        "category_name": "人生感悟"
      },
      {
        "note_count": 0,
        "category_name": "数据库"
      },
      {
        "note_count": 0,
        "category_name": "编程实践"
      }
    ]
  },
  "error": null,
  "timestamp": "2024-11-21T05:27:16.394Z",
  "requestId": "d0977572-8ede-4b59-acd1-7bfd0587bd2b"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» tagCounts|[object]|true|none||none|
|»»» tag_name|string|true|none||none|
|»»» note_count|integer|true|none||none|
|»» categoryCounts|[object]|true|none||none|
|»»» note_count|integer|true|none||none|
|»»» category_name|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 获取笔记内容

GET /api/getArticleContent

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|fileId|query|string| 是 |文件的id|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取文章内容成功",
  "data": {
    "file_id": "ac3bab3c90e2fa71157bca6ef0e9d7ee",
    "file_fullname": "Docker托管网站.md",
    "file_ext": ".md",
    "content": "## Docker的安装和拉取镜像\n 参考：[tech-shrimp/docker_installer: Docker官方安装包，用来解决因国内网络无法安装使用Docker的问题 (github.com)](https://github.com/tech-shrimp/docker_installer)\n要使用 Docker 部署一个静态网站，并将其托管到指定的端口，供他人访问，可以按照以下步骤操作：\n\n要使用 Docker 部署一个静态网站，并将其托管到指定的端口，供他人访问，可以按照以下步骤操作：\n\n## 前提条件 \n \n1. **安装 Docker** ：确保你的服务器或本地机器已安装 Docker。可以参考 [Docker 官方安装指南]()  进行安装。\n \n2. **准备静态网站文件** ：将你的网站文件（HTML、CSS、JavaScript、图片等）放在一个目录中，例如 `my-website`。\n\n## 方法一：使用 Nginx 官方镜像 \n\nNginx 是一个高性能的 Web 服务器，适合用于托管静态网站。\n\n### 步骤： \n\n### 1. 准备网站文件 \n假设你的静态网站文件位于 `my-website` 目录中，结构如下：\n\n```markdown\nmy-website/\n├── index.html\n├── styles.css\n├── script.js\n└── images/\n    └── logo.png\n```\n\n### 2. 运行 Nginx 容器 \n使用 Nginx 官方镜像，并将 `my-website` 目录挂载到容器的 `/usr/share/nginx/html` 目录，同时映射容器的 80 端口到主机的指定端口（例如 8080）。\n打开终端，执行以下命令：\n\n\n```bash\ndocker run --name my-static-site -d -p 8080:80 -v /path/to/my-website:/usr/share/nginx/html:ro nginx\n```\n**说明：**  \n- `--name my-static-site`：为容器指定名称。\n \n- `-d`：后台运行容器。\n \n- `-p 8080:80`：将主机的 8080 端口映射到容器的 80 端口。\n \n- `-v /path/to/my-website:/usr/share/nginx/html:ro`：将主机的 `my-website` 目录挂载到容器的 Nginx 根目录，并以只读模式挂载。\n \n- `nginx`：使用 Nginx 官方镜像。\n**注意** ：将 `/path/to/my-website` 替换为你实际的 `my-website` 目录的绝对路径。\n### 3. 验证部署 \n在浏览器中访问 `http://你的服务器IP:8080`，应该能看到你的网站内容。\n## 方法二：使用自定义 Dockerfile \n\n如果你需要自定义 Nginx 配置，可以创建一个 Dockerfile。\n\n### 步骤： \n\n### 1. 创建项目目录 \n\n\n```bash\nmkdir my-static-site\ncd my-static-site\n```\n\n### 2. 准备网站文件 \n将你的静态网站文件放入 `my-static-site` 目录。\n### 3. 创建 Dockerfile \n在 `my-static-site` 目录下创建一个名为 `Dockerfile` 的文件，内容如下：\n\n```dockerfile\n# 使用官方 Nginx 镜像作为基础镜像\nFROM nginx:alpine\n\n# 将本地网站文件复制到容器内的 Nginx 目录\nCOPY . /usr/share/nginx/html\n\n# 如果需要自定义 Nginx 配置，可以将配置文件复制到 /etc/nginx/conf.d/\n# COPY nginx.conf /etc/nginx/conf.d/default.conf\n```\n\n### 4. 构建 Docker 镜像 \n在 `my-static-site` 目录下执行以下命令来构建镜像：\n\n```bash\ndocker build -t my-static-site .\n```\n\n### 5. 运行容器 \n\n使用构建好的镜像运行容器，并映射到指定端口（例如 8080）：\n\n\n```bash\ndocker run --name my-static-site -d -p 8080:80 my-static-site\n```\n\n### 6. 验证部署 \n在浏览器中访问 `http://你的服务器IP:8080`，应该能看到你的网站内容。\n## 方法三：使用 Docker Compose \n\nDocker Compose 可以帮助你更方便地管理多个容器或复杂配置。以下是使用 Docker Compose 部署静态网站的步骤：\n\n### 步骤： \n\n### 1. 创建项目目录 \n\n\n```bash\nmkdir my-static-site\ncd my-static-site\n```\n\n### 2. 准备网站文件 \n将你的静态网站文件放入 `my-static-site` 目录。3. 创建 `docker-compose.yml` 文件在 `my-static-site` 目录下创建一个名为 `docker-compose.yml` 的文件，内容如下：\n\n```yaml\nversion: '3'\nservices:\n  web:\n    image: nginx:alpine\n    container_name: my-static-site\n    ports:\n      - \"8080:80\"\n    volumes:\n      - ./my-website:/usr/share/nginx/html:ro\n```\n**说明** ： \n- `image`：使用 Nginx 官方镜像。\n \n- `container_name`：为容器指定名称。\n \n- `ports`：映射主机的 8080 端口到容器的 80 端口。\n \n- `volumes`：将本地 `my-website` 目录挂载到容器的 Nginx 根目录，并以只读模式挂载。\n**注意** ：确保 `my-website` 目录位于 `docker-compose.yml` 文件所在的目录下，且包含你的静态网站文件。\n### 4. 启动服务 \n\n执行以下命令启动服务：\n\n\n```bash\ndocker-compose up -d\n```\n\n### 5. 验证部署 \n在浏览器中访问 `http://你的服务器IP:8080`，查看网站是否正常显示。\n## 注意事项 \n \n- **端口选择** ：确保你选择的端口（如 8080）在服务器的防火墙规则中已开放，并且没有被其他服务占用。\n \n- **持久化和更新** ：如果你的网站文件需要频繁更新，建议使用挂载卷的方法（如方法一或方法三），以便直接在主机上更新文件，无需重建镜像。\n \n- **安全性** ：如果网站需要通过互联网访问，建议配置 HTTPS。可以通过配置 Nginx 证书或使用反向代理工具（如 Let's Encrypt）来实现。\n \n- **资源管理** ：根据网站的访问量和资源需求，合理配置 Docker 容器的资源限制（如 CPU、内存等）。\n\n## 总结 \n\n使用 Docker 部署静态网站主要包括选择合适的 Web 服务器镜像（如 Nginx）、准备网站文件、运行 Docker 容器并映射到指定端口。根据需求，可以选择直接使用官方镜像，或通过自定义 Dockerfile 进行配置。如果需要管理多个服务或更复杂的配置，Docker Compose 是一个不错的选择。\n\n",
    "name": "Docker托管网站",
    "file_createtime": "1729120577155",
    "created_at": "2024-11-04T00:04:41.000Z",
    "create_time": "2023-07-04T00:03:44.000Z",
    "updatedtime": null,
    "reading": 0,
    "noteId": 57
  },
  "error": null,
  "timestamp": "2024-11-28T16:11:54.600Z",
  "requestId": "50e88c6a-171d-4515-b3ba-f926eae2e333"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» file_id|string|true|none||none|
|»» file_fullname|string|true|none||none|
|»» file_ext|string|true|none||none|
|»» content|string|true|none||none|
|»» name|string|true|none||none|
|»» file_createtime|string|true|none||none|
|»» created_at|string|true|none||none|
|»» create_time|string|true|none||none|
|»» updatedtime|null|true|none||none|
|»» reading|integer|true|none||none|
|»» noteId|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 添加文章（在管理员界面)

POST /note/add

> Body 请求参数

```json
{
  "name": "学习笔记",
  "summary": "这是一篇关于JavaScript基本语法的笔记。",
  "text": "JavaScript 是一种轻量级、解释型或即时编译型的编程语言。# JavaScript dd是一种轻量级、解释型或即时编译型的编程语言 ## di22er",
  "categoryId": 6,
  "isArchived": false,
  "tags": [
    "JavaScript",
    "编程",
    "基础"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» summary|body|string| 是 |none|
|» text|body|string| 是 |none|
|» categoryId|body|integer| 是 |none|
|» isArchived|body|boolean| 是 |none|
|» tags|body|[string]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "保存笔记成功",
  "data": {
    "fileId": "258cfc7f3a48ee021d5380196ab4b939",
    "fileName": "学习笔记"
  },
  "error": null,
  "timestamp": "2024-11-28T06:17:57.355Z",
  "requestId": "1d84efd0-c674-4c59-ad8c-508f967a61f3"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» fileId|string|true|none||none|
|»» fileName|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 更新文章（在管理员界面)

POST /note/update

> Body 请求参数

```json
{
  "noteId": 114,
  "fileId": "e22f80840e3ccf0cef30499243c4af90",
  "name": "学习笔记4",
  "summary": "这是一篇关于JavaScript基本语法的笔记。更新后的,更新后的",
  "text": "JavaScript 是一种轻量级、解释型或即时编译型的编程语言。# JavaScript dd是一种轻量级、解释型或即时编译型的编程语言 ## di22er，更新后的。更新后的更改，更新后的，更新后的ss,更改这个东西",
  "categoryId": 11,
  "isArchived": true,
  "tags": [
    "JavaScript",
    "人生"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» noteId|body|integer| 是 |none|
|» fileId|body|string| 是 |none|
|» name|body|string| 是 |none|
|» summary|body|string| 是 |none|
|» text|body|string| 是 |none|
|» categoryId|body|integer| 是 |none|
|» isArchived|body|boolean| 是 |none|
|» tags|body|[string]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "更新笔记成功",
  "data": {
    "fileId": "409f78e5b274bcfbd39ff3db540fce88",
    "fileName": "学习笔记4",
    "noteId": 114
  },
  "error": null,
  "timestamp": "2024-11-28T08:28:13.685Z",
  "requestId": "615e66bc-b8ff-40fe-9d0c-882907d52d47"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» fileId|string|true|none||none|
|»» fileName|string|true|none||none|
|»» noteId|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## DELETE 删除文章

DELETE /note/delete

> Body 请求参数

```
"{   \r

\    \"noteId\":114,\r

\    \"fileId\":\"409f78e5b274bcfbd39ff3db540fce88\",\r

}"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|string| 否 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "删除文章成功",
  "error": null,
  "timestamp": "2024-11-28T09:49:17.962Z",
  "requestId": "d85a504b-39eb-45c5-888f-b0fbc223b367"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 切换文章的归档状态

GET /note/archive

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|noteId|query|string| 是 |none|
|isArchived|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取文章数据（管理员）

GET /note/info

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |none|
|limit|query|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取数据",
  "data": {
    "notes": [
      {
        "id": 115,
        "name": "CSS的测试",
        "categoryId": 29,
        "fileId": "bd0bcb3cddcd31eb903c668b41c65519",
        "createTime": "2023-11-14T08:05:14.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": "2024-11-28T08:06:00.000Z",
        "categoryName": "CSS"
      },
      {
        "id": 105,
        "name": "github工作流细节和NPM相关",
        "categoryId": 2,
        "fileId": "b767dc27f9c29aad6508ff52b3bf7b5f",
        "createTime": "2024-11-07T05:46:06.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "编程语言"
      },
      {
        "id": 104,
        "name": "Git常见命令",
        "categoryId": 1,
        "fileId": "cf5f84279d3d3bca967e8f66a700598a",
        "createTime": "2024-11-07T05:40:54.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "前端"
      },
      {
        "id": 106,
        "name": "SWOT分析",
        "categoryId": 13,
        "fileId": "50d84565b73c74d525ec8a3ab4212f18",
        "createTime": "2024-11-07T05:51:09.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "后端开发"
      },
      {
        "id": 107,
        "name": "Vue22",
        "categoryId": 11,
        "fileId": "5b317c8c230d939cfc8724d78b893da5",
        "createTime": "2024-11-08T21:40:16.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "Vue.js"
      },
      {
        "id": 108,
        "name": "双指针算法",
        "categoryId": 11,
        "fileId": "a13626c01a2639f26e7d0ce28917fdb5",
        "createTime": "2024-10-31T21:39:22.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "Vue.js"
      },
      {
        "id": 111,
        "name": "测试前端上传",
        "categoryId": 1,
        "fileId": "77742945f3ae82e25ed948263ab5d0ef",
        "createTime": "2024-11-13T06:39:56.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "前端"
      },
      {
        "id": 113,
        "name": "测试3233",
        "categoryId": 1,
        "fileId": "e689fd2000c8c588eccfd60f2eaf5480",
        "createTime": "2024-11-13T07:32:58.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "前端"
      },
      {
        "id": 112,
        "name": "测试脚本会不会渲染",
        "categoryId": 2,
        "fileId": "a19e7d98a0ea3a71f841c98fa0015c62",
        "createTime": "2024-11-13T07:03:28.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "编程语言"
      },
      {
        "id": 109,
        "name": "Vue3",
        "categoryId": 11,
        "fileId": "5ba43964fd61f3049a6e588c38fa3905",
        "createTime": "2024-11-08T21:41:42.000Z",
        "isArchive": 1,
        "reading": 0,
        "updatedTime": null,
        "categoryName": "Vue.js"
      }
    ],
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 22
  },
  "error": null,
  "timestamp": "2024-11-28T13:30:39.175Z",
  "requestId": "ad7fdb8f-c8f0-4d6a-8391-cf472d8ebc2d"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» notes|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» categoryId|integer|true|none||none|
|»»» fileId|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» isArchive|integer|true|none||none|
|»»» reading|integer|true|none||none|
|»»» updatedTime|string¦null|true|none||none|
|»»» categoryName|string|true|none||none|
|»» currentPage|integer|true|none||none|
|»» totalPages|integer|true|none||none|
|»» totalRecords|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 根据文章ID获取文章的标签信息

POST /note/tags

> Body 请求参数

```json
{
  "noteId": 110
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» noteId|body|integer| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取数据",
  "data": [
    {
      "noteId": 110,
      "tagId": 2,
      "tagName": "Vue"
    }
  ],
  "error": null,
  "timestamp": "2024-11-29T20:49:32.395Z",
  "requestId": "d12f0205-d8cc-4c00-b7fe-590b07aaf00f"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» noteId|integer|false|none||none|
|»» tagId|integer|false|none||none|
|»» tagName|string|false|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 根据文章ID获取文章的标签信息 Copy

POST /note/content

> Body 请求参数

```json
{
  "noteId": 110
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» noteId|body|integer| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取数据成功",
  "data": {
    "fileName": "数组的快速排序",
    "fileId": "bdc76e1e61dfcd4b71776ddc98719d87",
    "filePath": "D:\\Code\\VSC\\Nodejs\\web_server\\server\\files\\notes\\bdc76e1e61dfcd4b71776ddc98719d87.md",
    "fileExt": ".md",
    "fileCreatetime": "1728651059246",
    "fileType": "application/md",
    "fileFullname": "数组的快速排序.md",
    "name": "数组的快速排序",
    "createTime": "2024-11-08T21:42:29.000Z",
    "updatedtime": null,
    "noteId": 110,
    "reading": 8,
    "categoryId": 11,
    "categoryName": "Vue.js",
    "content": "## 一、快速排序简介 \n**快速排序** （Quick Sort）由东尼·霍尔（Tony Hoare）在1960年提出，是一种高效的排序算法。它通过选择一个基准（pivot），将数组分割成两个子数组，使得左边的子数组所有元素都小于基准，右边的子数组所有元素都大于基准，然后递归地对这两个子数组进行排序。\n### 快速排序的名称由来 \n\n由于在排序过程中基准元素会“快速”地移动到其最终位置，因此得名“快速排序”。\n\n## 二、快速排序的工作原理 \n\n快速排序的基本步骤如下：\n \n1. **选择基准** ：从数组中选择一个元素作为基准（通常选择第一个元素、最后一个元素、中间元素或随机元素）。\n \n2. **分区操作** ：重新排列数组，使得所有小于基准的元素放在基准的左边，所有大于基准的元素放在基准的右边。基准元素此时处于其最终位置。\n \n3. **递归排序** ：递归地对基准左边和右边的子数组进行快速排序。\n\n### 图示说明 \n假设有数组 `[5, 3, 8, 4, 2]`，快速排序的过程如下：**选择基准** ：选择第一个元素 `5` 作为基准。**分区操作** ： \n- 将小于 `5` 的元素移到左边，大于 `5` 的元素移到右边。\n \n- 经过分区后，数组可能变为 `[3, 2, 4, 5, 8]`，其中 `5` 处于正确位置。\n**递归排序** ： \n- 对左边的子数组 `[3, 2, 4]` 进行快速排序。 \n  - 选择基准 `3`，分区后得到 `[2, 3, 4]`。\n \n- 对右边的子数组 `[8]` 进行快速排序，只有一个元素，无需排序。\n最终排序完成，数组为 `[2, 3, 4, 5, 8]`。\n## 三、快速排序的时间和空间复杂度 \n \n- **时间复杂度** ： \n  - **平均情况** ：O(n log n)\n \n  - **最坏情况** ：O(n²) —— 当数组已经有序或所有元素相等时。\n \n  - **最好情况** ：O(n log n)\n\n通过随机选择基准或使用三数取中法（Median of Three）可以有效避免最坏情况的发生。\n \n- **空间复杂度** ：O(log n) —— 主要用于递归调用栈。\n \n- **稳定性** ：快速排序通常是不稳定的排序算法，因为相等元素可能会改变相对位置。\n\n## 四、JavaScript实现快速排序 \n\n以下是快速排序的基本实现和优化版本：\n\n### 1. 基本实现（递归版） \n\n\n```javascript\nfunction quickSort(arr) {\n    if (arr.length <= 1) return arr; // 基线条件：空数组或单元素数组已排序\n\n    const pivot = arr[0]; // 选择第一个元素作为基准\n    const left = [];\n    const right = [];\n\n    for (let i = 1; i < arr.length; i++) {\n        if (arr[i] < pivot) {\n            left.push(arr[i]);\n        } else {\n            right.push(arr[i]);\n        }\n    }\n\n    return quickSort(left).concat(pivot, quickSort(right));\n}\n\n// 示例\nlet array = [5, 3, 8, 4, 2];\nconsole.log(quickSort(array)); // 输出: [2, 3, 4, 5, 8]\n```\n\n### 2. 优化版：原地排序（Hoare分区方案） \n\n为了减少空间复杂度和提高性能，可以使用原地排序的方式实现快速排序，避免使用额外的数组。\n\n\n```javascript\nfunction quickSortInPlace(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = partition(arr, low, high); // 获取分区点\n        quickSortInPlace(arr, low, pi - 1); // 递归排序左半部分\n        quickSortInPlace(arr, pi + 1, high); // 递归排序右半部分\n    }\n    return arr;\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high]; // 选择最后一个元素作为基准\n    let i = low - 1; // 小于基准的元素的索引\n\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]]; // 交换\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // 将基准元素放到正确位置\n    return i + 1;\n}\n\n// 示例\nlet array2 = [5, 3, 8, 4, 2];\nconsole.log(quickSortInPlace(array2)); // 输出: [2, 3, 4, 5, 8]\n```\n\n### 3. 优化版：随机选择基准 \n\n为了避免最坏情况，可以随机选择基准元素。\n\n\n```javascript\nfunction quickSortRandomPivot(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = randomPartition(arr, low, high);\n        quickSortRandomPivot(arr, low, pi - 1);\n        quickSortRandomPivot(arr, pi + 1, high);\n    }\n    return arr;\n}\n\nfunction randomPartition(arr, low, high) {\n    const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;\n    [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]]; // 交换随机元素和高位元素\n    return partition(arr, low, high);\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\n// 示例\nlet array3 = [5, 3, 8, 4, 2];\nconsole.log(quickSortRandomPivot(array3)); // 输出: [2, 3, 4, 5, 8]\n```\n\n### 4. 使用ES6语法简化交换 \n\n利用解构赋值可以更简洁地交换数组中的元素。\n\n\n```javascript\nfunction quickSortES6(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = partitionES6(arr, low, high);\n        quickSortES6(arr, low, pi - 1);\n        quickSortES6(arr, pi + 1, high);\n    }\n    return arr;\n}\n\nfunction partitionES6(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]]; // 使用解构赋值交换\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\n// 示例\nlet array4 = [5, 1, 4, 2, 8];\nconsole.log(quickSortES6(array4)); // 输出: [1, 2, 4, 5, 8]\n```\n\n## 五、快速排序的优化与改进 \n\n### 1. 三数取中法（Median of Three） \n\n选择基准时，取第一个、中间和最后一个元素的中位数作为基准，可以有效减少最坏情况的发生概率。\n\n\n```javascript\nfunction quickSortMedianOfThree(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = medianOfThreePartition(arr, low, high);\n        quickSortMedianOfThree(arr, low, pi - 1);\n        quickSortMedianOfThree(arr, pi + 1, high);\n    }\n    return arr;\n}\n\nfunction medianOfThreePartition(arr, low, high) {\n    const mid = Math.floor((low + high) / 2);\n    // 找出三个数的中位数\n    if (arr[low] > arr[mid]) {\n        [arr[low], arr[mid]] = [arr[mid], arr[low]];\n    }\n    if (arr[low] > arr[high]) {\n        [arr[low], arr[high]] = [arr[high], arr[low]];\n    }\n    if (arr[mid] > arr[high]) {\n        [arr[mid], arr[high]] = [arr[high], arr[mid]];\n    }\n    // 将中位数作为基准\n    [arr[mid], arr[high]] = [arr[high], arr[mid]];\n    return partition(arr, low, high);\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\n// 示例\nlet array5 = [5, 3, 8, 4, 2, 7, 1];\nconsole.log(quickSortMedianOfThree(array5)); // 输出: [1, 2, 3, 4, 5, 7, 8]\n```\n\n### 2. 尾递归优化 \n\n利用尾递归优化可以减少递归调用的深度，降低栈空间的消耗。然而，JavaScript目前对尾递归的优化支持有限。\n\n\n```javascript\nfunction quickSortTailRecursive(arr, low = 0, high = arr.length - 1) {\n    while (low < high) {\n        const pi = partition(arr, low, high);\n        // 递归较小的子数组，迭代较大的子数组\n        if (pi - low < high - pi) {\n            quickSortTailRecursive(arr, low, pi - 1);\n            low = pi + 1;\n        } else {\n            quickSortTailRecursive(arr, pi + 1, high);\n            high = pi - 1;\n        }\n    }\n    return arr;\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\n// 示例\nlet array6 = [10, 7, 8, 9, 1, 5];\nconsole.log(quickSortTailRecursive(array6)); // 输出: [1, 5, 7, 8, 9, 10]\n```\n\n### 3. 混合排序算法 \n\n结合其他排序算法（如插入排序）可以在数据量较小时提升性能。\n\n\n```javascript\nfunction quickSortHybrid(arr, low = 0, high = arr.length - 1, threshold = 10) {\n    if (high - low < threshold) {\n        insertionSort(arr, low, high);\n        return arr;\n    }\n    if (low < high) {\n        const pi = partition(arr, low, high);\n        quickSortHybrid(arr, low, pi - 1, threshold);\n        quickSortHybrid(arr, pi + 1, high, threshold);\n    }\n    return arr;\n}\n\nfunction insertionSort(arr, low, high) {\n    for (let i = low + 1; i <= high; i++) {\n        let key = arr[i];\n        let j = i - 1;\n        while (j >= low && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high];\n    let i = low - 1;\n    for (let j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\n// 示例\nlet array7 = [12, 11, 13, 5, 6, 7, 3, 4, 2, 1];\nconsole.log(quickSortHybrid(array7)); // 输出: [1, 2, 3, 4, 5, 6, 7, 11, 12, 13]\n```\n\n## 六、快速排序的适用场景与局限性 \n\n### 适用场景 \n \n- **大规模数据排序** ：快速排序在平均情况下具有O(n log n)的时间复杂度，适用于大规模数据排序。\n \n- **内存受限** ：原地排序的实现使得快速排序在内存使用上较为高效。\n \n- **需要快速响应** ：在前端开发中，处理大量数据时，快速排序可以提供较快的排序速度。\n\n### 局限性 \n \n- **最坏情况时间复杂度** ：当数组已经有序或所有元素相等时，快速排序的时间复杂度退化为O(n²)。\n \n- **不稳定** ：快速排序通常是不稳定的，可能会改变相等元素的相对位置。\n \n- **递归深度** ：对于非常大的数组，递归调用可能导致栈溢出，需通过优化（如尾递归）或使用迭代版本来解决。\n\n## 七、与其他排序算法的比较 \n| 排序算法 | 时间复杂度（平均） | 时间复杂度（最坏） | 空间复杂度 | 稳定性 | 备注 | \n| --- | --- | --- | --- | --- | --- | \n| 快速排序 | O(n log n) | O(n²) | O(log n) | 不稳定 | 高效的通用排序算法 | \n| 冒泡排序 | O(n²) | O(n²) | O(1) | 稳定 | 简单但效率低 | \n| 选择排序 | O(n²) | O(n²) | O(1) | 不稳定 | 每轮选出最小元素 | \n| 插入排序 | O(n²) | O(n²) | O(1) | 稳定 | 对部分有序数据效率较高 | \n| 归并排序 | O(n log n) | O(n log n) | O(n) | 稳定 | 适用于需要稳定性的场景 | \n| 堆排序 | O(n log n) | O(n log n) | O(1) | 不稳定 | 利用堆数据结构进行排序 | \n**总结** ：快速排序在大多数情况下表现优异，适用于需要高效排序的场景。然而，在需要稳定排序或担心最坏情况的情况下，可以考虑使用归并排序或堆排序。\n## 八、快速排序在前端开发中的应用 \n虽然现代JavaScript引擎（如V8）已经对内置的`Array.prototype.sort`进行了高度优化，但理解和掌握快速排序仍然对提升算法理解和解决复杂问题有帮助。在前端开发中，快速排序可以应用于以下场景：\n### 1. 数据排序与展示 \n\n在需要对大量数据进行排序并展示时，快速排序可以作为自定义排序算法的参考。\n\n\n```javascript\nlet products = [\n    { name: '产品A', price: 30 },\n    { name: '产品B', price: 10 },\n    { name: '产品C', price: 20 },\n    { name: '产品D', price: 40 }\n];\n\nfunction quickSortProducts(arr, low = 0, high = arr.length - 1) {\n    if (low < high) {\n        const pi = partition(arr, low, high);\n        quickSortProducts(arr, low, pi - 1);\n        quickSortProducts(arr, pi + 1, high);\n    }\n    return arr;\n}\n\nfunction partition(arr, low, high) {\n    const pivot = arr[high].price;\n    let i = low - 1;\n    for (let j = low; j < high; j++) {\n        if (arr[j].price < pivot) {\n            i++;\n            [arr[i], arr[j]] = [arr[j], arr[i]];\n        }\n    }\n    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n    return i + 1;\n}\n\nconsole.log(quickSortProducts(products));\n/*\n输出:\n[\n    { name: '产品B', price: 10 },\n    { name: '产品C', price: 20 },\n    { name: '产品A', price: 30 },\n    { name: '产品D', price: 40 }\n]\n*/\n```\n\n### 2. 数据可视化 \n\n在处理和排序大量数据以生成图表或图形时，快速排序可以帮助快速整理数据。\n\n### 3. 实现自定义组件排序 \n\n在构建可排序的表格、列表或其他UI组件时，可以使用快速排序实现高效的数据排序功能。\n\n## 九、总结 \n\n快速排序是一种高效、通用的排序算法，适用于大规模数据排序。通过选择合适的基准和优化分区方法，可以显著提升其性能。尽管快速排序在最坏情况下的时间复杂度较高，但通过各种优化手段，可以有效避免这种情况的发生。\n\n### 学习建议 \n \n- **动手实现** ：通过编写代码实现快速排序，加深对算法流程的理解。\n \n- **理解分区策略** ：深入理解不同的分区策略（如Hoare分区、Lomuto分区）及其优缺点。\n \n- **优化练习** ：尝试不同的优化方法，如随机基准、三数取中法等，提升排序性能。\n \n- **比较与分析** ：将快速排序与其他排序算法进行比较，理解不同算法的适用场景和性能差异。\n \n- **应用实践** ：在实际项目中应用快速排序，解决数据排序和处理问题，提升编码能力。"
  },
  "error": null,
  "timestamp": "2024-11-29T21:25:11.228Z",
  "requestId": "ed0f157f-bd32-4228-a4fd-6144bfc51f4b"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» fileName|string|true|none||none|
|»» fileId|string|true|none||none|
|»» filePath|string|true|none||none|
|»» fileExt|string|true|none||none|
|»» fileCreatetime|string|true|none||none|
|»» fileType|string|true|none||none|
|»» fileFullname|string|true|none||none|
|»» name|string|true|none||none|
|»» createTime|string|true|none||none|
|»» updatedtime|null|true|none||none|
|»» noteId|integer|true|none||none|
|»» reading|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» content|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

# 笔记管理/上传管理

## POST 上传图片

POST /api/uploadImage

> Body 请求参数

```yaml
image: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» image|body|string(binary)| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 上传图片(多张)

POST /api/uploadImages

> Body 请求参数

```yaml
images: []

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» images|body|string(binary)| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 分类

## GET 获取分类信息

GET /

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 添加分类

POST /category/addcategory

> Body 请求参数

```yaml
name: 小东西xiao s
parentId: "1"
level: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» parentId|body|string| 是 |none|
|» level|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 修改分类

POST /category/updatecategory/{id}

> Body 请求参数

```yaml
name: 小东西1
parentId: "1"
level: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|object| 否 |none|
|» name|body|string| 是 |none|
|» parentId|body|string| 是 |none|
|» level|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 删除分类

GET /category/removecategory

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 权限的管理

## POST 新增权限

POST /permission/addpermission

> Body 请求参数

```yaml
permissionName: 超级管理员
description: 这个是超级管理员权限
type: route
parentId: "0"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» permissionName|body|string| 是 |none|
|» description|body|string| 是 |none|
|» type|body|string| 是 |none|
|» parentId|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功添加权限",
  "data": {
    "success": true,
    "message": "权限创建成功",
    "insertId": 11
  },
  "error": null,
  "timestamp": "2024-11-21T05:14:52.633Z",
  "requestId": "424635eb-3316-452e-82bf-f297cc1ab302"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» success|boolean|true|none||none|
|»» message|string|true|none||none|
|»» insertId|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 查询所有权限信息

GET /permission/getpermissions

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取到了权限信息",
  "data": [
    {
      "permission_id": 2,
      "permission_name": "测试2",
      "description": "测序更新",
      "type": "route",
      "parent_id": null,
      "children": [
        {
          "permission_id": 10,
          "permission_name": "测试管理9",
          "description": "这个是测试路由的权限s",
          "type": "route",
          "parent_id": 2,
          "children": []
        }
      ]
    },
    {
      "permission_id": 3,
      "permission_name": "测试22",
      "description": "测序更新",
      "type": "route",
      "parent_id": null,
      "children": []
    },
    {
      "permission_id": 11,
      "permission_name": "超级管理员",
      "description": "这个是超级管理员权限",
      "type": "route",
      "parent_id": null,
      "children": []
    }
  ],
  "error": null,
  "timestamp": "2024-11-21T05:15:15.041Z",
  "requestId": "3560cab3-bf94-442b-99ad-bc5b42b05dcc"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» permission_id|integer|true|none||none|
|»» permission_name|string|true|none||none|
|»» description|string|true|none||none|
|»» type|string|true|none||none|
|»» parent_id|null|true|none||none|
|»» children|[object]|true|none||none|
|»»» permission_id|integer|false|none||none|
|»»» permission_name|string|false|none||none|
|»»» description|string|false|none||none|
|»»» type|string|false|none||none|
|»»» parent_id|integer|false|none||none|
|»»» children|[string]|false|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## PUT 更新权限

PUT /permission/update/{id}

> Body 请求参数

```yaml
permissionName: root
description: 超级管理员
type: route
parentId: "0"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|object| 否 |none|
|» permissionName|body|string| 是 |none|
|» description|body|string| 是 |none|
|» type|body|string| 是 |none|
|» parentId|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "更新成功",
  "error": null,
  "timestamp": "2024-11-21T05:17:13.530Z",
  "requestId": "3d36542f-bffe-471b-b6ab-455d20d461e5"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## DELETE 删除权限

DELETE /permission/delete/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "删除权限成功",
  "error": null,
  "timestamp": "2024-11-21T05:18:04.009Z",
  "requestId": "0cd2d39b-f8a0-43d4-8bef-96633a516a99"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

# 角色管理

## POST 添加角色

POST /role/add

> Body 请求参数

```yaml
roleName: 普通用户12
description: 这个是普通用户

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» roleName|body|string| 是 |none|
|» description|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取多个角色

GET /role

> Body 请求参数

```yaml
page: "1"
limit: "10"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |none|
|limit|query|string| 是 |none|
|body|body|object| 否 |none|
|» page|body|string| 否 |none|
|» limit|body|string| 否 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取角色信息",
  "data": {
    "total": 10,
    "totalPages": 1,
    "page": 1,
    "limit": 10,
    "roles": [
      {
        "role_id": 1,
        "role_name": "更新后的测试员",
        "description": "这个是更新后的",
        "created_at": null,
        "updated_at": "2024-11-20T06:50:28.000Z"
      },
      {
        "role_id": 7,
        "role_name": "普通用户1",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 9,
        "role_name": "普通用户2",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 15,
        "role_name": "普通用户7",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 16,
        "role_name": "普通用户8",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 17,
        "role_name": "普通用户9",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 19,
        "role_name": "普通用户10",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 20,
        "role_name": "普通用户11",
        "description": "这个是普通用户",
        "created_at": null,
        "updated_at": null
      },
      {
        "role_id": 21,
        "role_name": "普通用户12",
        "description": "这个是普通用户",
        "created_at": "2024-11-20T06:08:35.000Z",
        "updated_at": "2024-11-20T06:08:35.000Z"
      },
      {
        "role_id": 24,
        "role_name": "超级管理用户",
        "description": "这个是超级管理员用户",
        "created_at": "2024-11-21T05:19:40.000Z",
        "updated_at": "2024-11-21T05:19:40.000Z"
      }
    ]
  },
  "error": null,
  "timestamp": "2024-11-21T05:20:10.502Z",
  "requestId": "bece62ca-f8fb-40d8-8ca1-87b564635822"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» totalPages|integer|true|none||none|
|»» page|integer|true|none||none|
|»» limit|integer|true|none||none|
|»» roles|[object]|true|none||none|
|»»» role_id|integer|true|none||none|
|»»» role_name|string|true|none||none|
|»»» description|string|true|none||none|
|»»» created_at|string¦null|true|none||none|
|»»» updated_at|string¦null|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 查找角色（根据角色名)

GET /role/get/{roleName}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|roleName|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "找到了角色",
  "data": {
    "role_id": 24,
    "role_name": "超级管理用户",
    "description": "这个是超级管理员用户",
    "created_at": "2024-11-21T05:19:40.000Z",
    "updated_at": "2024-11-21T05:19:40.000Z"
  },
  "error": null,
  "timestamp": "2024-11-21T05:21:38.144Z",
  "requestId": "aeeef97b-8adc-4e52-a688-d396e48eef09"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» role_id|integer|true|none||none|
|»» role_name|string|true|none||none|
|»» description|string|true|none||none|
|»» created_at|string|true|none||none|
|»» updated_at|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## PUT 更新角色

PUT /role/update/{id}

> Body 请求参数

```yaml
roleName: 更新后的测试员
description: 这个是更新后的

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|body|body|object| 否 |none|
|» roleName|body|string| 是 |none|
|» description|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "更新成功",
  "error": null,
  "timestamp": "2024-11-21T05:22:44.996Z",
  "requestId": "f8874f29-79b5-4b11-847d-f6b5462ccea6"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## DELETE 删除角色

DELETE /role/delete/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "删除成功",
  "error": null,
  "timestamp": "2024-11-21T05:23:43.831Z",
  "requestId": "f2656ffe-41bf-4e64-a2f0-80965d5f0a49"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## DELETE 批量删除角色

DELETE /role/batch

> Body 请求参数

```yaml
ids: "[13,14]"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» ids|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "批量删除成功",
  "error": null,
  "timestamp": "2024-11-21T05:25:01.521Z",
  "requestId": "bd022782-d1d8-40ff-8c44-e664f5a2710f"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 管理角色权限（分配和取消)

POST /role/managePermissions

> Body 请求参数

```json
{
  "roleId": "1",
  "permissionIds": [
    10
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» roleId|body|string| 是 |none|
|» permissionIds|body|[integer]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "权限分配/取消成功",
  "error": null,
  "timestamp": "2024-11-21T05:25:28.978Z",
  "requestId": "55b2d422-9b85-4df3-93b1-f3e8637fa25f"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 获取角色权限信息

GET /role/permissions/{roleId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|roleId|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取权限成功",
  "data": {
    "permissions": [
      {
        "id": 11,
        "name": "root",
        "hasPermission": true
      },
      {
        "id": 3,
        "name": "测试22",
        "hasPermission": true
      }
    ]
  },
  "error": null,
  "timestamp": "2024-11-21T05:26:08.424Z",
  "requestId": "f3648564-43e3-4099-854c-9b7d0ed8e50f"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» permissions|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» hasPermission|boolean|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

# 用户管理

## GET 获取用户信息

GET /user/userinfo

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取了用户信息",
  "data": {
    "index": 1,
    "user_id": "32e2ae4c-6176-5d87-8356-f1b711867097",
    "account": "15970460916",
    "password": "",
    "register_datetime": "2024-11-30T16:21:52.000Z",
    "is_login": "1",
    "is_delete": 0,
    "username": "护城河旁",
    "role": null,
    "avatar": "http://localhost:5797/static/images/刀剑神域.jpeg",
    "email": "2927678784@qq.com",
    "signature": "我的青春,我做主a",
    "roles": [
      {
        "roleId": 40,
        "roleName": "Vip"
      },
      {
        "roleId": 39,
        "roleName": "普通用户"
      },
      {
        "roleId": 38,
        "roleName": "管理员"
      },
      {
        "roleId": 42,
        "roleName": "黑名单用户"
      }
    ],
    "currentRole": {
      "roleId": "38",
      "roleName": "管理员"
    },
    "iat": 1733605670,
    "exp": 1733692070,
    "permissions": [
      {
        "permissionId": 3,
        "permissionName": "center",
        "parentId": null,
        "type": "route",
        "description": "进入个人中心的权限",
        "children": [
          {
            "permissionId": 80,
            "permissionName": "center.uploadimage",
            "parentId": 3,
            "type": "button",
            "description": "上传图片的权限",
            "children": []
          },
          {
            "permissionId": 82,
            "permissionName": "center.uploadFile",
            "parentId": 3,
            "type": "button",
            "description": "上传文件的权限",
            "children": []
          }
        ]
      },
      {
        "permissionId": 47,
        "permissionName": "permission",
        "parentId": null,
        "type": "route",
        "description": "进入个人权限管理的路由权限",
        "children": [
          {
            "permissionId": 48,
            "permissionName": "permission.update",
            "parentId": 47,
            "type": "button",
            "description": "能够修改权限信息的权限",
            "children": []
          },
          {
            "permissionId": 53,
            "permissionName": "permission.add",
            "parentId": 47,
            "type": "button",
            "description": "添加权限的权限",
            "children": []
          },
          {
            "permissionId": 54,
            "permissionName": "permission.edit",
            "parentId": 47,
            "type": "button",
            "description": "编辑修改权限的权限",
            "children": []
          },
          {
            "permissionId": 55,
            "permissionName": "permission.delete",
            "parentId": 47,
            "type": "button",
            "description": "能够删除权限的权限",
            "children": []
          }
        ]
      },
      {
        "permissionId": 49,
        "permissionName": "role",
        "parentId": null,
        "type": "route",
        "description": "角色管理权限",
        "children": [
          {
            "permissionId": 50,
            "permissionName": "role.add",
            "parentId": 49,
            "type": "button",
            "description": "添加角色的按钮",
            "children": []
          },
          {
            "permissionId": 51,
            "permissionName": "role.update",
            "parentId": 49,
            "type": "button",
            "description": "更新角色的按钮权限",
            "children": []
          },
          {
            "permissionId": 52,
            "permissionName": "role.search",
            "parentId": 49,
            "type": "button",
            "description": "添加角色的按钮",
            "children": []
          },
          {
            "permissionId": 56,
            "permissionName": "role.delete",
            "parentId": 49,
            "type": "button",
            "description": "删除角色的权限",
            "children": []
          },
          {
            "permissionId": 57,
            "permissionName": "role.edit",
            "parentId": 49,
            "type": "button",
            "description": "修改角色的权限",
            "children": []
          },
          {
            "permissionId": 64,
            "permissionName": "role.assignpermission",
            "parentId": 49,
            "type": "button",
            "description": "分配角色权限的按钮",
            "children": []
          }
        ]
      },
      {
        "permissionId": 58,
        "permissionName": "user",
        "parentId": null,
        "type": "route",
        "description": "管理用户的路由",
        "children": [
          {
            "permissionId": 59,
            "permissionName": "user.search",
            "parentId": 58,
            "type": "button",
            "description": "搜索用户按钮",
            "children": []
          },
          {
            "permissionId": 60,
            "permissionName": "user.edit",
            "parentId": 58,
            "type": "button",
            "description": "修改用户的按钮",
            "children": []
          },
          {
            "permissionId": 61,
            "permissionName": "user.add",
            "parentId": 58,
            "type": "button",
            "description": "添加用户的按钮",
            "children": []
          },
          {
            "permissionId": 62,
            "permissionName": "user.reset",
            "parentId": 58,
            "type": "button",
            "description": "重置用户密码的权限",
            "children": []
          },
          {
            "permissionId": 63,
            "permissionName": "user.delete",
            "parentId": 58,
            "type": "button",
            "description": "删除用户的权限",
            "children": []
          },
          {
            "permissionId": 65,
            "permissionName": "user.assignrole",
            "parentId": 58,
            "type": "button",
            "description": "分配用户角色的权限",
            "children": []
          }
        ]
      },
      {
        "permissionId": 66,
        "permissionName": "article",
        "parentId": null,
        "type": "route",
        "description": "文章管理的路由",
        "children": [
          {
            "permissionId": 67,
            "permissionName": "article.add",
            "parentId": 66,
            "type": "button",
            "description": "添加文章的权限",
            "children": []
          },
          {
            "permissionId": 68,
            "permissionName": "article/edit",
            "parentId": 66,
            "type": "route",
            "description": "编辑文章的权限",
            "children": []
          },
          {
            "permissionId": 69,
            "permissionName": "article.delete",
            "parentId": 66,
            "type": "button",
            "description": "删除文章的权限",
            "children": []
          },
          {
            "permissionId": 70,
            "permissionName": "article.assignarchive",
            "parentId": 66,
            "type": "button",
            "description": "上架和下架文章的权限",
            "children": []
          },
          {
            "permissionId": 72,
            "permissionName": "article.download",
            "parentId": 66,
            "type": "button",
            "description": "下载文章的权限",
            "children": []
          },
          {
            "permissionId": 73,
            "permissionName": "article.upload",
            "parentId": 66,
            "type": "button",
            "description": "上传文章的权限",
            "children": []
          },
          {
            "permissionId": 79,
            "permissionName": "article/notes",
            "parentId": 66,
            "type": "route",
            "description": "管理文章的路由",
            "children": []
          },
          {
            "permissionId": 81,
            "permissionName": "article.edit",
            "parentId": 66,
            "type": "button",
            "description": "编辑文章的权限按钮",
            "children": []
          }
        ]
      },
      {
        "permissionId": 74,
        "permissionName": "category",
        "parentId": null,
        "type": "route",
        "description": "分类的路由",
        "children": [
          {
            "permissionId": 75,
            "permissionName": "category.add",
            "parentId": 74,
            "type": "button",
            "description": "添加分类的权限",
            "children": []
          },
          {
            "permissionId": 76,
            "permissionName": "category.edit",
            "parentId": 74,
            "type": "button",
            "description": "编辑分类的权限",
            "children": []
          },
          {
            "permissionId": 77,
            "permissionName": "category.delete",
            "parentId": 74,
            "type": "button",
            "description": "删除分类的权限",
            "children": []
          },
          {
            "permissionId": 78,
            "permissionName": "category.query",
            "parentId": 74,
            "type": "button",
            "description": "查询分类的权限",
            "children": []
          }
        ]
      },
      {
        "permissionId": 84,
        "permissionName": "comment",
        "parentId": null,
        "type": "route",
        "description": "评论的权限路由",
        "children": [
          {
            "permissionId": 85,
            "permissionName": "comment/my",
            "parentId": 84,
            "type": "route",
            "description": "我的评论的路由权限",
            "children": []
          },
          {
            "permissionId": 86,
            "permissionName": "comment/manage",
            "parentId": 84,
            "type": "route",
            "description": "管理评论的路由权限",
            "children": [
              {
                "permissionId": 87,
                "permissionName": "comment.delete",
                "parentId": 86,
                "type": "button",
                "description": "管理员删除评论的权限",
                "children": []
              },
              {
                "permissionId": 88,
                "permissionName": "comment.review",
                "parentId": 86,
                "type": "button",
                "description": "管理员审核通过评论的权限",
                "children": []
              }
            ]
          }
        ]
      }
    ]
  },
  "error": null,
  "timestamp": "2024-12-07T21:14:38.428Z",
  "requestId": "dee9851a-720f-4a33-b64e-06339747960a"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» index|integer|true|none||none|
|»» user_id|string|true|none||none|
|»» account|string|true|none||none|
|»» password|string|true|none||none|
|»» register_datetime|string|true|none||none|
|»» is_login|string|true|none||none|
|»» is_delete|integer|true|none||none|
|»» username|string|true|none||none|
|»» role|null|true|none||none|
|»» avatar|string|true|none||none|
|»» email|string|true|none||none|
|»» signature|string|true|none||none|
|»» roles|[object]|true|none||none|
|»»» roleId|integer|true|none||none|
|»»» roleName|string|true|none||none|
|»» currentRole|object|true|none||none|
|»»» roleId|string|true|none||none|
|»»» roleName|string|true|none||none|
|»» iat|integer|true|none||none|
|»» exp|integer|true|none||none|
|»» permissions|[object]|true|none||none|
|»»» permissionId|integer|true|none||none|
|»»» permissionName|string|true|none||none|
|»»» parentId|null|true|none||none|
|»»» type|string|true|none||none|
|»»» description|string|true|none||none|
|»»» children|[object]|true|none||none|
|»»»» permissionId|integer|true|none||none|
|»»»» permissionName|string|true|none||none|
|»»»» parentId|integer|true|none||none|
|»»»» type|string|true|none||none|
|»»»» description|string|true|none||none|
|»»»» children|[object]|true|none||none|
|»»»»» permissionId|integer|true|none||none|
|»»»»» permissionName|string|true|none||none|
|»»»»» parentId|integer|true|none||none|
|»»»»» type|string|true|none||none|
|»»»»» description|string|true|none||none|
|»»»»» children|[string]|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 添加用户

POST /user/admin/add

> Body 请求参数

```yaml
account: "15670000000"
password: Aa@111111111111

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» account|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功注册账号",
  "error": null,
  "timestamp": "2024-11-21T05:28:15.682Z",
  "requestId": "4e399eea-842a-4c1d-83dc-2ba90a6b4721"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 获取多个用户信息（管理员)

GET /user/admin/users

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |none|
|limit|query|string| 是 |none|
|body|body|object| 否 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功获取角色信息",
  "data": {
    "total": 29,
    "totalPages": 6,
    "page": 1,
    "limit": 5,
    "users": [
      {
        "user_id": "06927124-c4e9-5d0f-93c1-0a7248d42004",
        "account": "13456789342",
        "register_datetime": "2024-11-20T23:33:03.000Z",
        "is_delete": 1,
        "username": "未知"
      },
      {
        "user_id": "2de03660-3bb6-53ad-86e8-08360784fd0e",
        "account": "15768756123",
        "register_datetime": "2024-08-24T15:10:11.000Z",
        "is_delete": 0,
        "username": "未知"
      },
      {
        "user_id": "32e2ae4c-6176-5d87-8356-f1b711867097",
        "account": "15970460916",
        "register_datetime": "2024-11-24T01:47:17.000Z",
        "is_delete": 0,
        "username": "护城河"
      },
      {
        "user_id": "33638b71-c329-5e5b-be15-f30e9173696d",
        "account": "13700020000",
        "register_datetime": "2024-08-22T06:18:12.000Z",
        "is_delete": 0,
        "username": "未知"
      },
      {
        "user_id": "35b0adff-4cf6-50bb-8744-6dfa2ee45568",
        "account": "15670000001",
        "register_datetime": "2024-11-21T05:28:15.000Z",
        "is_delete": 0,
        "username": "未知"
      }
    ]
  },
  "error": null,
  "timestamp": "2024-11-25T15:46:50.206Z",
  "requestId": "54b1b634-b0d3-4bd3-8b4b-957667553db1"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» total|integer|true|none||none|
|»» totalPages|integer|true|none||none|
|»» page|integer|true|none||none|
|»» limit|integer|true|none||none|
|»» users|[object]|true|none||none|
|»»» user_id|string|true|none||none|
|»»» account|string|true|none||none|
|»»» register_datetime|string|true|none||none|
|»»» is_delete|integer|true|none||none|
|»»» username|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## PUT 重置用户密码

PUT /user/admin/reset/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功重置了密码",
  "error": null,
  "timestamp": "2024-11-21T05:32:49.346Z",
  "requestId": "642af368-161d-4f7b-bc82-04af1878b09b"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## PUT 删除用户

PUT /user/admin/delete/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功删除了用户",
  "error": null,
  "timestamp": "2024-11-21T05:33:34.278Z",
  "requestId": "1892f601-2656-4aa2-bc5b-80c0291fd8f2"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 分配用户角色

POST /user/admin/manageRoles

> Body 请求参数

```json
{
  "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
  "roleIds": [
    1,
    9,
    17,
    19,
    20,
    21,
    24
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |none|
|» roleIds|body|[integer]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "角色分配/取消成功",
  "error": null,
  "timestamp": "2024-11-21T05:35:21.150Z",
  "requestId": "9ffa13e1-1b05-4175-8459-418fc2e2bb6b"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 获取用户角色信息

GET /user/userrole/{userId}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|path|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取角色成功",
  "data": {
    "roles": [
      {
        "id": 1,
        "name": "root",
        "hasRole": true
      },
      {
        "id": 19,
        "name": "普通用户10",
        "hasRole": true
      },
      {
        "id": 20,
        "name": "普通用户11",
        "hasRole": true
      },
      {
        "id": 21,
        "name": "普通用户12",
        "hasRole": true
      },
      {
        "id": 9,
        "name": "普通用户2",
        "hasRole": true
      },
      {
        "id": 17,
        "name": "普通用户9",
        "hasRole": true
      },
      {
        "id": 24,
        "name": "超级管理用户",
        "hasRole": true
      }
    ]
  },
  "error": null,
  "timestamp": "2024-11-21T05:35:50.153Z",
  "requestId": "b639f89c-d7ae-4d56-9618-d6ca711c2ea7"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» roles|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» name|string|true|none||none|
|»»» hasRole|boolean|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 更新用户的信息

POST /user/update/userinfo

> Body 请求参数

```yaml
username: 护城河
avatar: http://localhost:5797/static/images/Pasted%20image%2020241105200339.png
email: 2927678784@qq.com
signature: 我的青春

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |none|
|» avatar|body|string| 是 |none|
|» email|body|string| 是 |none|
|» signature|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "更新成功",
  "error": null,
  "timestamp": "2024-11-21T05:44:07.811Z",
  "requestId": "991aa63b-82c1-42d6-b76c-d778b1a42d0a"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## GET 根据用户名查找用户

GET /user/admin/getuser

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userName|query|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "找到了角色",
  "data": [
    {
      "user_id": "06927124-c4e9-5d0f-93c1-0a7248d42004",
      "account": "13456789342",
      "register_datetime": "2024-11-20T23:33:03.000Z",
      "is_delete": 1,
      "username": "未知"
    },
    {
      "user_id": "2de03660-3bb6-53ad-86e8-08360784fd0e",
      "account": "15768756123",
      "register_datetime": "2024-08-24T15:10:11.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "33638b71-c329-5e5b-be15-f30e9173696d",
      "account": "13700020000",
      "register_datetime": "2024-08-22T06:18:12.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "35b0adff-4cf6-50bb-8744-6dfa2ee45568",
      "account": "15670000001",
      "register_datetime": "2024-11-21T05:28:15.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "3cada313-0cf6-57a7-bc24-eea5aa1ce5f8",
      "account": "13700000001",
      "register_datetime": "2024-08-21T00:57:40.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "40b5bfec-1751-5c9d-bc28-0930992d552a",
      "account": "13400000000",
      "register_datetime": "2024-10-29T22:09:58.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "4aed71ef-136d-5cfc-a3d4-955e5232de2a",
      "account": "15524188517",
      "register_datetime": "2024-08-24T15:13:04.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "55ed80a4-5959-57ec-a3df-a17a7a70436d",
      "account": "13789700000",
      "register_datetime": "2024-11-04T12:33:49.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "582bd696-8fbb-5603-b186-9757ce243020",
      "account": "13700000000",
      "register_datetime": "2024-08-21T00:56:37.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "5a86a8c5-1239-58d5-b1e7-65898ad5eeb9",
      "account": "15970461916",
      "register_datetime": "2024-08-22T06:24:30.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "5ccffb95-2728-5b8a-b9d0-cda5d4a20733",
      "account": "13700020001",
      "register_datetime": "2024-08-22T06:18:29.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "70d6f1ff-c5bc-505d-8687-9f84de0c778a",
      "account": "13576264940",
      "register_datetime": "2024-08-15T22:33:34.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "79ca16f1-e4d4-5b80-8ce0-3b3ee1adbc11",
      "account": "13767878972",
      "register_datetime": "2024-08-24T14:22:36.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "9049d136-c7c1-53b2-b9af-2933af4c7ffd",
      "account": "13459999999",
      "register_datetime": "2024-11-14T23:00:40.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "a59c7a56-d0f3-57bc-8421-3d62e7b3e3ad",
      "account": "14567000000",
      "register_datetime": "2024-10-27T20:08:07.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "cd5041b2-552d-5205-9bc7-37b8f1d0f3a6",
      "account": "15970420915",
      "register_datetime": "2024-08-22T07:16:11.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "d484ac0d-24a1-5fb3-9f6a-ec4b0e1a5077",
      "account": "13700000089",
      "register_datetime": "2024-08-23T08:47:25.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "d573850f-8949-577c-ac92-c75a5016fbba",
      "account": "13700000078",
      "register_datetime": "2024-08-23T15:52:27.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "ee735c36-35f4-5bfa-ba7c-a4cee5142aac",
      "account": "15781266231",
      "register_datetime": "2024-08-24T14:56:25.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "f0196d2c-706c-5aba-af71-7b8413ac6166",
      "account": "13576264945",
      "register_datetime": "2024-08-15T22:24:34.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "fb6416cf-e1f2-5a62-bb4b-aa6d56b86426",
      "account": "14500000000",
      "register_datetime": "2024-09-22T13:49:40.000Z",
      "is_delete": 0,
      "username": "未知"
    },
    {
      "user_id": "fd6b96a0-9b1a-56a1-9762-82a90a984686",
      "account": "15670000000",
      "register_datetime": "2024-11-21T05:32:48.000Z",
      "is_delete": 1,
      "username": "未知"
    }
  ],
  "error": null,
  "timestamp": "2024-11-25T15:14:38.381Z",
  "requestId": "c39ebefb-eb9e-4f95-9c1d-1d11246f8c8f"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» user_id|string|true|none||none|
|»» account|string|true|none||none|
|»» register_datetime|string|true|none||none|
|»» is_delete|integer|true|none||none|
|»» username|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

# 评论管理

## POST 添加评论

POST /comment/add

> Body 请求参数

```yaml
userId: 32e2ae4c-6176-5d87-8356-f1b711867097
articleId: "126"
parentId: "0"
content: 还好吧

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |none|
|» articleId|body|string| 是 |none|
|» parentId|body|string| 是 |none|
|» content|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "添加评论成功",
  "error": null,
  "timestamp": "2024-12-04T08:04:00.307Z",
  "requestId": "abcec6f9-81a0-4405-b196-1164d899a946"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 删除评论

POST /comment/remove

> Body 请求参数

```yaml
commentId: "2"
userId: 32e2ae4c-6176-5d87-8356-f1b711867097

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentId|body|string| 是 |none|
|» userId|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "删除评论成功",
  "error": null,
  "timestamp": "2024-12-04T08:06:45.390Z",
  "requestId": "3820265a-8eb9-4924-aea3-44dd7301f9ef"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 更新评论

POST /comment/edit

> Body 请求参数

```yaml
commentId: "1"
userId: 32e2ae4c-6176-5d87-8356-f1b711867097
content: 这个文章还不错啊飒飒

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentId|body|string| 是 |none|
|» userId|body|string| 是 |none|
|» content|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "更新评论成功",
  "error": null,
  "timestamp": "2024-12-04T08:12:32.655Z",
  "requestId": "73e8257a-119a-48b1-9d4a-9c785d976a4b"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 根据文章获取评论

POST /comment/get

> Body 请求参数

```yaml
articleId: "126"
status: approved

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» articleId|body|string| 是 |none|
|» status|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取评论成功",
  "data": [
    {
      "commentId": 103,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 97,
      "content": "不可以",
      "createdDateTime": "2024-12-07T23:36:04.000Z",
      "updatedDateTime": null,
      "status": "approved",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": "护城河",
      "parentUserId": "32e2ae4c-6176-5d87-8356-f1b711867097"
    },
    {
      "commentId": 102,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 101,
      "content": "不行",
      "createdDateTime": "2024-12-07T23:35:56.000Z",
      "updatedDateTime": null,
      "status": "pending",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": "护城河",
      "parentUserId": "32e2ae4c-6176-5d87-8356-f1b711867097"
    },
    {
      "commentId": 101,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 99,
      "content": "不可以",
      "createdDateTime": "2024-12-07T23:35:42.000Z",
      "updatedDateTime": null,
      "status": "pending",
      "likeCount": 0,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": "护城河",
      "parentUserId": "32e2ae4c-6176-5d87-8356-f1b711867097"
    },
    {
      "commentId": 99,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 0,
      "content": "不可以",
      "createdDateTime": "2024-12-06T22:56:46.000Z",
      "updatedDateTime": "2024-12-07T23:35:04.000Z",
      "status": "approved",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": null,
      "parentUserId": null
    },
    {
      "commentId": 97,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 0,
      "content": "这个快捷键只有这么一点点吗，不可以再多一点吗？",
      "createdDateTime": "2024-12-06T22:32:12.000Z",
      "updatedDateTime": "2024-12-06T22:32:12.000Z",
      "status": "approved",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": null,
      "parentUserId": null
    },
    {
      "commentId": 75,
      "articleId": 128,
      "userId": "55ed80a4-5959-57ec-a3df-a17a7a70436d",
      "userName": "你好",
      "parentId": 70,
      "content": "好多事情你还不懂",
      "createdDateTime": "2024-12-05T20:24:11.000Z",
      "updatedDateTime": "2024-12-05T20:24:11.000Z",
      "status": "approved",
      "likeCount": 0,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": null,
      "parentUserId": null
    }
  ],
  "error": null,
  "timestamp": "2024-12-07T23:54:59.742Z",
  "requestId": "a90f2099-03d6-4fa0-8e2c-e85da065e568"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» commentId|integer|true|none||none|
|»» articleId|integer|true|none||none|
|»» userId|string|true|none||none|
|»» userName|string|true|none||none|
|»» parentId|integer|true|none||none|
|»» content|string|true|none||none|
|»» createdDateTime|string|true|none||none|
|»» updatedDateTime|string¦null|true|none||none|
|»» status|string|true|none||none|
|»» likeCount|integer|true|none||none|
|»» replyCount|integer|true|none||none|
|»» articleTitle|string|true|none||none|
|»» articleFileId|string|true|none||none|
|»» parentUserName|string¦null|true|none||none|
|»» parentUserId|string¦null|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 审核评论

POST /comment/audit

> Body 请求参数

```yaml
commentId: "3"
status: approved

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentId|body|string| 是 |none|
|» status|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "审核评论成功",
  "error": null,
  "timestamp": "2024-12-04T08:47:43.157Z",
  "requestId": "609675f6-b390-4138-8865-833813a9f275"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 根据用户查询评论

POST /comment/user

> Body 请求参数

```yaml
commentId: "104"
userId: 32e2ae4c-6176-5d87-8356-f1b711867097

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentId|body|string| 是 |none|
|» userId|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取评论成功",
  "data": [
    {
      "commentId": 99,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 0,
      "content": "不可以",
      "createdDateTime": "2024-12-06T22:56:46.000Z",
      "updatedDateTime": "2024-12-07T23:35:04.000Z",
      "status": "approved",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": null,
      "parentUserId": null
    },
    {
      "commentId": 97,
      "articleId": 128,
      "userId": "32e2ae4c-6176-5d87-8356-f1b711867097",
      "userName": "护城河",
      "parentId": 0,
      "content": "这个快捷键只有这么一点点吗，不可以再多一点吗？",
      "createdDateTime": "2024-12-06T22:32:12.000Z",
      "updatedDateTime": "2024-12-06T22:32:12.000Z",
      "status": "approved",
      "likeCount": 1,
      "replyCount": 0,
      "articleTitle": "快捷键备查文档",
      "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
      "parentUserName": null,
      "parentUserId": null
    }
  ],
  "error": null,
  "timestamp": "2024-12-08T00:11:21.626Z",
  "requestId": "b681a8d2-3aa3-426d-bc3d-8912ec23ab58"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|[object]|true|none||none|
|»» commentId|integer|true|none||none|
|»» articleId|integer|true|none||none|
|»» userId|string|true|none||none|
|»» userName|string|true|none||none|
|»» parentId|integer|true|none||none|
|»» content|string|true|none||none|
|»» createdDateTime|string|true|none||none|
|»» updatedDateTime|string|true|none||none|
|»» status|string|true|none||none|
|»» likeCount|integer|true|none||none|
|»» replyCount|integer|true|none||none|
|»» articleTitle|string|true|none||none|
|»» articleFileId|string|true|none||none|
|»» parentUserName|null|true|none||none|
|»» parentUserId|null|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 管理员获取评论

POST /comment/admin

> Body 请求参数

```json
{
  "page": 1,
  "limit": 5,
  "status": [
    "pending"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» page|body|integer| 是 |none|
|» limit|body|integer| 是 |none|
|» status|body|[string]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取评论成功",
  "data": {
    "totalRecords": 1,
    "currentPage": 1,
    "totalPages": 1,
    "data": [
      {
        "commentId": 81,
        "articleId": 128,
        "userId": "55ed80a4-5959-57ec-a3df-a17a7a70436d",
        "userName": "你好",
        "parentId": 79,
        "content": "你这么厉害肯定可以的拉",
        "createdDateTime": "2024-12-05T20:56:08.000Z",
        "updatedDateTime": "2024-12-05T20:56:08.000Z",
        "status": "pending",
        "likeCount": 0,
        "replyCount": 0,
        "articleTitle": "快捷键备查文档",
        "articleFileId": "1352b166fc1dfd438d764c8966665cc7",
        "parentUserName": null,
        "parentUserId": null
      }
    ]
  },
  "error": null,
  "timestamp": "2024-12-06T21:48:20.818Z",
  "requestId": "dd03327b-85b3-4f40-a271-2a465620e897"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» totalRecords|integer|true|none||none|
|»» currentPage|integer|true|none||none|
|»» totalPages|integer|true|none||none|
|»» data|[object]|true|none||none|
|»»» commentId|integer|false|none||none|
|»»» articleId|integer|false|none||none|
|»»» userId|string|false|none||none|
|»»» userName|string|false|none||none|
|»»» parentId|integer|false|none||none|
|»»» content|string|false|none||none|
|»»» createdDateTime|string|false|none||none|
|»»» updatedDateTime|string|false|none||none|
|»»» status|string|false|none||none|
|»»» likeCount|integer|false|none||none|
|»»» replyCount|integer|false|none||none|
|»»» articleTitle|string|false|none||none|
|»»» articleFileId|string|false|none||none|
|»»» parentUserName|null|false|none||none|
|»»» parentUserId|null|false|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 批量删除评论（管理员)

POST /comment/admin/delete

> Body 请求参数

```json
{
  "commentIds": [
    1,
    2,
    3
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentIds|body|[integer]| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功删除了2评论",
  "data": {
    "affectedRows": 2
  },
  "error": null,
  "timestamp": "2024-12-04T10:11:49.549Z",
  "requestId": "6b2b4471-7d32-47ca-b4ac-3b832dfa98d0"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» affectedRows|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 批量审核

POST /comment/admin/batch/review

> Body 请求参数

```json
{
  "commentIds": [
    4,
    5
  ],
  "status": "approved"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentIds|body|[integer]| 是 |none|
|» status|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功审核了 2 条评论",
  "data": {
    "affectedRows": 2
  },
  "error": null,
  "timestamp": "2024-12-04T10:10:44.695Z",
  "requestId": "b0cd11d2-e52d-4ebd-a890-631c306dd2a6"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» affectedRows|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 切换点赞的状态

POST /comment/togglelike

> Body 请求参数

```yaml
commentId: "7"
userId: 32e2ae4c-6176-5d87-8356-f1b711867097

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» commentId|body|string| 是 |none|
|» userId|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "点赞成功",
  "data": {
    "action": "like"
  },
  "error": null,
  "timestamp": "2024-12-04T10:46:48.354Z",
  "requestId": "3a911edb-1d23-4d97-ba97-2e485bde9846"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» action|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 查询多少条评论还没有审核

POST /admin/noreview/count

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "获取未审核评论数量成功",
  "data": 2,
  "error": null,
  "timestamp": "2024-12-06T22:43:48.230Z",
  "requestId": "bde12c2e-d564-4529-b6a7-f024d0334ee3"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|integer|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

# 登录与注册、获取信息

## POST 登录

POST /api/login

> Body 请求参数

```yaml
account: "15970460916"
password: aaA28262722@
captcha: urmi

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» account|body|string| 是 |none|
|» password|body|string| 是 |none|
|» captcha|body|string| 是 |none|

> 返回示例

```json
{
  "success": true,
  "code": 200,
  "message": "成功登录了账户",
  "data": {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleCI6MSwidXNlcl9pZCI6IjMyZTJhZTRjLTYxNzYtNWQ4Ny04MzU2LWYxYjcxMTg2NzA5NyIsImFjY291bnQiOiIxNTk3MDQ2MDkxNiIsInBhc3N3b3JkIjoiIiwicmVnaXN0ZXJfZGF0ZXRpbWUiOiIyMDI0LTExLTIxVDAyOjU3OjUyLjAwMFoiLCJpc19sb2dpbiI6IjEiLCJpc19kZWxldGUiOjAsInVzZXJuYW1lIjoi5oqk5Z-O5rKzIiwicm9sZSI6bnVsbCwiYXZhdGFyIjoiaHR0cDovL2xvY2FsaG9zdDo1Nzk3L3N0YXRpYy9pbWFnZXMvUGFzdGVkJTIwaW1hZ2UlMjAyMDI0MTEwNTIwMDMzOS5wbmciLCJlbWFpbCI6IjI5Mjc2Nzg3ODRAcXEuY29tIiwic2lnbmF0dXJlIjoi5oiR55qE6Z2S5pilIiwicm9sZXMiOltdLCJpYXQiOjE3MzIxNjU5NDgsImV4cCI6MTczMjI1MjM0OH0.Xjmw_ifHCKYGCiLYHy9vETUnCsNRfZxa8BVXkkSXs5o"
  },
  "error": null,
  "timestamp": "2024-11-21T05:12:28.193Z",
  "requestId": "02edba33-7b93-4f59-9d45-8b981b6fb88a"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» success|boolean|true|none||none|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» token|string|true|none||none|
|» error|null|true|none||none|
|» timestamp|string|true|none||none|
|» requestId|string|true|none||none|

## POST 注册用户

POST /api/register

> Body 请求参数

```yaml
account: "15970460919"
password: aa2927678784AA@

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» account|body|string| 是 |none|
|» password|body|string| 是 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型

<h2 id="tocS_Pet">Pet</h2>

<a id="schemapet"></a>
<a id="schema_Pet"></a>
<a id="tocSpet"></a>
<a id="tocspet"></a>

```json
{
  "id": 1,
  "category": {
    "id": 1,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 1,
      "name": "string"
    }
  ],
  "status": "available"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|true|none||宠物ID编号|
|category|[Category](#schemacategory)|true|none||分组|
|name|string|true|none||名称|
|photoUrls|[string]|true|none||照片URL|
|tags|[[Tag](#schematag)]|true|none||标签|
|status|string|true|none||宠物销售状态|

#### 枚举值

|属性|值|
|---|---|
|status|available|
|status|pending|
|status|sold|

<h2 id="tocS_Category">Category</h2>

<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||分组ID编号|
|name|string|false|none||分组名称|

<h2 id="tocS_Tag">Tag</h2>

<a id="schematag"></a>
<a id="schema_Tag"></a>
<a id="tocStag"></a>
<a id="tocstag"></a>

```json
{
  "id": 1,
  "name": "string"
}

```

### 属性

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|id|integer(int64)|false|none||标签ID编号|
|name|string|false|none||标签名称|

