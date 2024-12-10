import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'zhijikeji-i2wNxWQjIYVy46AgTna7',
  bodyParser: {
    enableTypes: ['json', 'form', 'text', 'xml', 'html'],
    extendTypes: {
      text: ['text/html'],
    },
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
  },
  koa: {
    port: 7001,
  },
  pageSize: 20,

  oss: {
    accessKeyId: '*',
    accessKeySecret: '*',
    bucket: '*',
    region: 'oss-cn-hangzhou',
  },
  cors: {
    // 跨域配置 http://midwayjs.org/docs/extensions/cross_domain
    credentials: false,
  },
} as MidwayConfig;
