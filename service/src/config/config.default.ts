import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: 'zhijikeji-i2wNxWQjIYVy46AgTna7',
  bodyParser: {
    enableTypes: ['json', 'form', 'text', 'xml'],
    formLimit: '1mb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    xmlLimit: '1mb',
  },
  koa: {
    port: 7001,
  },
  pageSize: 20,
  mysqlConfig: config => {
    // 监听事件 执行前
    config.onBeforeExecute(function ({ sql }) {
      if (process.env.NODE_ENV === 'local') console.log('转成的sql', sql);
    });
    // 监听事件 执行后
    config.onAfterExecute(function ({ sql, result }) {
      // console.log(result);
    });
    // 监听事件 执行出错
    config.onExecuteError(function ({ sql, error }) {
      console.log('sql错误', error);
    });
  },
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
