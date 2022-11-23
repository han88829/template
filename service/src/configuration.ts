import { Configuration, App, Config, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as upload from '@midwayjs/upload';
import DbClient from "ali-h-mysql-ts";
import { IApp } from './interface';
import * as cache from '@midwayjs/cache';
import { Sql } from './utils/sql';
import * as axios from '@midwayjs/axios';
import * as crossDomain from '@midwayjs/cross-domain';

@Configuration({
  imports: [
    koa,
    validate,
    upload,
    cache,
    axios,
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Config('client')
  client;

  @Config('clients')
  clients;

  @Config()
  data;

  @Config('mysqlConfig')
  mysqlConfig;

  @Inject()
  sql: Sql;

  async onReady(_, app: IApp) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    // 如果支持多实例，则挂载到app其他key上
    app.db = new DbClient({
      mysql: this.client,
      config: this.mysqlConfig,
    });
    // 第一次运行检查模版数据库是否存在，不存在则创建
    await this.sql.run();
  }
}
