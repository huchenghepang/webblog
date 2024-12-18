# 使用官方的 Nginx 镜像
FROM nginx:alpine

# 将构建好的前端资源文件复制到容器的默认网页目录 如果dist文件有修改需要使用 docker compose up --build -d重新构建部署
COPY ./dist /usr/share/nginx/html

# 暴露端口 80
EXPOSE 80