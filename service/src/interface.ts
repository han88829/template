import DbClient from "ali-h-mysql-ts";
import * as koa from '@midwayjs/koa';

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

declare module '@midwayjs/core' {
  interface Context {
    db: any;
  }
}

export interface IApp extends koa.Application {
  db: DbClient;
  user: any;
  deptIds: String | Array<Number>
}