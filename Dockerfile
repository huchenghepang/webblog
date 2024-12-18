FROM node:18

RUN npm install -g pnpm@8.6.4
# 设置淘宝镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 设置工作目录
WORKDIR /usr/src/app

# 不复制只是映射代码
# 仅复制 package.json 和 pnpm-lock.yaml 文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 暴露端口
EXPOSE 5797

# 启动应用
CMD ["pnpm", "run", "start:prod"]
