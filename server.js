// 导入express
const express = require("express");
// 创建服务器的实例对象
const app = express();
// 定义数据的基本结构 用来数据的验证
const joi = require("@hapi/joi");
const { validatePermission } = require("./middlewares/validatePermission");
// 导入cors中间件 解决跨域问题
const cors = require("cors");
// 导入session+captcha+mysqlsession 实现图形的验证码
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const pool = require('./db/mysqlpool')
// 配置导入默认配置(包含密钥信息)
const config = require("./config");
/* 进行连接 */

// 默认自动创建表
const sessionStore = new MysqlStore({}, pool)
// 自定封装一个全局处理的中间件
const responseMiddleware = require("./middlewares/responseMiddleware")
app.use(responseMiddleware);

// 使用session 配置中间件
app.use(session({
  key: config.SessionKey,
  secret: config.SessionSecretKey || config.SessionKey,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,  // 表示未初始化的 session 不会被保存
  cookie: process.env.NODE_ENV === 'production'? {
    // secure: process.env.NODE_ENV === 'production', // 仅在 HTTPS 环境下设置为 true  根据具体情况启动，你说如果没有那一定得关闭 
    secure: false, // 仅在 HTTPS 环境下设置为 true
    sameSite: 'lax',
    // sameSite: 'none', // 允许跨站点传递
    domain: '.huchenghe.site', // 主域和子域共享
    maxAge: 1000 * 60 * 5 // 五分钟验证码
  }:{
    secure: false, // 仅在 HTTPS 环境下设置为 true
    sameSite: 'lax',
    maxAge: 1000 * 60 * 5 // 五分钟验证码
  }
}))

app.use(cors({
  origin: config.allowCorsOrigins, // 替换为客户端的 URL
  credentials: true, // 允许发送凭据（cookies、认证信息等）
  sameSite: 'lax',
})); // 在所有路由之前导入处理跨域

// 配置解析表单数据的中间件 这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据 即：form表单数据
app.use(express.urlencoded({ extended: false })); //既可以解析url表单 也可以解析query参数提交的表单数据
app.use(express.json()); // 解析JSON格式数据
// 托管静态资源文件


// 托管图片资源
app.use("/static", express.static("./uploads/static", {
  maxAge: "30 minutes", // 5分钟之内不需要向服务发起请求 "1y" 一年 "2000ms" 两秒
  cacheControl: true, // 启用强缓存 false则为禁用
  immutable: true, // 指示的资源在规定的时间不会改变
  // 设置缓存控制头部 排除掉HTML文件
  setHeaders: (res, path) => {

  }
})); // 路径必须是斜杠
// app.use("/uploads", express.static("./uploads"));



// 配置JWT token解析中间件 在路由解析之前
const { expressjwt: jwt, expressjwt } = require("express-jwt");


// 配置 algorithms算法配置 常用的有 HS256 || RS256 不要混合使用
app.use(
  expressjwt({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
    path: config.excludePermissionVerification, // 需要排除验证的接口
  })
);


app.use(validatePermission)

//#region  路由导入和配置
// 导入各个模块的路由

// 导入用户模块路由
const user = require("./router/user");
const api = require("./router/api");
const upload = require("./router/uploadfile");
const article = require("./router/articles");
const categories = require("./router/category")
const permission = require("./router/permission")
const roleRouter = require("./router/role");
const notesRouter = require("./router/note");
const commentRouter = require("./router/comment")

app.use("/api", api);
app.use("/user", user);
app.use("/note", notesRouter)
app.use("/api", upload);
app.use("/api", article)
app.use("/category", categories)
app.use("/permission", permission)
app.use("/role", roleRouter)
app.use("/comment", commentRouter)

//#endregion

// 定义处理全局错误的中间件

app.use((err, req, res, next) => {
  // 记录错误日志到控制台
  console.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    time: new Date().toISOString(),
  });
  if (err instanceof joi.ValidationError) {
    res.sendError(err, 401);
  } else if (err.name === "UnauthorizedError") {
    res.sendError("身份认证失败了", 401);
  } else {
    res.sendError(err);
  }
});


const http = require("http");
const { Server } = require("socket.io");
const moment = require("moment-timezone");

const { v5: uuidv5 } = require("uuid");

const MY_NAMESPACE = uuidv5("huchenghedezidingyi", uuidv5.DNS);


//#region websocket通讯实现聊天室的功能
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.allowCorsOrigins, // 允许的源
    methods: ["GET", "POST"],
  },
});
const connections = {
  count: 0,
  userList: [],
};
let messageInfo = {
  message: "",
  username: "",
  avator: "",
  id: "",
  onlineNumber: 0,
  datetime: null,
  data: null,
  filetype: "",
  signature: "",
};
const server_port = process.env.PORT || config.serverPort || 3000;


io.on("connection", (socket) => {
  console.log(
    // "——————————————————————————————————————————————————————————————————————"
  );
  connections.count++;
  console.log("一个用户连接了");
  console.log(`当前在线人数：${connections.count}`);
  console.log(
    // "——————————————————————————————————————————————————————————————————————"
  );

  socket.on("enterchatroom", (data) => {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    let message = "用户:" + data.username + "进入聊天室了";
    let id = uuidv5(data.username, MY_NAMESPACE);
    socket.userId = id;
    let userInfo = {};
    userInfo = {
      username: data.username,
      avator: data.avator,
      signature: data.signature,
      id,
    };
    connections.userList.push(userInfo);
    let datetime = moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
    // 用户列表数据
    let userList = connections.userList;
    messageInfo = Object.assign(messageInfo, {
      ...data,
      data: userList,
      type: 1,
      id,
      datetime,
      message,
    });
    // console.log(messageInfo);
    // io.emit("enterchatroom", messageInfo);
    io.emit("broadcast", messageInfo);

    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  });

  socket.on("message", (msg) => {
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    let Index = connections.userList.findIndex((user, index) => {
      if (user.id == socket.userId) {
        return true;
      } else {
        return false;
      }
    });
    let userInfo = connections.userList[Index];
    let datetime = moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
    messageInfo = { datetime, ...msg, id: socket.userId, ...userInfo };

    io.emit("broadcast", messageInfo);
    // console.log(messageInfo)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
  });
  socket.on("sendPic", (pgnmsg) => {
    console.log("接受了图片")
    let Index = connections.userList.findIndex((user, index) => {
      if (user.id == socket.userId) {
        return true;
      } else {
        return false;
      }
    });
    let userInfo = connections.userList[Index];
    let datetime = moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
    messageInfo = { datetime, ...pgnmsg, id: socket.userId, ...userInfo };
    io.emit("broadcast", messageInfo);
  });

  socket.on("disconnect", () => {
    console.log(
      "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    );
    // console.log(socket.userId);

    let needDeleteIndex = connections.userList.findIndex((user, index) => {
      if (user.id == socket.userId) {
        return true;
      } else {
        return false;
      }
    });
    // console.log(needDeleteIndex);
    // 需要返回的用户列表
    let userinfo = connections.userList[needDeleteIndex];
    let message =
      "用户:" +
      connections.userList[needDeleteIndex].username +
      "离开了聊天室";
    connections.userList.splice(needDeleteIndex, 1);
    connections.count--;
    let data = connections.userList;
    let id = socket.userId;
    let datetime = moment().tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
    messageInfo = { type: 2, datetime, data, message, id, ...userinfo };
    io.emit("broadcast", messageInfo);

    console.log("一个用户下线了");
    console.log(`当前在线人数：${connections.count}`);

    // console.log(
    //   "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    // );
  });

  socket.on("error", () => {

  })


});

app.get("/", (req, res) => {
  res.send("WebSocket Server");
});
//#endregion

server.listen(server_port, () => {
  console.log(
    `websocket服务器启动在了${server_port}端口,请访问：http://localhost:${server_port}`
  );
  console.log(`websocket服务器启动在了${server_port}端口,请访问：http://${config.hostname}:${server_port}`)
});



process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err.message);
  // 记录错误并优雅地关闭服务器
  // process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', promise, '原因:', reason);
  // 记录错误并优雅地关闭服务器
  // process.exit(1);
});
