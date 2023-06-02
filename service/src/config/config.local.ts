import { MidwayConfig } from '@midwayjs/core';

export default {
  client: {
    // 数据库存连接配置
    // host
    host: '127.0.0.1',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: 'root',
    // 数据库名
    database: 'file',
    charset: 'utf8mb4', //制定字符集用于保存emoji
    dateStrings: true,
    timezone: '+08:00',
  },
} as MidwayConfig;
