import * as koa from '@midwayjs/koa';
import { Knex } from 'knex';

declare module '@midwayjs/core' {
  interface Context {
    db: Knex;
  }
}

declare module 'knex' {
  namespace Knex {
    interface QueryBuilder {
      page(page: number, pageSize: number): Knex.QueryBuilder;
      findOne(): Knex.QueryBuilder;
      find(num?: number): Knex.QueryBuilder;
      value(field?: string): Knex.QueryBuilder;
      orderby(order: string): Knex.QueryBuilder;
      groupby(group: string): Knex.QueryBuilder;
      _where(
        name,
        operator?,
        value?,
        ifHave?: boolean | string
      ): Knex.QueryBuilder;
    }
  }
}

export interface IApp extends koa.Application {
  user: any;
  db: Knex;
  deptIds: any;
}
