# 运行的环境 -> Linux文件系统创建出来的 /usr /sys /dev /proc
FROM node:16

# 工作目录及代码
WORKDIR /app

# 构建命令 npm install && npm run build
COPY . .

# 暴露的目录与端口
VOLUME [ "/app/logs" ]

EXPOSE 13000
# 运行程序的脚本或者命令
CMD ["npm", "run", "start:prod"]