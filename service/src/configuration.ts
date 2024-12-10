import { Configuration, App, Config } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import * as upload from '@midwayjs/upload';
import { IApp } from './interface';
import * as cache from '@midwayjs/cache';
import * as axios from '@midwayjs/axios';
import * as crossDomain from '@midwayjs/cross-domain';
import knex from './knex';

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
  app: IApp;

  @Config('client')
  client;

  @Config()
  data;
  async onReady(_, app: IApp) {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    // 如果支持多实例，则挂载到app其他key上
    app.db = knex({
      client: 'mysql2',
      connection: {
        ...this.client,
      },
      pool: { min: 0, max: 7 },
    });
  }
}
